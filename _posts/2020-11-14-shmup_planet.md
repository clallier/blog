---
layout: post
title:  "A shaders experiment: crafting a small mobile shooter game using three.js, ECS and coroutines!"
date:   2020-11-14 21:00:00 +0100
categories: experiment, three.js, ECS, shaders, coroutines, mini-console
image: "/assets/img/shmup_planet_displacement.png"
---

<iframe src="https://shmup-6a843.web.app" width="100%" height="500px"></iframe>
*Touch (or click!) on the left/right part of the frame to move left/right. The goal is to explode rocks and flying saucers*.
[Play in full screen](https://shmup-6a843.web.app/).

## Background and motivation

To summarize the motivation of this project, I **love making games** and I'm really interested in **web technologies**. Recently, I decided to learn about **shaders**, something I've wanted to do for a long time.
I found out interesting tutorials[^1] and it seems that Three.js is great for this.
I also think making games for mobile phones is an interesting challenge with strong input and compute constraints and I wanted to try it . 
Besides, I've been reading about **ECS** (Entity Component System) and **coroutines**. So, I thought this project would be a good chance to try all these things together.

My goal was to do a small project in my **free time over a few weekends**. I wanted to mix different parts of game development and web technology. It was important for the project to be simple and fit into my spare time. This was a chance for me to learn new things and have fun :)

## Key Features and Learning Points:

### Displacement map on the central sphere

![Displacement example]({{ site.url }}{{ site.baseurl }}/assets/img/shmup_planet_displacement.png)


The concept behind this part of the project is to worked on making the central sphere look more interesting and quite evil, in a simple way:

 - **Sphere with Displacement Map**: I took a basic sphere and applied a special effect called a displacement map. This map changes the surface of the sphere to make it look less flat and more detailed.

 - **Animating the Map with Perlin Noise**: To make the surface of the sphere move, I used something called Perlin noise[^2]. It's a way to create patterns that look natural. You can see the code I wrote for this in my [displacement_vx.glsl](https://github.com/clallier/shmup_planet/blob/master/src/shaders/displacement_vx.glsl) file. Here's the key part of that code:

 ```glsl
 // high frequency noise 
 float low_freq = 5.0 * pnoise(0.1 * position + vec3(time), vec3(100.));
 vec3 p = position + normal * low_freq;
 // varying float noise: to be used by the fragment shader
 noise = low_freq;
 gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
 ```
 - **Color Ramp for Visual Effect**: The color of the sphere is achieved with a simple color ramp technique: `mix(color2, color1, noise);``. This method is detailed in the [displacement_fg.glsl](https://github.com/clallier/shmup_planet/blob/master/src/shaders/displacement_fg.glsl) file.

 - **Bloom Effect for Aesthetics**: To enhance the visual appeal, I used a `UnrealBloomPass`[^3] to give the scene a glowing, bloom effect.

The main goal here was to make the sphere look good without making things too complicated. I wanted it to be visually appealing but also simple.


### Making a Small Library for particles animation. 

I love particles! They're used for many effects in this project, like static stars, trails, and explosions.

 - **Particle Systems in ECS**: We handle particles using the Entity Component System (ECS)[^4] principle. We have particle emitters (Components), and a particles system (System) that manages the life cycle of the particles and emitters. For example, if we want the ship to have a trail of particles, we simply add a trail component to the ship entity.

- **Performance Challenge**: A big issue was dealing with many particles being created and destroyed. This process was heavy on performance, causing slowdowns mostly due to the garbage collector. To fix this, I optimized how particles are handled to reduce the workload on the game's engine.

- **Emitter Features**: Emitters have several settings like the shape (dot, square or triangle), system size, and maximum number of particles. There are also settings for each particle, like size evolution (size_start, size_end) and color (color_start, color_end). The emitting behavior includes settings like count_per_s and initial_visibles.
Here's an example of how an explosion is created:

```js
static createExplosion() {
    return {
      type: 'Trail',
      behavior: 'explosion',

      shape: 'tri',
      system_size: 6,
      count_per_s: 0,
      initial_visibles: 120,
      decay: 0.96,

      life: 1.2,
      size_start: 6,
      size_end: 0,
      velocity: 400,
      color_start: Palette.red,
      color_end: Palette.light
    }
  }
```

- **Updating Particles**: The [ParticleSystem](https://github.com/clallier/shmup_planet/blob/master/src/ecs/systems/particlessystem.js) updates all particles and emitters. For example, the `updateParticle()` function handles the changes to each particle.

- **Particle Features**: Particles have attributes like shape, color, and position. When a particle is 'dead', it's not displayed but is kept for recycling, which helps with performance.

- **Rendering Particles**: In the [vertex shader](https://github.com/clallier/shmup_planet/blob/master/src/shaders/particles_vx.glsl), we define how the particles appear in 3D space. The size adjusts based on their distance to the camera. The final appearance is determined in the [fragment shader](https://github.com/clallier/shmup_planet/blob/master/src/shaders/particles_fg.glsl), where we apply textures and colors.

```glsl
 v_color = (hidden < .5) ? vec4(color, 1.) : vec4(0.);
 v_angle = angle;
	
 vec4 pos = modelViewMatrix * vec4(position, 1.);
 gl_PointSize = (u_size + size) * (300. / length(pos));
 gl_Position = projectionMatrix * pos;
```

```glsl
float c = cos(v_angle);
float s = sin(v_angle);
vec2 p = gl_PointCoord - .5;

vec2 rotated_uv = vec2(
    (c * p.x + s * p.y) + .5, 
    (c * p.y - s * p.x) + .5
);
vec4 tex_color = texture2D(u_texture, rotated_uv);
gl_FragColor = tex_color * v_color;
```

This approach allowed me to create dynamic, visually appealing particle effects efficiently, adding depth and excitement to the game's environment.


![Particles example]({{ site.url }}{{ site.baseurl }}/assets/img/shmup_planet_particles.png)

### Making Things Easier with Coroutines 

In this project, I utilized coroutines[^5] to simplify complex tasks, such as chaining animations and updating game states. In JavaScript, this is achievable through function generators, a powerful feature for writing asynchronous code in a more readable way.


Here’s an example from the game, showing how I managed enemy waves:

```js
*createEnemies() {
    // For ten waves ... 
    for (let i = 0; i < 10; i++) {
      // Spawn enemies
      EntityFactory.createEnemies(i);
      // Then wait for the end of the wave
      // Internally, will check every second if they are still enemies
      yield this.waitEndOfWave(i);

      // End of wave: wait 2 s, then go next wave
      yield this.runner.waitSeconds(2);
    }
    console.log('Well done!')
  }
```
In this code, each yield pauses the execution until a certain condition is met, like the end of a wave, making it straightforward to implement complex game logic. This approach allows for creating sequences of events in a clear and manageable way.

Each coroutine can include sub-routines, they are stored in the [CoroutineRunner](https://github.com/clallier/shmup_planet/blob/master/src/coroutinerunner.js).
Itself integrated into the game’s ECS (Entity Component System) as a system. This integration streamlines the process of managing various game states and interactions, further simplifying the game development process.

## Final Thoughts:

That's all for the quick overview of the technical side of my project. I've thoroughly enjoyed learning and using technologies like Three.js for graphics, developing a particle system, and delving into coroutines and ECS for game logic management.

One last feature to mention is the mini-console. It's a handy tool that displays console.log messages right on the game screen, which is extremely helpful for debugging on mobile devices[^6].

I hope my project encourages you to explore your own creative ideas and see what you can build. Remember, it's all about learning, experimenting, and enjoying the journey!

Let's keep in touch! I’m always open to discussing new ideas, sharing experiences, and collaborating on future projects. Feel free to reach out!

[^1]: For instance on [Ben Chung's blog](http://benchung.com/basic-glsl-displacement-shader-three-js/) and on [Lee Stemkoski's three.js examples](http://stemkoski.github.io/Three.js/Particle-Engine.html).

[^2]: Implementation is from Stefan Gustavson: [github.com/stegu/webgl-noise](https://github.com/stegu/webgl-noise)

[^3]: Included in three.js: [threejs.org/examples/webgl_postprocessing_unreal_bloom](https://threejs.org/examples/webgl_postprocessing_unreal_bloom.html)

[^4]: We use [Ape ECS](https://github.com/fritzy/ape-ecs)

[^5]: From [David Beazley's talk](http://www.dabeaz.com/coroutines/Coroutines.pdf)

[^6]: Inspired from [this StackOverflow answer](https://stackoverflow.com/questions/47064232/how-can-i-get-console-log-output-from-my-mobile-on-the-mobile-device/48377000#48377000)
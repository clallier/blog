---
layout: post
title:  "A shaders experiment: crafting a small mobile shooter game using three.js, ECS and Coroutines!"
date:   2020-11-14 21:12:33 +0100
categories: experiment, three.js, ECS, shaders, coroutines, mini-console
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


This project, done during my weekends, was very instructive. I learned a lot and had fun making it. It's a good example of my work and how I like to learn new things in game development.

## Final Thoughts:
I encourage others to dive into similar projects. It's a rewarding way to learn new things and can really show your potential in game development or any field you're passionate about. Don't hesitate to experiment and explore - it's a great way to grow!

Let's keep in touch! I’m always open to discussing ideas, sharing experiences, or collaborating on new projects. Feel free to reach out!


[^1]: For instance on [Ben Chung's blog](http://benchung.com/basic-glsl-displacement-shader-three-js/) and on [Lee Stemkoski's three.js examples](http://stemkoski.github.io/Three.js/Particle-Engine.html).

[^2]: Implementation is from Stefan Gustavson: [github.com/stegu/webgl-noise](https://github.com/stegu/webgl-noise)

[^3]: Included in three.js: [threejs.org/examples/webgl_postprocessing_unreal_bloom](https://threejs.org/examples/webgl_postprocessing_unreal_bloom.html)

[^4]: We use [Ape ECS](https://github.com/fritzy/ape-ecs)
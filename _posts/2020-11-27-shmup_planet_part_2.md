---
layout: post
group: "Shmup planet"
title: "2. Making a Small Library for particles animation!"
date: 2020-11-27 21:00:00 +0100
categories: game, gamedev, experiment, Three.js, ECS, shaders, coroutines, mini-console, tech
image: "/assets/img/shmup_planet_player.png"
---


This article is part of a series, here are all the other articles:

- Part 0: [Introduction]({{ site.baseurl }}{% post_url 2020-11-14-shmup_planet_part_0 %})
- Part 1: [Shaders: displacement map and Bloom]({{ site.baseurl }}{% post_url 2020-11-19-shmup_planet_part_1 %})
- Part 2: [Making a Small Library for particles animation]({{ site.baseurl }}{% post_url 2020-11-27-shmup_planet_part_2 %}) ⬅️
- Part 3: [Making Things Easier with Coroutines]({{ site.baseurl }}{% post_url 2020-12-05-shmup_planet_part_3 %})

---

In this article, I'll talk about particles and a little library I made for particles and emitters management.
I love particles! They're used for many effects in this project, like static stars, trails, and explosions.

 - **Particle Systems in ECS**: We handle particles using the Entity Component System (ECS)[^4] principle. 
 We have particle emitters (Components), and a particles system (System) that manages the life cycle of the particles and emitters.
 For example, if we want the ship to have a trail of particles, we simply add a trail component to the ship entity.

- **Performance Challenge**: A big issue was dealing with many particles being created and destroyed. 
This process was heavy on performance, causing slowdowns mostly due to the garbage collector. 
To fix this, I optimized how particles are handled to reduce the workload on the game's engine.

- **Emitter Features**: Emitters have several settings like the shape (`dot`, `square` or `triangle`), system size, and maximum number of particles. 
There are also settings for each particle, like size evolution (`size_start`, `size_end`) and color (`color_start`, `color_end`). 
The emitting behavior includes settings like `count_per_s` and `initial_visibles`.
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

This approach allowed me to create dynamic, visually appealing particle effects efficiently, adding depth to the game's environment.

![Particles example]({{ site.url }}{{ site.baseurl }}/assets/img/shmup_planet_particles.png)

In the [next article]({{ site.baseurl }}{% post_url 2020-12-05-shmup_planet_part_3 %}) I'll talk about coroutines, and how to use them in a game. 
Thanks for reading and see you! 

[^4]: We use [Ape ECS](https://github.com/fritzy/ape-ecs)

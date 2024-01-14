---
layout: post
title: "[Shmup planet - 1] A shaders experiment: crafting a mobile shooter game using Three.js, ECS and coroutines!"
date: 2020-11-19 21:00:00 +0100
categories: game, gamedev, experiment, Three.js, ECS, shaders, coroutines, mini-console, tech
image: "/assets/img/shmup_planet_player.png"
---

This article is part of a series, here are all the other articles:

- Part 0: [Introduction]({{ site.baseurl }}{% post_url 2020-11-14-shmup_planet_part_0 %})
- Part 1: [Shaders: displacement map and Bloom]({{ site.baseurl }}{% post_url 2020-11-19-shmup_planet_part_1 %})
- Part 2: [Making a Small Library for particles animation]({{ site.baseurl }}{% post_url 2020-11-27-shmup_planet_part_2 %})
- Part 3: [Making Things Easier with Coroutines ]({{ site.baseurl }}{% post_url 2020-12-05-shmup_planet_part_3 %})

---

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

[^2]: Implementation is from Stefan Gustavson: [github.com/stegu/webgl-noise](https://github.com/stegu/webgl-noise)

[^3]: Included in Three.js: [threejs.org/examples/webgl_postprocessing_unreal_bloom](https://threejs.org/examples/webgl_postprocessing_unreal_bloom.html)

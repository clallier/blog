---
layout: post
title: "[Shmup planet - 1] Shaders: displacement map and Bloom"
date: 2020-11-19 21:00:00 +0100
categories: game, gamedev, experiment, Three.js, ECS, shaders, coroutines, mini-console, tech
image: "/assets/img/shmup_planet_player.png"
---

This article is part of a series, here are the other articles:

- Part 0: [Introduction]({{ site.baseurl }}{% post_url 2020-11-14-shmup_planet_part_0 %})
- Part 1: [Shaders: displacement map and Bloom]({{ site.baseurl }}{% post_url 2020-11-19-shmup_planet_part_1 %}) ⬅️
- Part 2: [Making a Small Library for particles animation]({{ site.baseurl }}{% post_url 2020-11-27-shmup_planet_part_2 %})
- Part 3: [Making Things Easier with Coroutines ]({{ site.baseurl }}{% post_url 2020-12-05-shmup_planet_part_3 %})

---

In this article, I'll first talk about a displacement shader, including its vertex and fragment shaders.
Then, I'll show how to use the `EffectComposer` for a Bloom pass.
Let's begin with the displacement map!

### Displacement map on the central sphere

![Displacement example]({{ site.url }}{{ site.baseurl }}/assets/img/shmup_planet_displacement.png)

For this part of the project, I made the central sphere look more interesting and bit 'evilish', in a simple way:

 - **Sphere with Displacement Map**: I started with a basic sphere and applied a cool effect known as displacement map.
This effect changes the shape of a object according to a greyscale image (referred to as a `map`), causing the displacement aligned with the map.
These images are usually encoded from black (a 0 value, indicating no displacement) to white (a 1 value, indicating maximum displacement).

In our case, we se this effect to alter the sphere's surface, making it look less flat and more detailed.

 - **Animating the Map with Perlin Noise**: To make the sphere's surface move, I used Perlin noise[^2]. 
This noise is generate random values (between 0 and 1) in a smoothed and consistant way over time, creating patterns that look more natural than complete random ones.
By combining these two elements, we can create an evolving displacement map.

Here's the key part of that code:
You can see the code I wrote for this in my [displacement_vx.glsl](https://github.com/clallier/shmup_planet/blob/master/src/shaders/displacement_vx.glsl) file.
 
 ```glsl
 // low frequency noise 
 float low_freq = 5.0 * pnoise(0.1 * position + vec3(time), vec3(100.));
 vec3 p = position + normal * low_freq;
 // varying float noise: to be used by the fragment shader
 noise = low_freq;
 gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
 ```

 - **Color Ramp for Visual Effect**: The color of the sphere is achieved with a simple color ramp technique. 
 This method is detailed in the [displacement_fg.glsl](https://github.com/clallier/shmup_planet/blob/master/src/shaders/displacement_fg.glsl) file.

```glsl
vec4 color1 = vec4(0.9, 0.50, 0.1, 1.);
vec4 color2 = vec4(0.9, 0.9, 0.5, 1.);

// compose the colour using the UV coordinate
// and modulate it with the noise
gl_FragColor =  mix(color2, color1, noise);
```
That's all for this effect. It's simple, efficient and elegant!

### Bloom Effect for Aesthetics

To enhance the visual appeal, I used a `UnrealBloomPass`[^3] for a glowing, bloom effect on the scene.
This is quite simple to achieve. You can find the implementation in the [threescene.js](https://github.com/clallier/shmup_planet/blob/master/src/threescene.js) file, which manage the Three.js scene.

In the constructor, it's necessary to declare an `EffectComposer`. 
This allows for chaining post-processing passes. 
Each pass acts like a filter, similar to how you add layers in image processors like Gimp or Photoshop.

```js
// As usual you need a renderer (the WebGLRenderer works well)
this.renderer = new WebGLRenderer({canvas: this.canvas/*, context*/});

// For post-processing screen effects, you need an EffectComposer 
this.composer = new EffectComposer(this.renderer);
// The RenderPass is the default pass
// It will produce the same effect as the default renderer
this.composer.addPass(new RenderPass(this.scene, this.camera));

// On top of the previous pass, we had the UnrealBloomPass
// We some tweaked parameters
// I like to play with strengh that is the intensity of the bloom 
// (a high value will turn everything white)
this.composer.addPass(new UnrealBloomPass(
    new Vector2(64, 64), // resolution
    1.1,    // strength
    1,      // radius
    0.2    //threshold
));

```

In the `render` method (the method called by the `requestAnimationFrame`):

```js
render(time, delta) {
    // Usually you use the default renderer.render() method
    // eg: `this.renderer.render(this.scene, this.camera);`
    // With the effect composer, we let the composer handle the rendering
    this.composer.render(delta);
}
```

The main goal was to make the sphere look good without being too complicated.
I aimed for it to be visually appealing yet simple.

That's all for this article!
See you soon for the [next one]({{ site.baseurl }}{% post_url 2020-11-27-shmup_planet_part_2 %}); where I'll talk about particles and the small library I created to control them.

[^2]: Implementation is from Stefan Gustavson: [github.com/stegu/webgl-noise](https://github.com/stegu/webgl-noise)

[^3]: Included in Three.js: [threejs.org/examples/webgl_postprocessing_unreal_bloom](https://threejs.org/examples/webgl_postprocessing_unreal_bloom.html)

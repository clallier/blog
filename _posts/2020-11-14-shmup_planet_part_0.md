---
layout: post
group: Shmup planet
title: "0. A shaders experiment: crafting a mobile shooter game using Three.js, ECS and coroutines!"
date: 2020-11-14 21:00:00 +0100
categories: game, gamedev, experiment, Three.js, ECS, shaders, coroutines, mini-console, tech
image: "/assets/img/shmup_planet_player.png"
---

<iframe src="https://shmup-6a843.web.app" width="100%" height="500px"></iframe>
*Touch (or click!) on the left/right part of the frame to move left/right. The goal is to explode rocks and flying saucers. [Play in full screen](https://shmup-6a843.web.app/).*

## Background and motivation

To summarize the motivation of this project, I **love making games** and I'm really interested in **web technologies**. Recently, I decided to learn about **shaders**, something I've wanted to do for a long time.
I found out interesting tutorials[^1] and it seems that Three.js is great for that.
I also think making games for mobile phones is an interesting challenge with strong input and compute constraints. 
Besides, I've been reading about **ECS** (Entity Component System) and **coroutines**. So, I thought this project would be a good chance to try all these things together.

My goal was to do a small project in my **free time over a few weekends**. I wanted to mix different parts of game development and web technology. It was important for the project to be simple and fit into my spare time. This was a chance for me to learn new things and have fun 🚀

## Key Features and Learning Points:

- **Shaders**: I'd like to try on one hand vertex and fragment shaders, and on the other hand the `EffectComposer`of Three.js.
- **Particles**: I wanted to have a visually appealing game, with a lot of effects like particles. So I wrote a small particle system, that ended in another shader.
- **Coroutines**: I wanted a simple way to organise sequences of events in the game. Sush sequences happend all the time and can be quite complicated like you have a bullet, if it hits something, you want to have multiples actions happend: delete the bullet, delete the thing it collide with, create particles  

## Next steps:

In the next articles we will see: 

<!-- - Part 0: [Introduction]({{ site.baseurl }}{% post_url 2020-11-14-shmup_planet_part_0 %}) -->
- Part 1: [Shaders: displacement map and Bloom]({{ site.baseurl }}{% post_url 2020-11-19-shmup_planet_part_1 %})
- Part 2: [Making a Small Library for particles animation]({{ site.baseurl }}{% post_url 2020-11-27-shmup_planet_part_2 %})
- Part 3: [Making Things Easier with Coroutines ]({{ site.baseurl }}{% post_url 2020-12-05-shmup_planet_part_3 %})


[^1]: For instance on [Ben Chung's blog](http://benchung.com/basic-glsl-displacement-shader-three-js/) and on [Lee Stemkoski's three.js examples](http://stemkoski.github.io/Three.js/Particle-Engine.html).
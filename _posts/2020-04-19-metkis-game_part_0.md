---
layout: post
title:  "[Metkis game - 0] Building 3D mobile game with Cannon.js physics: an experimental journey!"
date:   2020-04-19 21:00:00 +0100
categories: video game, gamedev, Three.js, 3D, Cannon.js, physics, physics engine, ECS, Entity-Component-Systems
image: "/assets/img/metkis_player.png"
---

## Introduction

I recently got hooked on 'Archero', developped by Gorilla Games and edited by Habby, a mobile game that combine high simplicity and a surprisingly good gameplay depth (I believe the game has already been copied numerous times). The player just moves around; the rest, like targeting and shooting, happens automatically. 
This elegant simplicity got me thinking about the controls on mobile game. So I started a small experimental project in JavaScript, integrating a physics engine I wanted to try for a long time: Cannon.js.


<iframe src="https://metkis.web.app/" width="100%" height="500px"></iframe>
*Touch the screen to have a virtual joystick. You can use your keyboard's arrows*.
[Play in full screen](https://metkis.web.app/).


As usual these projects are was also a learning journey for me, touching on new technologies and concepts I want to explore during my weekends.
So, let's dive into how I embarked on this adventure, transforming this idea into a 3D mobile game with physics.

## Project Overview

The core idea of my project was to create a simple roguelite game called 'Metkis', named after a game developer on Twitter who designed the original tileset of the game: [original Tweet](https://twitter.com/metkis/status/1024058489860186112). I'm particularly fond of this style. 

**_NOTE:_** [Jan 2024]: Metkis has closed his X(Twitter) account, I've updated the link to his Mastodon account. [Backup tweet from Internet Archive](https://web.archive.org/web/20211014180927/https://twitter.com/metkis/status/1024058489860186112)

The game features a single level where enemies flood in to destroy a specific objective, in this case, a simple tower behind the player.

I decided to use a physics engine, believing it could lead to emergent gameplay possibilities. 
I'd also like to blend 2D and 3D elements, so I developed a small library to render 2D graphics as textures within the 3D world.
This technique was particularly useful for building a basic GUI.

Another aspect I was keen to explore was ECS (Entity Component System), which seems to be gaining popularity in game development. 
I came across ECSY, an ECS framework developed by Mozilla, which caught my interest (more about it here: [https://www.youtube.com/watch?v=zVF4giVyp08](https://www.youtube.com/watch?v=zVF4giVyp08))

To develop 'Metkis', I used the following technologies:

- Three.js for 3D rendering.
- ECSY.js for implementing the game logic through the Entity Component System.
- Cannon.js for the physics simulation.
- GIMP for editing the 2D tileset.

Everything is pretty standard for a 3D game but here are some specificities, that we'll explore in the next articles: 

- Part 1: [Dynamic texture drawing]({{ site.baseurl }}{% post_url 2020-04-28-metkis-game_part_1 %})
- Part 2: [3D physics for the mobile web]({{ site.baseurl }}{% post_url 2020-05-06-metkis-game_part_2 %})
- Part 3: [Gluing all together with ECS (Entity-Component-System)]({{ site.baseurl }}{% post_url 2020-05-15-metkis-game_part_3 %})


## References: 

- Archero:
  - [https://www.habby.fun/about](https://www.habby.fun/about)
  - [https://www.mobygames.com/company/46607/gorilla-game-studio/](https://www.mobygames.com/company/46607/gorilla-game-studio/)

- Metkis: [https://merveilles.town/@metkis](https://merveilles.town/@metkis)

- Mozilla's ECSY: [https://github.com/ecsyjs/ecsy](https://github.com/ecsyjs/ecsy)

- Cannon.js: [https://schteppe.github.io/cannon.js/](https://schteppe.github.io/cannon.js/)

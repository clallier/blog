---
layout: post
title:  "Building a Compact 3D Mobile Game with Cannon.js Physics: An Experimental Journey!"
date:   2020-04-19 21:09:17 +0100
categories: experiment, three.js, Cannon.js
---

## Introduction

I recently got hooked on 'Archero', developped by Gorilla Games and edited by Habby, a mobile game that combine high simplicity and a surprisingly good gameplay depth (I believe the game has already been copied numerous times). The player just moves around; the rest, like targeting and shooting, happens automatically. 
This elegant simplicity got me thinking about the controls on mobile game. So I started a small experimental project in JavaScript, integrating a physics engine I wanted to try for a long time: Cannon.js.

As usual these projects are was also a learning journey for me, touching on new technologies and concepts I want to explore during my weekends.
So, let's dive into how I embarked on this adventure, transforming this idea into a 3D mobile game with physics.

## Project Overview

The core idea of my project was to create a simple roguelite game called 'Metkis', named after a game developer on Twitter who designed the original tileset of the game. I'm particularly fond of this style. The game features a single level where enemies flood in to destroy a specific objective, in this case, a simple tower.

I decided to use a physics engine, believing it could lead to emergent gameplay possibilities. I'm also fond of blending 2D and 3D elements, so I developed a small library to render 2D graphics as textures within the 3D world. This technique was particularly useful for building a basic GUI.

Another aspect I was keen to explore was ECS (Entity Component System), which seems to be gaining popularity in game development. I came across ECSY, an ECS framework developed by Mozilla, which caught my interest (more about it here: https://www.youtube.com/watch?v=zVF4giVyp08)

To develop 'Metkis', I used the following technologies:

- Three.js for 3D rendering.
- ECSY.js for implementing the game logic through the Entity Component System.
- Cannon.js for the physics simulation.
- GIMP for editing the 2D tileset.

## Deep Dive into Technical Aspects
3D Rendering and Physics Engine:

Explain how you utilized Three.js for 3D rendering.
Discuss the integration and functioning of the 3D physics engine.
Share any unique challenges and solutions in this area.
ECS (Entity-Component-System):

Elaborate on how you implemented the ECS architecture.
Discuss its benefits and any difficulties you faced.
GUI and Custom Textures:

Describe how you designed the GUI.
Explain the process of creating and integrating custom textures.
Rollup Configuration:

Detail your experience with Rollup for bundling the project.
Mention any specific plugins or configurations that were particularly useful.
Firebase Integration:

Discuss how you used Firebase in your project.
Share insights on integrating Firebase with a 3D game environment.


## References: 

Archero:
https://www.habby.fun/about
https://www.mobygames.com/company/46607/gorilla-game-studio/

Metkis:
https://merveilles.town/@metkis

ECSY: 
https://github.com/ecsyjs/ecsy


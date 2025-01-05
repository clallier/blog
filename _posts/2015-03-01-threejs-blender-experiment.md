---
layout: post
title: "Experiment with Three.js, Blender and pixel-art textures!"
date: 2015-03-01 21:00:00 +0100
categories: experiment, three.js, Blender3D
image: /assets/img/retrowipe_capture.png
---

## Experiment with Three.js and Blender

I Love the idea to combine retro vibes with modern rendering techniques. This post highlights an experimental project blending them.

![Experiment capture]({{ site.url }}{{ site.baseurl }}/assets/img/retrowipe_capture.png)

## Approach

- I wanted to try 3D graphics in the web browser. This project utilizes `three.js` for rendering a JSON 3D model modeled previously using Blender.
- Blender is used for creating simple model and wrap a texture created using GraphicsGale.
- The pixel art textures is in 64 x 64px and 8 colors, giving a unique vibrant aesthetic to this project.
- The modeling / wrapping / texturing takes me a few weekends. The coding part is about one or two hours.
- Everything is sticked together using browserify and Babel

## Project Structure

 - Source Code: Located in /js.
 - 3D Model and texture: in /data.
 - Built step produce a single bundle.js used in the index.html

## Live demo

This experiment is live here:

<iframe src="https://clallier.github.io/RetroWipe/" width="100%" height="500px"></iframe>

## Acknowledgments and References

This project leverages several key tools and technologies. Special thanks to the following:

- **Kenneth Fejer**: The spaceship model is inspired from his work. [Explore his work](https://kennethfejer).

- **Three.js**: A powerful JavaScript library and API for creating and displaying animated 3D computer graphics in a web browser. [Learn more about Three.js](https://threejs.org/).

- **Blender**: An open-source 3D creation suite supporting the entirety of the 3D pipeline. [Visit Blender3D](https://www.blender.org/).

- **Aseprite**: A pixel art tool that lets you create 2D animations for videogames. [Discover Aseprite](https://www.aseprite.org/).

- **Browserify**: A tool for compiling node-flavored commonjs modules for the browser. [Check out Browserify](http://browserify.org/).

- **BabelJS**: A JavaScript compiler that allows you to use next generation JavaScript, today. [Explore BabelJS](https://babeljs.io/).

---
layout: post
title:  "Building a compact 3D mobile game with Cannon.js physics: an experimental journey!"
date:   2020-04-19 21:09:17 +0100
categories: experiment, three.js, Cannon.js
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

The core idea of my project was to create a simple roguelite game called 'Metkis', named after a game developer on Twitter who designed the original tileset of the game.
I'm particularly fond of this style. 
The game features a single level where enemies flood in to destroy a specific objective, in this case, a simple tower.

I decided to use a physics engine, believing it could lead to emergent gameplay possibilities. 
I'm also fond of blending 2D and 3D elements, so I developed a small library to render 2D graphics as textures within the 3D world.
This technique was particularly useful for building a basic GUI.

Another aspect I was keen to explore was ECS (Entity Component System), which seems to be gaining popularity in game development. 
I came across ECSY, an ECS framework developed by Mozilla, which caught my interest (more about it here: [https://www.youtube.com/watch?v=zVF4giVyp08](https://www.youtube.com/watch?v=zVF4giVyp08))

To develop 'Metkis', I used the following technologies:

- Three.js for 3D rendering.
- ECSY.js for implementing the game logic through the Entity Component System.
- Cannon.js for the physics simulation.
- GIMP for editing the 2D tileset.

Everything is pretty standard for a 3D game but here are some specificities. 
Let's take a look at some technical aspects.

## Texture drawing:

![Texture example]({{ site.url }}{{ site.baseurl }}/assets/img/metkis_player.png)
*Here is an example with a 2D texture for the player*

I've written a little tool that can take any canvas and use it as a texture. 
This is convenient for having dynamic textures, like animations, procedurals animations on textures, or altering textures due to environment. 
For instance, see the above example with the player texture.

I've extend it with some others tools to render 2D GUIs in-game, for instance:  
![Mini GUI example]({{ site.url }}{{ site.baseurl }}/assets/img/metkis_mini_GUI_circular_loader.png)
*Here is another example with a GUI demonstrating a ground circular loader for the tower (it loads when you're nearby then the tower's GUI shows up) and the GUI once it's loaded, featuring some text and another circular loader showing an internal value.*

First let's look at the in-memory canvas creation. You can see an example with `getTile(x, y, options = {})` in [spritesheet.js](https://github.com/clallier/metkis_game/blob/master/src/spritesheet.js#L19))

```js
createCanvas(width, height, /* any other options */) {
    // create a canvas and its context
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    // scale ctx
    ctx.save();
    ctx.translate(0, 0);
    
    // draw with the canvas api, eg: 
    ctx.fillText(text, x, y);
    // can be ctx.drawImage, etc 

    // finally restore ctx
    ctx.restore();
    // return the context canvas
    return ctx.canvas;
}
```

This canvas can then be used as a texture, as shown in `createTexture(x, y, options = {})`in [entityfactory.js](https://github.com/clallier/metkis_game/blob/master/src/game/entityfactory.js#L35)

```js
createTexture(/* ... */) {
    // create our canvas
    const tile = createCanvas(16, 16);
    
    // set it in a texture
    const texture = new Texture(tile);

    /* ... any texture operations (flip, repeat, etc) */
    // here we let the texture be compatible with pixel-art
    texture.minFilter = LinearMipmapLinearFilter;
    texture.magFilter = NearestFilter;
    texture.needsUpdate = true;
    return texture;
}
```
Finally we can now apply our texture on a mesh. An example for this can be seen in `createCrate`` in [entityfactory.js](https://github.com/clallier/metkis_game/blob/master/src/game/entityfactory.js#L244)

```js 
createCrate(position = new Vector3(), size = new Vector3(1, 1, 1)) {
        const geometry = new BoxGeometry(size.x, size.y, size.z);

        // We use a first texture on a first material
        // we can do this for each needed material
        const material0 = new MeshBasicMaterial({
            map: this.createTexture(1, 11)
        })

        // We can add different material for each face:
        // left, right, top, bottom, back, front
        const materials = [];
        materials.push(material1); // left
        // ...

        // We add the materials to the mesh
        const mesh = new Mesh(geometry, materials);
        mesh.position.copy(position);

        // ... Cannon setup for the block (we'll see that later)
        // ... Ecsy setup for the block (we'll see that later)
    }
```
In each snippet, I've included comments to guide you through the process. 
Later in this post, I'll delve into how we set up the physics with Cannon.js and the entity logic with Ecsy for these elements.
Now let's see how to integrate our 3D physics engine into the game.

## 3D physics

One interesting aspect of incorporating a physics engine is the oppportunity of emergent gameplay.
This refers to unpredictable and complex behaviors that arise from simple interactions within the game's mechanics.

For example, players might strategically move blocks to create shields or alter enemy paths by blocking routes.

There are several 3D physics libraries available in JavaScript, such as Oimo.js, Ammo.js, and Physijs. (See the [References](#references) section for more.)

For this project, I choose to use Cannon.js. My decision was based on its robustness, similarity to Box2D (which I had experience with), ease of integration with ThreeJS, and high performance on mobile device.

Note (January 2024): When I first wrote this post, Cannon.js was already an old library.
It as been unmaintained for years, and Rapier appears to be emerging as its successor.
I've updated the [References](#references) section accordingly.
However, the principles and experiences shared here still provide valuable insights into working with physics engines in game development.

Init the physic world

```js
// Initialization
this.world = new CANNON.World();
// Set the gravity
this.world.gravity.set(0, -10, 0);
// set the debug renderer
this.debugRenderer = new CannonDebugRenderer(this.ts.scene, this.world);
```

The debug renderer can be found [here](https://github.com/clallier/metkis_game/blob/master/src/cannondebugrenderer.js)

When a entity is created, it's created with it's onw body, for instance for a crate:
We setup it's size, note that the physical size is half the size of the mesh.
The two systems, Three.js and Cannon.js, considere sizes a bit differently, which can be error prone.
Collision groups are usefull to filter collisions (for instance we don't want the player's bullets collide with itself)

```js
createCrate(position = new Vector3(), size = new Vector3(1, 1, 1)) {
  /* Create the geometry, the texture and the mesh, see the code above */

  // create the shape of the body of the crate,

  const box_size = new CANNON.Vec3(0.4 * size.x, 0.4 * size.y, 0.4 * size.z);
  const box = new CANNON.Box(box_size);

  // The crate's body 
  const body = new CANNON.Body({
      mass: 1,
      position: position,
      shape: box,
      
      // collision groups permit to filter collisions
      // Its own group is neutral 
      collisionFilterGroup: COLLISION_GROUP.NEUTRAL,
      // And it can collide with anything from all groups
      collisionFilterMask: COLLISION_GROUP.ALL
  })

  this.ecsy.createEntity()
      .addComponent(ThreeMesh, { value: mesh })
      .addComponent(CannonBody, { value: body })
}
```

Update the physics simulation at a certain precision (or sub step) 
See [physicsystem.js](https://github.com/clallier/metkis_game/blob/master/src/systems/physicsystem.js)
```js
// sim
for (let i = 0; i < this.precision; i++) {
    this.cannon_world.step(delta / this.precision);
}
```

After the Cannon.js's p world update we want to sync the 3d world of Three.js.
```js
// Query everything that have a Mesh component and a CannonBody (physics) component 
  this.queries.syncWithPhysics.results.forEach(e => {
      const mesh = e.getComponent(ThreeMesh).value;
      const body = e.getComponent(CannonBody).value;
      
      / and sync the mesh position/rotation with the physics body  
      mesh.position.copy(body.position);
      mesh.quaternion.copy(body.quaternion);
  })
```

Explain how you utilized Three.js for 3D rendering.
Discuss the integration and functioning of the 3D physics engine.
Share any unique challenges and solutions in this area.



## Gluing all together with ECS (Entity-Component-System):

- Challenge: communication between entities

Elaborate on how you implemented the ECS architecture.
Discuss its benefits and any difficulties you faced.
GUI and Custom Textures:

Describe how you designed the GUI.

## Pathfinding

## References: 

- Archero:
  - [https://www.habby.fun/about](https://www.habby.fun/about)
  - [https://www.mobygames.com/company/46607/gorilla-game-studio/](https://www.mobygames.com/company/46607/gorilla-game-studio/)

- Metkis:
  - [https://merveilles.town/@metkis](https://merveilles.town/@metkis)

- Mozilla's ECSY: 
  - [https://github.com/ecsyjs/ecsy](https://github.com/ecsyjs/ecsy)

Physics Engines: 
- Oimo.js: [https://github.com/lo-th/Oimo.js/](https://github.com/lo-th/Oimo.js/)
- Ammo.js: [https://github.com/kripken/ammo.js/](https://github.com/kripken/ammo.js/)
- Physijs: [https://chandlerprall.github.io/Physijs/](https://chandlerprall.github.io/Physijs/)
- Cannon.js: [https://schteppe.github.io/cannon.js/](https://schteppe.github.io/cannon.js/)
- Rapier: [https://github.com/dimforge/rapier/](https://github.com/dimforge/rapier)
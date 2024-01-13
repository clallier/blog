---
layout: post
title:  "[Metkis game 2] 3D physics for the mobile web!"
date:   2020-05-05 21:00:00 +0100
categories: experiment, three.js, Cannon.js
image: "/assets/img/metkis_player.png"
---

This article is a part of a series, composed of: 
- Part 0: [Introduction]({{ site.baseurl }}{% post_url 2020-04-19-metkis-game_part_0 %})
- Part 1: [Dynamic texture drawing]({{ site.baseurl }}{% post_url 2020-04-28-metkis-game_part_1 %})
- Part 2: 3D physics for the mobile web ⬅️ You are here.
- Part 3: [Gluing all together with ECS (Entity-Component-System)]({{ site.baseurl }}{% post_url 2020-05-15-metkis-game_part_3 %})

---

## Do we really need 3D physics? Isn't it slow?

One interesting aspect of incorporating a physics engine is the oppportunity of emergent gameplay.
This refers to unpredictable and complex behaviors that arise from simple interactions within the game's mechanics.

For example, players might strategically move blocks to create shields or alter enemy paths by blocking routes.

There are several 3D physics libraries available in JavaScript, such as `Oimo.js`, `Ammo.js`, and `Physijs`. (See the [References](#references) section for more.)

For this project, I choose to use `Cannon.js`. My decision was based on its robustness, similarity to `Box2D` (which I had experience with), ease of integration with ThreeJS, and high performance on mobile device (probably because it's a bit old).

**_NOTE:_** [Jan 2024]: When I first wrote this post, `Cannon.js` was already a quite old library. It as been unmaintained for years, and `Rapier` appears to be emerging as its successor. I've updated the [References](#references) section accordingly. However, the principles and experiences shared here still provide valuable insights into working with physics engines in game development.

The main principle of physics engines is that they are running in 'parrallel' of the rest of the world of our game.

While the game is running the physics 'world' with some parameters. 
This world will contains all the physics elements (called bodies) of the simulation, and run this simulation a given number of time each second.
We need to parameter this simulation with this number of updates per seconds, and the gravity.
The gravity can be seen as a constant force applied to all the bodies at each update.


Usually we use them using the following process: 
1. We first initialize the physics 'world' with some parameters. 
This world will contains all the physics elements (called bodies) of the simulation, and run this simulation a given number of time each second.
We need to parameter this simulation with this number of updates per seconds, and the gravity.
The gravity can be seen as a constant force applied to all the bodies at each update.

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
Generally at the end of the update loop, before the render loop.

```js
// Query everything that have a Mesh component and a CannonBody (physics) component 
  this.queries.syncWithPhysics.results.forEach(e => {
      const mesh = e.getComponent(ThreeMesh).value;
      const body = e.getComponent(CannonBody).value;
      
      // and sync the mesh position/rotation with the physics body  
      mesh.position.copy(body.position);
      mesh.quaternion.copy(body.quaternion);
  })
```

## References: 

Physics Engines: 
- Oimo.js: [https://github.com/lo-th/Oimo.js/](https://github.com/lo-th/Oimo.js/)
- Ammo.js: [https://github.com/kripken/ammo.js/](https://github.com/kripken/ammo.js/)
- Physijs: [https://chandlerprall.github.io/Physijs/](https://chandlerprall.github.io/Physijs/)
- Cannon.js: [https://schteppe.github.io/cannon.js/](https://schteppe.github.io/cannon.js/)
- Rapier: [https://github.com/dimforge/rapier/](https://github.com/dimforge/rapier)
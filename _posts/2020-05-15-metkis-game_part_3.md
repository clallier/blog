---
layout: post
title:  "[Metkis game 3] Gluing all together with ECS (Entity-Component-System)!"
date:   2020-05-15 21:00:00 +0100
categories: experiment, three.js, Cannon.js
image: "/assets/img/metkis_player.png"
---

## Gluing all together with ECS (Entity-Component-System):

### Gentle introducion on ECS:

In ECS, everything that can interact is an `Entity`, all the entityies are stored in a list by `ECSY`. An entity is a collection of `Components`.

#### Components

There are two type of components:
1. The simpler components: `TagComponent`. They act as a store for a single value, like a `tag`. For instance `CameraTarget` is a tag that say the camera has to follow, `Controllable` is a tag saying the entity will be controllable.

2. One the other hand, we have complex components, like a `ThreeMesh` (for a three.js 's mesh) component, that will store more than a simple tag:

```js
export class ThreeMesh extends Component {
    constructor() {
        super();
        // Will store the mesh given a creation time
        // eg: in CreateEntity.js  
        this.value = null;
    }

    reset() {
        // reset the value to default (null) = no mesh 
        this.value = null;
    }
}
```
This component store a mesh to be render by the the rendering `System` (we'll explain Systems in a minute).
This is very valuable because one can create an entity in a very `declarative` way, as a simple collection of tags and data `Components`.
For instance, it's very efficient to save the state of an application (simply store the state of all the entities in a file)
To create level it's also very easy, you can put all the entities in a json file and write a simple reader that will act as a `Factory`.

#### Entities
An example of an entity has been shown previously with the `createCrate`, it is a method of our `EntityFactory`:

```js
createBlock(position = new Vector3(), size = new Vector3(1, 1, 1)) {
        // 1. Create the Three.js mesh 
        const geometry = new BoxGeometry(size.x, size.y, size.z);
        // const material0 = new MeshBasicMaterial({
        // ...
        // ...
        // const mesh = new Mesh(geometry, materials);

        // 2. Create Cannon.js' body 
        const box_size = new CANNON.Vec3(0.5 * size.x, 0.5 * size.y, 0.5 * size.z);
        // const box = new CANNON.Box(box_size);
        // ...
        // const body = new CANNON.Body({
        // ...

        // 3. Finally create the entity and add the mesh and body in the 
        // respective components
        this.ecsy.createEntity()
            .addComponent(ThreeMesh, { value: mesh })
            .addComponent(CannonBody, { value: body })
    }
```

#### Systems

To understand systems, the key is that a system is responsible for only one aspect of the application. 
But more concretly what's defining a System?

- A system has no internal state, everything is handled by the components.
- It only defines two things: 
1. An execute function that will be triggered at each update.
2. A list of `Queries`

Let's see an example, the [SceneSystem](https://github.com/clallier/metkis_game/blob/master/src/systems/scenesystem.js) that handles the Three.js' meshes:

Let's start with queries:
A query can be seen as in a SQL system, it'll select entities based on some  component properties.
    
For instance, our first query (nammed `entities`) will select **ALL** the entities that own a ThreeMesh component, **AND** that's have been created or removed since the last update :
```js
entities: {
    components: [ThreeMesh],
    listen: {
        added: true,
        removed: true
    }
},
```

Our second query, called `syncWithPhysics` will select all the entities with both a ThreeMesh and a CannonBody component

```js
syncWithPhysics: {
    components: [ThreeMesh, CannonBody]
}
```

Finally, during the execute method, we apply some mecanics for each entity of each query

```js
execute() {
    // for all the entities that has been removed 
    this.queries.entities.removed.forEach(e => {
        // get the mesh stored in the component
        const mesh = e.getRemovedComponent(ThreeMesh).value;
        // and remove it from the Three.js' render scene 
        this.scene.remove(mesh);
    })

    // for all the entities that has been added during the last update
    this.queries.entities.added.forEach(e => {
        // get the mesh
        const mesh = e.getComponent(ThreeMesh).value;
        // and add it to the render scene
        this.scene.add(mesh);
    })

    // For the second query (syncWithPhysics), we collect all the entities
    // (with both a ThreeMesh and a CannonBody)
    this.queries.syncWithPhysics.results.forEach(e => {
        // get the mesh
        const mesh = e.getComponent(ThreeMesh).value;
        // get the body
        // (the body position/rotation have been altered by the Physics system)
        const body = e.getComponent(CannonBody).value;
        // So we apply these modifications to the mesh of the entity
        // (Quaternions are a way to store rotations)
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
    })
}
```

All the systems are stored in the ECSY's `World`.
Here is the list of the systems we use:

```js
this.ecsy = new World()
    // time related stuff
    .registerSystem(TimerSystem)
    // animation of the sprites
    .registerSystem(SpriteAnimationSystem)
    // Meshes animation
    .registerSystem(MeshAnimationSystem)
    // Weapons
    .registerSystem(WeaponSystem)
    // The enemies waves
    .registerSystem(WavesControllerSystem)
    // Looting
    .registerSystem(DropSystem)
    // Updating the GUI
    .registerSystem(GUISystem)
    // Camera and controls
    .registerSystem(CameraSystem, { camera: this.ts.camera, control: this.ts.control })
    // The physics: Cannon.js
    .registerSystem(PhysicSystem, { cannon_world: this.world, controller: this.controller })
    // The scene: Three.js
    .registerSystem(SceneSystem, { scene: this.ts.scene })

// later (once everything has been loaded)
// The pathfinding
this.ecsy.registerSystem(EnemyPathFindingSystem, { map_level });
```

Each update of the game we call `this.ecsy.execute(delta, time);` that will trigger each System in the order we registered them.



- Challenge: communication between entities
- Deletion after a certain time

Discuss its benefits and any difficulties you faced.

#### How to shoot a bullet in an ECS World?

The global schema is the following:

1. First the `DistanceWeapon` component, attached to the Player entity, permit to store all values related to the way the bullets are spawn. The spaws itself is then managed by the `WeaponSystem` at update time.

2. In the `WeaponSystem`, when the cooldown (`DistanceWeapon.time`) is down to zero, `entityFactory.createBullet()` is triggered, this have as effect to create a Bullet entity, with the following components:
    - DeleteAfter
    - ThreeMesh
    - CannonBody: collision groups and masks
    - Collider
    - ApplyInpulse
3.  In the `PhysicsSystem`, 
    - query for added entities with `Collider` tag and `CannonBody` component, 
    - for each of these entities add a listener for collision (will use the collisions groups and masks)
    - In the collision handler:  
        - deal damages (`Damageable` component)
        - if damageable.hp < 0, delete the entity    

4. When the entity is deleted
    - drop item

First we have the `DistanceWeapon` component:
In ECS, the components store the state for each entity.
In our game, the bullets are shot automatically, given a span of time.
So the component have to keep track of the timer to the next bullet spawn.
        
```js
export class DistanceWeapon extends Component {
    constructor() {
        super();
        this.reset();
    }

    reset() {
        // Cooldown between two shots
        // Inner timer to fire the next bullet, in s
        // At init time we choose have a longer time (here 10s) 
        this.time = 10;
        // When the timer is depleted, we reset its value to the delay value
        this.delay = 0.2;
        // Initial bullet inpulse speed
        this.impulse_speed = 5;
        // ...
        // The current enemy target 
        this.target = null;
        // The cooldown before choose another target
        this.time_to_next_target = 10;
        // The associated delay
        this.delay_to_next_target = 0.5;
    }
}
```

All our components are defined in [components.js](https://github.com/clallier/metkis_game/blob/master/src/components.js)

Every entity with an instance of this component can fire bullets.
Each variable can have specific values, for instance we can have a very low cooldown to make a machine gun, use the impulse_y to make a grenade laucher, etc.

The player's entity has such a component.

Create a component, for instance ApplyInpulse (apply an force on a given entity's body)
```js
export class ApplyImpulse extends Component {
    constructor() {
        super();
        this.reset();
    }

    reset() {
        this.impulse = null;
        this.point = null;
    }
}
```

```js

```

Not completely satisfied with the ECSY Api 

**_NOTE:_** [Jan 2024]: Today this has changed


GUI and Custom Textures:
Describe how you designed the GUI.


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
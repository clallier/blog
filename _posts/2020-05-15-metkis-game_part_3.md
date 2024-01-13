---
layout: post
title:  "[Metkis game - 3] Gluing all together with ECS (Entity-Component-System)!"
date:   2020-05-15 21:00:00 +0100
categories: video game, gamedev, Three.js, 3D, Cannon.js, physics, physics engine, ECS, Entity-Component-Systems
image: "/assets/img/metkis_player.png"
---

This article is a part of a series, composed of: 
- Part 0: [Introduction]({{ site.baseurl }}{% post_url 2020-04-19-metkis-game_part_0 %})
- Part 1: [Dynamic texture drawing]({{ site.baseurl }}{% post_url 2020-04-28-metkis-game_part_1 %})
- Part 2: [3D physics for the mobile web]({{ site.baseurl }}{% post_url 2020-05-06-metkis-game_part_2 %})
- Part 3: Gluing all together with ECS (Entity-Component-System) ⬅️ You are here.

<!-- https://giphy.com/embed/NT7BKluIkiw7kxnle5 -->
{% include giphy.html id='NT7BKluIkiw7kxnle5' %}

This article is the third of the serie.
We'll see the fundamental elements of ECS, a popular and efficient pattern: entities, components and ... well, systems, and illustrate how they work throught examples.
This article is especially useful for those new to ECS, and will focus on `ECSY` a framework recently built by Mozilla.

### Gentle introduction on ECS:

In ECS (Entity Component System), everything that interacts is an `Entity`.
ECSY stores all these entities in a list.
An entity is simply a collection of `Components`.

#### Components

There are two types of components:

1. Simple components: `TagComponent`. These act like a storage for a single value, such as a `tag`. For example, `CameraTarget` is a tag indicating the camera should follow, and `Controllable` is a tag that means the entity can be controlled.

2. One the other hand, we have complex components, for instance, a [ThreeMesh](https://github.com/clallier/metkis_game/blob/master/src/components.js#L37) (for a Three.js mesh) component stores more than a simple tag:

```js
export class ThreeMesh extends Component {
    constructor() {
        super();
        // Stores the mesh given at creation time
        // eg: in CreateEntity.js  
        this.value = null;
    }

    reset() {
        // Resets the value to default (null) = no mesh 
        this.value = null;
    }
}
```

This component stores a mesh to be render by the the rendering `System` (which we'll explain shortly).
It's valuable because it allows creating an entity in a declarative way, simply as a collection of tags and data `Components`.

For example, it's efficient for saving the state of an application (just store the state of all entities in a file). 
Creating levels is also easy; you can place all entities in a JSON file and write a simple reader to act as a Factory.

Let's now explore entities. 

#### Entities

We previously saw an entity example with the `createCrate` method in our [entityfactory.js](https://github.com/clallier/metkis_game/blob/master/src/game/entityfactory.js#L244):

```js
createBlock(position = new Vector3(), size = new Vector3(1, 1, 1)) {
        // 1. Create a Three.js mesh 
        const geometry = new BoxGeometry(size.x, size.y, size.z);
        // const material0 = new MeshBasicMaterial({
        // ...
        // ...
        // const mesh = new Mesh(geometry, materials);

        // 2. Create a Cannon.js body 
        const box_size = new CANNON.Vec3(0.5 * size.x, 0.5 * size.y, 0.5 * size.z);
        // const box = new CANNON.Box(box_size);
        // ...
        // const body = new CANNON.Body({
        // ...

        // 3. Finally, create the entity and add the mesh and body to 
        // the respective components
        this.ecsy.createEntity()
            .addComponent(ThreeMesh, { value: mesh })
            .addComponent(CannonBody, { value: body })
    }
```
This shows how to create an entity in ECS. 
Here, involving mesh creation with Three.js, body creation with Cannon.js, and finally adding these elements to an entity using ECSY.

Now, let's dive into Systems in ECS.

#### Systems

To understand the concept of systems, it's important to understand that a system is dedicated to only one aspect of the application. 
Let's see that with examples and unravel what exactly defines a System?

- A system doesn't have an internal state; everything is managed by the components.
- It defines two main elements:
    1. An `execute` function that will be triggered at each update.
    2. A list of `Queries`.

Let's Consider the [SceneSystem](https://github.com/clallier/metkis_game/blob/master/src/systems/scenesystem.js) as an example. This system manages the Three.js meshes:

Starting with queries: a query in ECS is similar to one in a SQL system. It selects entities based on specific component properties.
    
For example, our first query, named `entities`, selects **ALL** entities that have a ThreeMesh component, **AND** have been created or removed since the last update:

```js
entities: {
    components: [ThreeMesh],
    listen: {
        added: true,
        removed: true
    }
},
```

Our second query, `syncWithPhysics` selects all entities that possess both a ThreeMesh and a CannonBody component:

```js
syncWithPhysics: {
    components: [ThreeMesh, CannonBody]
}
```

Finally, let's look at how the `execute` method applies mechanics to each entity in each query:

```js
execute() {
    // For all the entities that has been removed 
    this.queries.entities.removed.forEach(e => {
        // get the mesh stored in the component
        const mesh = e.getRemovedComponent(ThreeMesh).value;
        // and remove it from the Three.js' render scene 
        this.scene.remove(mesh);
    })

    // For all the entities that has been added during the last update
    this.queries.entities.added.forEach(e => {
        // Get the mesh
        const mesh = e.getComponent(ThreeMesh).value;
        // And add it to the render scene
        this.scene.add(mesh);
    })

    // For the second query (syncWithPhysics), gather all the entities
    //  with both a ThreeMesh and a CannonBody
    this.queries.syncWithPhysics.results.forEach(e => {
        // Get the mesh
        const mesh = e.getComponent(ThreeMesh).value;
        // Get the body (altered by the Physics system)
        const body = e.getComponent(CannonBody).value;
        // Apply these modifications to the entity's mesh
        // (Quaternions store rotations)
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
    })
}
```
Pretty easy, right?
This example illustrates the simplicity and effectiveness of the ECS pattern in handling entities and their interactions.
The execute method showcases mechanics application for entities based on their respective queries, demonstrating ECS's power.

All systems within ECSY are organized in the World. Below is a list of the systems we utilize:

```js
this.ecsy = new World()
    // Time-related functionalities
    .registerSystem(TimerSystem)
    // Animation of sprites
    .registerSystem(SpriteAnimationSystem)
    // Animation of meshes
    .registerSystem(MeshAnimationSystem)
    // Weapons management
    .registerSystem(WeaponSystem)
    // Enemy waves control
    .registerSystem(WavesControllerSystem)
    // Item dropping
    .registerSystem(DropSystem)
    // GUI updates
    .registerSystem(GUISystem)
    // Camera and controls management
    .registerSystem(CameraSystem, { camera: this.ts.camera, control: this.ts.control })
    // Physics handling with Cannon.js
    .registerSystem(PhysicSystem, { cannon_world: this.world, controller: this.controller })
    // Scene management with Three.js
    .registerSystem(SceneSystem, { scene: this.ts.scene })

// Later, after everything is loaded
// Pathfinding for enemies
this.ecsy.registerSystem(EnemyPathFindingSystem, { map_level });
```
In each game update, we invoke `this.ecsy.execute(delta, time)` to trigger each System in the order they were registered.
This process ensures a coordinated and systematic update of all game aspects, from animations and physics to enemy behavior and user interface.

#### Use case: how to shoot a bullet in an ECS World?

Here is an overview of the steps involved in shooting a bullet, hitting enemies, destroying them once defeated and dropping loot in their place.
This process involve the interaction of four systems and several components:

1. **Storing Bullet Information**: The `DistanceWeapon` component acts like a backpack on the Player character.
It contains all the details about bullets creation and firing.
It's like a recipe book for bullets.
The [WeaponSystem](https://github.com/clallier/metkis_game/blob/master/src/systems/weaponsystem.js) acts like a chef, follows these recipes and crafts bullets.

2. **Making Bullets**: Inside the `WeaponSystem`, the countdown timer (`DistanceWeapon.time`) is decreased.
When this timer reaches zero, it signals the system it's "time to make a bullet!". This is achived through [entityFactory.createBullet()](https://github.com/clallier/metkis_game/blob/master/src/game/entityfactory.js#L401).
The bullet, as an entity, has several components:
 - `DeleteAfter`: a self-destruct timer determining when the bullet is removed from the world.
 - `ThreeMesh`: stores the bullet a shape and look.
 - `CannonBody`: handles bullet movement and interactions using collision groups and masks.
 - `Collider`: this tag enables to detect collisions with other objects.
 - `ApplyImpulse`: the bullet's engine, giving it the push to move forward.\\
 All these components are defined in [components.js](https://github.com/clallier/metkis_game/blob/master/src/components.js)

3. **Bullet Physics and Collision**:
  - The [PhysicsSystem](https://github.com/clallier/metkis_game/blob/master/src/systems/physicsystem.js) queries new entities (like our bullet) that can bump into things (having `Collider`) and possess physical properties (`CannonBody`).
  - For each bullet found, the system sets up a way to detect collisions.
  Imagine this like giving the bullet a sensor to know when it hits something.
  Detecting collision has a cost on the performance. The `Collider` tag permits to optimize this cost.
  - When a bullet hits something, the `collision handler` takes over.
  It deals damage to whatever has a `Damageable` component was hit.
  - If the hit causes the enemy's health points (`damageable.hp`) to go below zero, the enemy is marked for removal via the `DeleteAfter` component. **Note**: `DeleteAfter` is a component schedule entity removal after a specified duration.
  If we set this duration to 0, ensures removal in the next update by the [TimerSystem](https://github.com/clallier/metkis_game/blob/master/src/systems/timersystem.js).
  - The enemy are also equipped with a `DroppableOnDeath` component, triggering gold loot on death.

4. One the enemy is dead, the [DropSystem](https://github.com/clallier/metkis_game/blob/master/src/systems/dropsystem.js) queries the `DroppableOnDeath` component and the enemy's position, then instruct the `EntityFactory` to create an item at the enemy's location.

This process creates a dynamic system where the player's actions have effects in the game world, such as shooting bullets, damaging enemies and making them drop items.

To conclude, ECS is like using LEGO blocks.
You put different blocks (components) together to make characters or things (entities). 
Then, you use rules (systems) to make them do fun things, like shooting and finding treasures. 
Once you have your building blocks, it makes creating things easy because everything is modular.
But as a drawback, interactions can be sometimes complicated and harder to debug!

That's also the end of this article series on dynamic texture drawing, 3D physics usage, and Entity Component System (ECS).
These technolgies were exciting to explore.
As usual it was a fun project to make during my weekends.
I hope you'll find these articles usefull and that they'll inspire you to create amazing projects and games.

See you next time 🎮🚀🌟

## References: 

- Mozilla's ECSY: [https://github.com/ecsyjs/ecsy](https://github.com/ecsyjs/ecsy)

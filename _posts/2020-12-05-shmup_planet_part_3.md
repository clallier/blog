---
layout: post
title:  "[Shmup planet - 3] Making Things Easier with Coroutines!"
date:   2020-12-05 21:00:00 +0100
categories: game, gamedev, experiment, Three.js, ECS, shaders, coroutines, mini-console, tech
image: "/assets/img/shmup_planet_player.png"
---


This article is part of a series, here are all the other articles:

- Part 0: [Introduction]({{ site.baseurl }}{% post_url 2020-11-14-shmup_planet_part_0 %})
- Part 1: [Shaders: displacement map and Bloom]({{ site.baseurl }}{% post_url 2020-11-19-shmup_planet_part_1 %})
- Part 2: [Making a Small Library for particles animation]({{ site.baseurl }}{% post_url 2020-11-27-shmup_planet_part_2 %})
- Part 3: [Making Things Easier with Coroutines ]({{ site.baseurl }}{% post_url 2020-12-05-shmup_planet_part_3 %})

---

### Making Things Easier with Coroutines 

In this project, I utilized coroutines[^5] to simplify complex tasks, such as chaining animations and updating game states. In JavaScript, this is achievable through function generators, a powerful feature for writing asynchronous code in a more readable way.


Here’s an example from the game, showing how I managed enemy waves:

```js
*createEnemies() {
    // For ten waves ... 
    for (let i = 0; i < 10; i++) {
      // Spawn enemies
      EntityFactory.createEnemies(i);
      // Then wait for the end of the wave
      // Internally, will check every second if they are still enemies
      yield this.waitEndOfWave(i);

      // End of wave: wait 2 s, then go next wave
      yield this.runner.waitSeconds(2);
    }
    console.log('Well done!')
  }
```
In this code, each yield pauses the execution until a certain condition is met, like the end of a wave, making it straightforward to implement complex game logic. This approach allows for creating sequences of events in a clear and manageable way.

Each coroutine can include sub-routines, they are stored in the [CoroutineRunner](https://github.com/clallier/shmup_planet/blob/master/src/coroutinerunner.js).
Itself integrated into the game’s ECS (Entity Component System) as a system. This integration streamlines the process of managing various game states and interactions, further simplifying the game development process.

## Final Thoughts:

Final word on ECS: I prefer APE over ECSY, the general API is clearer, the performance are better.

That's all for the quick overview of the technical side of my project. I've thoroughly enjoyed learning and using technologies like Three.js for graphics, developing a particle system, and delving into coroutines and ECS for game logic management.

One last feature to mention is the mini-console. It's a handy tool that displays console.log messages right on the game screen, which is extremely helpful for debugging on mobile devices[^6].

I hope my project encourages you to explore your own creative ideas and see what you can build. Remember, it's all about learning, experimenting, and enjoying the journey!

Let's keep in touch! I’m always open to discussing new ideas, sharing experiences, and collaborating on future projects. Feel free to reach out!

[^5]: From [David Beazley's talk](http://www.dabeaz.com/coroutines/Coroutines.pdf)

[^6]: Inspired from [this StackOverflow answer](https://stackoverflow.com/questions/47064232/how-can-i-get-console-log-output-from-my-mobile-on-the-mobile-device/48377000#48377000)
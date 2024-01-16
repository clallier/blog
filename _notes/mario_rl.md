
<!-- Adapted from Sourish Kundu's video : https://www.youtube.com/watch?v=_gmQZToTMac -->

Brief overview of Reinforcement Learning (RL) and Proximal Policy Optimization (PPO).
Introduction to the Mario Bros game as a testbed for RL algorithms.

## Section 1: Understanding RL
Definitions
- **Agent**: The algorithm that learns and makes decisions. For instance, in chess, it can be the algorithm playing one of the two sides.

- **Environment**: What the agent interacts with. It can provide rewards in response to the agent's actions. In the chess analogy, this includes the chess framework and the board. A reward might be given for capturing an opposing piece or expanding ground control.

- **State**: A snapshot of the environment at a specific time. Example: The arrangement of pieces on a chessboard at a given moment.

- **Action**: The agent's input to the environment. In chess, this could be moving a pawn to B3. The action space is the range of possible actions the agent can choose from. While it can be vast in chess, in games like Tetris, it is relatively limited: move left, move right, rotate left, rotate right, and move down at each frame.

- **Reward**: A value provided by the environment (or computed from the state) indicating the positivity of an action. This can be challenging to compute or apply. For example, in chess, you might use a 'value function' to interpret and reward actions (e.g., capturing a rook is worth 5 points, checkmating the king is worth 10 points). In video games, the score is often used as part of the reward.

[//]: # (- **Value function**: A function that returns a value for a given state.)

- **Action-value function**: A function that returns a value for a given state-action pair. This is more specific than a value function. For example, in chess, when in check, an action leading to checkmate is more valuable than one that merely expands control. In RL, this function is often estimated and optimized to 'solve' a game.

- **Exploitation vs exploration**: This refers to a bias in the agent's behavior. In exploitation, the agent takes actions it knows will yield rewards. In exploration, it tries new actions to discover new strategies. This is often controlled by a parameter called epsilon and can be seen as rewarding exploration.

- **Policy**: A function that maps states to actions. For an agent, it can be a strategy like "when I see this state (or sub-state), I do that." In chess, a policy might be to move the king out of check when detected.

[//]: # (- **Episode**: A sequence of actions from the initial state to a terminal state, along with the rewards for each state-action pair.)

- **Replay buffer**: A record of all previous episodes. This can be used to develop the agent's policy. Essentially, it's an array of (state, action, reward, next state, done).

- **The problem we try to solve**: The core issue in RL is how to effectively assign rewards to the sequence of actions that lead to a delayed outcome. 
In many scenarios, the ultimate reward (or penalty) is only known at the end of a sequence of actions, such as winning or losing a chess game. 
The challenge lies in determining how to attribute value to each individual action that contributed to that final outcome. 
This process is complicated because the appropriate reward for an action depends not only on the immediate result but also on the future consequences of that action, which are influenced by the agent's evolving understanding of the environment. 
In essence, we need to figure out how to backpropagate the final reward to earlier actions, shaping the agent's policy (its decision-making strategy) to favor actions that are more likely to lead to successful outcomes in the long run.
This is achieved by estimating and optimizing functions like value functions or action-value functions, which help the agent predict the long-term value of actions taken in specific states.

Approaches:
- **Epsilon greedy approach**:
- **Action-value function intuition**:
- **Discount factor**: 

TODO equations (bellman's):
Q(s, a) = r + epsilon . max(Q(s', a'))

y = r + epsilon . max(Q(s', a'))
^y = Q(s, a)
MSE = 1/2(y-^y)^2
betaMSE/beta^y = y - ^y

## DDQN algorithm
- based on a CNN
- input state size: the image size 
- output size: 5 (= predicted Q Value for the associated action paired with the input state)
- TWO networks:
    - **online** one: will be trained online
    - **target** one: ground true to give our loss function, will not be trained. Its weights will be copied from the online network

Key Point: What is PPO and why it's popular in RL.
Key Point: Core principles of PPO: policy gradient method, clipped surrogate objective, etc.

PPO vs Deep Q-Learning vs NEAT

1. Algorithm Type: Approach and Complexity

- **PPO**: A policy-based RL algorithm that directly optimizes the policy. Known for its balance of efficiency and stability, especially in continuous action spaces.
- **DQN**: A value-based RL algorithm, focusing on learning the value of each action in a given state. Effective in discrete action spaces but can struggle with stability and complexity in certain environments.
- **NEAT**: NEAT: An evolutionary algorithm that evolves both the structure and weights of neural networks, diverging significantly from traditional RL methods: unlike PPO and DQN, NEAT does not require gradient-based learning and evolves network topology and weights simultaneously.


2. Stability and Complexity of Training

- **PPO**: Known for its training stability due to the clipped surrogate objective, which prevents drastic changes in the policy. This stability makes PPO more suitable for environments with high-dimensional inputs and complex action spaces but can be complex in training.
- **DQN**: While effective, DQN can be less stable and more sensitive to hyperparameters like learning rate. It often requires additional techniques like experience replay and target networks to improve training stability.
- **NEAT**: Offers a different kind of stability that comes from evolutionary processes. The training complexity can vary greatly depending on the problem, as it involves managing populations of neural networks and their evolution.

3. Suitability for Different Types of Problems

- **PPO**: Generally preferred for problems with a large or continuous action space (such as robotics or complex strategy games) due to its direct approach to optimizing policies.
- **DQN**: More suited for problems with discrete and smaller action spaces. DQN has been successfully applied in environments like classic Atari games, where the action space is limited and well-defined.
- **NEAT**: Effective in scenarios where the optimal network architecture is unknown or needs to be discovered, and in creative domains. Its flexibility makes it suitable for a wide range of problems, though it may not always be the most efficient choice.

4. Ease of Implementation

- **PPO**: Moderately easy to implement among policy-based methods, but requires a good knowledge of RL concepts.
- **DQN**: Relatively easier to implement and understand, making it a popular choice for those new to RL. However, managing its components like the replay buffer and target network requires additional coding effort.
- **NEAT**: Requires a different approach to implementation, focusing on evolutionary strategies. It can be complex to set up initially but offers a unique approach to solving problems without the need for explicit training data.



## References
Deep Q Learning: 
- https://medium.com/@joachimiak.krzysztof/learning-to-play-pong-with-pytorch-tianshou-a9b8d2f1b8bd

## Section 3: Implementing PPO for Mario Bros
Key Point: Overview of setting up the training environment.
Key Point: Discussion of the specific challenges faced with PPO in Mario Bros.

## Exploring the state space
Dealing with sparse rewards
Complexity of temporal dependencies

## Section 4: Results and Observations
Key Point: Share experimental results, if available.
Key Point: Discuss the limitations and challenges observed.
Difficulty in policy convergence
High variance in agent performance
Need for extensive hyperparameter tuning

## Section 5: Comparing with Other RL Methods
Key Point: Brief comparison with other RL methods like DQN, A3C, etc.
Key Point: Why certain methods may be more effective in this context.

## Section 6: Lessons Learned and Future Directions
Key Point: Summarize key lessons from the experiment.
Key Point: Future possibilities for improving PPO’s performance in complex environments like Mario Bros.

## Conclusion
Recap of the challenges and potential of using PPO in complex gaming environments.
Encouragement for further research and experimentation in the field.

## References
List any academic papers, articles, or resources referenced in the blog.
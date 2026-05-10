OK I was thinking of:
1. who I am (Bad bowling player, so I falled back to ML/Agentic systems)
2. What I am searching: Large company/scale up with nice people, an tech and data appealing, preferably in remote (or in the Bordeaux area) with a french contract. In the fields of ML engineering, agentic systems
3. My motivations: I like to work in new technical environments, I like nice people, I'd like to have a salary more in the average range for senior data scientist, I'd like to refocus a bit on ML Training/finetuning.
We can also say that agentic systems are full of challenges: 
---
1. security: 
- a. prompt jacking and injection 
- b. calling unknown MCP server can create data breach 
- c. the need of secure credential vaults - d. human in the loop to avoid insecure calls, 
2. context management: what if tool return large blobs of data, or large multi turns interactions, how to share memory/gistoric beetwen agents? 
3. replication: how to be 100% certain an agent which works on a task will continue to work the next 100 executions? 
4. a. data ownership/sovereignity: LLM/cloud providers can be outside of EU area. 
5. Architecture. How to manage different model providers with differents API? (specifically for parrallel function calling or JSON output format, and other parameters like temperature, top_P, top_K, etc) How to provide an internal API layer to abstract this complexity and let anyone in the company implement LLM/assistant or agent calls in the solution? 
6. Complexity:
- a. speed vs accuracy: larger models/ complex agentic systems can take a lots of iterations/turn/compute to sometimes only call/interprete a single tool. 
- b. complexy vs reproductibility: multi-agents systems are less reproductibles but often more adaptable. 
7. Monitoring drift: how to create realistic and efficient evaluation frameworks, on which metrics? What if several routes are good? 
8. Tracability: how to track large multi agent systems, each can have many turns, calling many tools? Very differents parameters? How to represent such large trees of turns for a human reviewer?
---
I also like open questions: 
---
1. I tried sementic RAG but even if it's the "standard" in the inductry I'm not 100% sure of that: it is "slow" as a embeddings model should run (complexity vs speed), then query a vector database (fast but often costly on the long run) + the vector DB are often architectured for very narrow cases and quering them for a bit different cases can retrieve a lot of false positive
2. navigate complex relational data challenges doesn't need to be related to my PhD. Actually I think most of the data are stored a. In relational DB b. In nosql DB containing JSON blobs. In the best of world we should use Graph DB (like Neo4J) to retrieve the most valuable data quicky and efficiently. But shifting to this approach is still a challenge IMO :)
3. LLMs are not a silver bullet: depending on the task, a fine-tuned Small Language Model (SLM) or
traditional deep learning model can often be more efficient for speed and accuracy. 
---
4. The why me? (What can I bring to your company): 
- I'm a kind person (well I try :pie:), Warm & Professional, open-minded, curious and I like to explore many fields: Emergent Systems, Computer Science, Physics, Sport, Music and learn new things
- I'm a Pragmatic Architect/Engineer
- I'm Scale-Ready: I've proved my experience in orchestrating large services, in production environments.
- I'm Battle-Hardened: I like to addresses security, reliability, and observability head-on.
- I've worked in different environments: Large worldwild company with large R&D: (Lectra, CDiscount), Medium company(Cybertek, Nexeya)  startups: (Mindflow, Foxstream), Research environments (Lectra, LaBRI), Consultancy (SOFTEAM, Freelancing). In differents fields: Industrial (Lectra, Nexeya), e-commerce (Cdiscount, Cybertek), security and defence (Nexeya), automation (Mindflow, Cybertek)

----

🕵️‍♂️ PhD in Graph DL | Senior ML Engineer | Agentic Systems & Cloud Engineering
🎳 Who I am (or: Why I gave up on Bowling)
I am officially a terrible bowling player. After realizing that gravity and pins weren't my friends, I decided to focus on a game I could actually master: Complex Agentic Systems.

I’m a Senior Data Scientist specializing in the architecture of autonomous agents. With a PhD in Graph Deep Learning, I thrive at the intersection of academic research and pragmatic production engineering. My career is built on delivering AI products that don't just work in a notebook, but scale in production.

🎯 What I’m Searching For
I’m looking for my next challenge in a large company or scale-up with a deep-rooted tech and data culture.

The Role: Senior ML Engineer / Agentic Systems Lead.
The Focus: I’d love to refocus on ML Training & Fine-tuning while continuing to lead Agentic strategy.
The Setup: Preferably Remote or in the Bordeaux area (French contract).
The Vibe: Nice people, open-minded culture, and a salary that reflects the senior market reality for a PhD/ML specialist.

🧠 My "Dream Job" in the field of Agentic Systems
LLMs are powerful, but they are not a silver bullet. I want to build reliable, secure, and observable agentic orchestration platforms that solve the industry's still-open challenges:

Security by Design: Addressing prompt-jacking and MCP server data breaches head-on. "Human-in-the-loop" is a vital start, but I want to build more robust, automated guardrails to ensure safe execution.
The Architecture of Complexity: Abstracting Model Providers for the long term. LangChain/LangGraph are great tools, but they don't fit every stack. I am interested in tackling the messy reality of parallel tool calling, JSON enforcement, and model drift in production.
Observability & Traceability: Multi-agent systems are only as good as their logs. My goal is to implement on-premise observability frameworks (like Langfuse) to represent complex "logic trees" in ways that humans can actually review, audit, and improve.
Data Sovereignty & The EU Edge: I'd like to focus on the integration of local models and managing the performance trade-offs inherent in sovereign model deployments.
Specialized Models: I believe that depending on the task, a fine-tuned Small Language Model (SLM) or a traditional deep learning model is often more efficient for speed and accuracy than a generalized LLM.
If you are concerned with these issues and want to tackle them head-on, let’s try to do something together! :)
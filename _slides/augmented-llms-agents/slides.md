---
theme: "@ktym4a/slidev-theme-ktym4a"
themeConfig:
  # baseColor Options: rosewater (default), flamingo, pink, mauve, red, maroon, peach, yellow, green, teal, sky, sapphire, blue, lavender
  baseColor: 'mauve'
  colorPattern: 'rotation'
title: 🤖 Building Agentic Systems
titleTemplate: '%s'
info: |
  ## Building Agentic Systems
  From LLMs to Autonomous Agents
author: Corentin Lallier
drawings:
  persist: false
transition: slide-left
mdc: true
comark: true
routerMode: hash
favicon: /blog/assets/img/favicon.png
addons:
  - ../_slidev_addons/components
hideInToc: true
keywords:
  - autonomous agents
  - LLM planning
  - ReAct loop
  - tool calling
  - memory architectures
  - multi-agent systems
---

<global-bottom />

# 🤖 Building Agentic Systems
From LLMs to Autonomous Agents

Corentin Lallier

---
layout: center
hideInToc: true
---
# Table of Content

<Toc maxDepth="1"/>

---
layout: section
---

# 🦜 + 🛠️ Augmented LLMs

---
layout: default
---

## Connecting LLMs to external tools

<div v-click="1">

- **Computations**: Delegate math to :badge[calculators] / :badge[interpreters].
- **Fresh Information**: Query :badge[Google] / :badge[Wikipedia] to resolve the "offline model" bottleneck.
- **Latency**: Retrieve :badge[pre-computed] data instead of generating it.

</div>

::Card{title="Tools can be anything" color="important" v-click="2" class="mt-8"}

- Calculators, code sandboxes, headless web browsers, vector search engines (RAG), CLIs, databases, REST APIs, MCP clients, other LLMs, or even other agents.
- **Once executed**: Tool results are injected into the context.

::

---
layout: two-cols-header
---

# 🧠 Wait, what exactly is an agent? 

::right::

<v-clicks depth="2">

An autonomous system driven by a core LLM combined with key components:

- **LLM**: The brain (reasoning, decision-making).
- **Planning**: Breaking down large tasks, reflecting on steps.
- **Memory**: Retaining historical data and contextual history.
- **Tools**: Performing actions on the environment.

</v-clicks>

::left::

<img src="./public/lilian_weng_agents.png" class="w-full rounded shadow-md" />


---
layout: section
---

# 🤖 Agentic systems: Planning

---
layout: default
---

## ReAct (Reason & Act) Yao et al. (2022)

<AgentReact class="h-full max-h-60 w-full" />

<ul>

<li v-click="1"> <b>Thought</b>: The LLM reasons about the current state. </li>
<li v-click="2"> <b>Action</b>: The LLM decides to call a specific tool with arguments. </li>
<li v-click="4"> <b>Observation</b>: The tool's execution output is fed back. </li>
<li v-click="5"> <b>Loop</b> until resolved - Turns (user-agent interactions) vs. Iterations (agent internal cycles)</li>
<li v-click="6"> <b>Drawbacks</b>: Plan optimization depends solely on the LLM's raw reasoning capacity. </li>

</ul>



---
layout: two-cols-header
---

## Advanced Planning & Reflection

::left::

<img src="./public/XoT.svg" class="w-full h-full max-h-85" />

::Card{title="Token costs! Computation time!" color="warning" v-click="4"}
::

::right::

Beyond linear loops, we can build structured thinking:

<v-clicks>

- **Chain of Thought (CoT)**: Step-by-step breakdown.
- **Tree of Thoughts (ToT) & Graph of Thoughts (GoT)**: Explore multiple reasoning branches, backtracking when a branch fails.

</v-clicks>

<v-clicks>

- **Self-Reflection (Self-Correction)**:
  - An evaluator agent critiques the actor's output.
  - The agent learns from trial-and-error by storing past mistakes in memory.

</v-clicks>

---
layout: section
---

# 🤖 Agentic systems: Memory

---
layout: default
---

## External Memory

LLMs are :badge[stateless]{color="important"}. To retain the history of past conversations or document context, we need external memory.

<MemoryDiagram class="h-full max-h-80 w-full" />


---
layout: default
---

## Memory Types

<v-clicks>

**Short-Term Memory**:
- An in-context buffer within the LLM prompt.
- :badge[Truncated] or :badge[summarized] via window buffers to respect context limits.


**Long-Term Memory**:
- External databases storing historical interactions or large documents.
- Retrieved semantically via :badge[Vector Store] embedding queries.
- Can also store :badge[Skills] to use specific tools. 

</v-clicks>


---
layout: section
---

# 🤖 Agentic systems: Tools

---
layout: default
---

## First attempts: specific fine-tuned models

For an agent to execute an action, it must output structured data (typically JSON) representing a function call.

**How models learned to generate tool usage**:
- **Toolformer** (Schick et al.): Pre-trained with special API tokens (e.g., `[Calculator(3+5) -> 8]`).
- **Gorilla** (Patil et al.): Specialized fine-tuning to select and call API endpoints from thousands of options.
- **JSON Mode** (simpler): Restricts LLM output to match a strict JSON schema.


---
layout: default
---

## Tools & Function Calling

<ToolcallsDiagram class="h-full max-h-100 w-full" />


---
layout: section
---

# 🦜🔗 LangChain and abstractions

---
layout: default
---

## Orchestration

<img src="./public/model_io-1f23a36233d7731e93576d6885da2750.jpg" class="w-full max-h-75 rounded shadow-md" />


- **Model I/O**: Prompts, Chat models, and Output parsers.
- **Retrieval**: Document loaders, Text splitters, Embeddings, Vector stores.
- **Chains / Agents**: Building deterministic pipelines (Chains) or dynamic decision loops (Agents).


---
layout: default
---

## Retrieval Strategies

<img src="./public/data_connection-c42d68c3d092b85f50d08d4cc171fc25.jpg" class="w-full max-h-65 rounded shadow-md" />

Connecting documents to the LLM requires advanced retrieval techniques:

- **Contextual Compression**: Filtering irrelevant sentences to fit the context.
- **Ensemble Retriever**: Combining keyword search (BM25) with vector search (Hybrid Search).
- **Parent Document Retriever**: Storing small chunks for search but returning the larger parent context.

---
layout: section
---

# 🛠 Beyond: Multi-Agent Systems

---
layout: two-cols-header
---

## Multi-Agent Systems

::left::

Complex goals require dividing tasks among specialized sub-agents:

- **Function calling**: An agent can call another agent as a tool.
- **Role-playing**: Assigning distinct system prompts (e.g., "You are a Product Manager").
- **SOPs (Standard Operating Procedures)**: Structuring agent interactions (e.g., PM drafts specs -> Engineer writes code -> QA runs tests).
- **Frameworks**: MetaGPT, AutoGen, etc.

::right::

<img src="./public/meta_gpt.png" class="w-full h-full max-h-85 rounded shadow-md" />

---
layout: default
---

# 🚀 Thanks!


1. **Define a strict loop**: Limit maximum iterations (e.g., max 5 loops) to prevent :badge[infinite loops] and :badge[API billing] surprises.
2. **Isolate environments**: Run code interpreters and command line tools in secure, :badge[sandboxed environments].
3. **Structured outputs**: Enforce function calling schemas using tools like :badge[Pydantic].
4. **Launch, observe, improve**: :badge[LLMOps / LLM Engineering / Monitoring]. Log intermediate steps, analyze why agent planning failed, track costs and prompts. Example: [Langfuse](https://langfuse.com/)

<div class="text-center mt-8">
<a href="/blog/presentations/">Back to Presentations</a>
</div>
---
theme: "@ktym4a/slidev-theme-ktym4a"
themeConfig:
  # baseColor Options: rosewater (default), flamingo, pink, mauve, red, maroon, peach, yellow, green, teal, sky, sapphire, blue, lavender
  baseColor: "lavender"
  colorPattern: "rotation"
title: Ranking Metrics
titleTemplate: "%s"
info: |
  ## 🥇 Ranking Metrics
  An introduction to ranking for information retrieval systems.
author: Corentin Lallier
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
comark: true
routerMode: hash
favicon: /blog/assets/img/favicon.png
addons:
  - ../_slidev_addons/components
keywords:
  - RAG
  - advanced retrieval
  - hybrid search
  - Ranking metrics
hideInToc: true
---

<global-bottom />

# 🥇🥈🥉 Ranking Metrics
Evaluating quality of modern information retrieval systems (and RAGs)

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

# The Ranking Challenge

---
layout: two-cols
---

::left::

## POV: You work at 🪕ify

<div class="mt-10" v-click="1">

- You just finished work on your company's :badge[<carbon-magnify />Retrieval System] (e.g., a RAG, or just tuned the search engine's :badge[parameters]) ...

</div>

<div class="mt-10" v-click="2">

- **Question**: How do you :badge[know] if it's good / better than the previous one? Or even if the open-source benchmark you used works for :badge[your] specific case?

</div>


::right::

<div v-click="3">

Example query: `"focus lofi beats"`

</div>

::Card{title="Previous Playlists Recommendation" color="note" icon="i-carbon-cafe" v-click="3"}
1. 🎸 **Death Metal** (Not Relevant)
2. 🐸 **Lofi Study Beats** (Highly Relevant)
3. ☕ **Chill Lofi Focus** (Highly Relevant)

<div v-click="5">

* **Pro**: High overall concentration of relevant items.
* **Con**: Terrible first impression.

</div>

::

::Card{title="New Playlists Recommendation" color="success" icon="i-carbon-campsite" v-click="4"}
1. 🎧 **Lo-fi for focus** (Highly Relevant)
2. 🎷 **Jazz cafe** (Slightly Relevant)
3. 🎸 **Death Metal** (Not Relevant)

<div v-click="6">

* **Pro**: The very first item is perfect. Great if the user just clicks the first thing.
* **Con**: Relevancy degrades extremely fast.

</div>

::

---

## You'll need to evaluate the two ranking algorithms

::Card{title="How do you compare results of each ranking model?" color="warning" icon="i-carbon-research-matrix" v-click="1" class="mt-20"}

- Need for a set of :badge[queries] for each cases. E.g: search by Genre (🎷,🎹,🎸,📯), Band (👨‍🎤,🌶️,📻🤯), Album (🌈⃤), Song (👁️🐯, 🛣️🔥) or Similarity (🦝)
- For each query, a :badge[ground truth] (the expected "best result"):
  - *Which is sometimes partial,*
  - *inexistant,*
  - *or not well defined ("I think item A should be over B").*
- And :badge[metrics] to compare them 

::

---
layout: two-cols-header
---

## Why is Evaluating Search & Ranking Hard?

::left::

::Card{title="Multidimensional Comparisons" color="important" v-click="1" class="mt-20"}
* **Multiple Ways to Evaluate** the content of two lists:
  * Do we care most about the **first relevant result**?
  * Do we care about the **entire sorted order**?
  * Do we care about **quality** (avoiding "noise" or false positives) vs. **completeness** (avoiding missing values)?
::

::right::

::Card{title="Metrics usage" color="warning" v-click="2" class="mt-20"}
* **Conflicting Trade-offs**: Optimizing for one aspect (e.g., getting the top item perfect) often sacrifices other metrics (e.g., overall quality).
* **Pros & Cons**: Each metric targets a specific aspect of the user experience.
::


---

## Why is Evaluation Hard? A word about the Ground Truth

Ground Truth is dynamic & subjective

::Card{title="Temporal Drift & Feedback Loops" color="warning" v-click="1" class="mt-10"}
* **No Perfect Ground Truth**: User expectations are subjective. Different users seeking the same query might expect different result sequences.
* **Temporal Drift**: Relevant documents can evolve over time, according to documents being added/removed/updated.
* **Dynamic Ground Truth**: For queries like *"elections"* or *"market news"*, relevance can changes hourly.
* **Evaluation**: Expectation lists **can** be updated continuously using **search log clicks** and user signals as proxy labels.
::

<div v-click="2" class="mt-10" >

- Let's assume you've made the hard work with **product people**, **expert of the domain**, and collected **user signals**. Now you have some :badge[query / ground truth] couples ...
- Let's have a look to the available metrics!

</div>


---
layout: section
---

# Ranking metrics: MRR, NDCG, MAP, F1 Score, Size Accuracy, ...


---
layout: section
---

## Mean Reciprocal Rank (MRR)

---
layout: two-cols-header
class: text-sm
---

::left::
**MRR: Mean Reciprocal Rank**: Focus on First Relevant Result

::Card{title="MRR" color="important"}
* **First Relevant Item**: MRR only cares about where the *first* relevant result appears.
* **Reciprocal Rank (RR)**: For a single query:
  $$\text{RR} = \frac{1}{\text{rank of first relevant item}}$$
* **Mean Reciprocal Rank (MRR)**: Average RR over a set of queries $Q$:
  $$\text{MRR} = \frac{1}{|Q|}\sum_{q=1}^{|Q|} \text{RR}_q$$
* **Ranges from 0 to 1**: Closer to 1 is better.
* **Heavy late penalty**: Finding the first relevant item at rank 10 yields an RR of only 0.1.
::

::right::
<MrrDiagram class="h-full w-full max-h-70" v-click="1"/>

<ul class="mt-2 tight-list" v-click="1">
  <li><b>Candidates</b>: Query <code>"item1"</code> retrieves different rankings.</li>
  <li v-click="1"><b>Case 1</b>: First relevant item is at rank 1. <span class="text-green font-bold">RR = 1.0</span></li>
  <li v-click="2"><b>Case 2</b>: First relevant item is at rank 2. <span class="text-peach font-bold">RR = 0.5</span></li>
  <li v-click="3"><b>Case 3</b>: No relevant items retrieved. <span class="text-red font-bold">RR = 0.0</span></li>
  <li v-click="4">Then compute average for all the queries</li>
</ul>


---
layout: two-cols-header
class: text-sm
---

## Evaluating worst cases: minRR

**Minimum Reciprocal Rank (minRR)**: Guarding the Tail

::left::
::Card{title="Example: Model A vs. Model B" color="warning" v-click="1"}

<v-clicks depth="1" at="+1">

* **Query Set**: 3 queries ($q_1, q_2, q_3$).
* **Model A** (High Avg, Silent Failure):
  * RRs: $[1.0, 1.0, 0.0]$
  * **Mean MRR = 0.67** | **minRR = 0.00** ✗
* **Model B** (Slightly Lower Avg, Consistent):
  * RRs: $[0.5, 0.5, 0.5]$
  * **Mean MRR = 0.50** | **minRR = 0.50** ✓
* **Decision**: Model B is often preferred in production to avoid completely failing on any customer query.

</v-clicks>
::

::right::

::Card{title="Why minRR?" color="important" icon="i-carbon-warning-alt" v-click="5"}

<v-clicks at="+1">

* **Average Blindspot**: Averages (MRR, MAP, NDCG) can hide complete failures on a subset of queries.
* **Formula**:
  $$\text{minRR} = \min_{q \in Q} (\text{RR}_q)$$
* **Worst-Case Guard**: Measures the absolute worst retrieval failure in your test set.
* **Goal**: Maximize `minRR` to guarantee a baseline quality of service for every user query.

</v-clicks>
::



---
layout: section
---

## Normalized Discounted Cumulative Gain (NDCG)

---
layout: two-cols-header
class: text-sm
---

::left::

**NDCG**: Graded Relevance with **Logarithmic Discount**

::Card{title="NDCG" color="important"}
* **Considers All Positions**: Unlike MRR, NDCG evaluates the quality of the entire list.
* **Graded Relevance**: Documents can have varying relevance levels (e.g. 0 to 3).
* **Discounted Cumulative Gain (DCG)**:
  $$\text{DCG}_p = \sum_{i=1}^p \frac{\text{rel}_i}{\log_2(i+1)}$$
* **Normalized (NDCG)**: Divides DCG by the Ideal DCG (IDCG - the best possible ranking order):
  $$\text{NDCG}_p = \frac{\text{DCG}_p}{\text{IDCG}_p}$$
* **Industry Gold Standard**: The default choice for web search engines (Google, Bing) and e-commerce platforms (Amazon).
::

::right::

<NdcgDiagram class="h-full w-full max-h-80" v-click="1"/>

<ul class="mt-2 tight-list" v-click="1">
  <li><b>Candidates</b>: Evaluated rankings are compared against the ideal relevance. Here <code>IDCG = 3/log2(2) + 2/log2(3) + 1/log2(4) = 4.76</code></li>
  <li><b>Case 1</b>: Perfect ordering matches ideal order. <span class="text-green font-bold">NDCG = 1.00</span></li>
  <li v-click="2"><b>Case 2</b>: High relevance item is delayed to rank 2. <span class="text-peach font-bold">NDCG = 0.92</span></li>
  <li v-click="3"><b>Case 3</b>: Top relevant item (rel=3) is completely missing. <span class="text-red font-bold">NDCG = 0.55</span></li>
</ul>


---
layout: section
---

## Mean Average Precision (MAP)

---
layout: two-cols-header
class: text-sm
---

::left::

**MAP: Mean Average Precision**: Order-Aware Binary Relevance

::Card{title="MAP" color="important"}
* **Binary Relevance**: Items are either relevant (1) or irrelevant (0).
* **Average Precision (AP)**: For a single query:
  $$\text{AP} = \frac{1}{\text{No. of relevant items}} \sum_{k=1}^n P(k) \times rel(k)$$
  Where $P(k)$ is Precision@$k$, and $rel(k)$ is 1 if document at rank $k$ is relevant, 0 otherwise.
* **Mean Average Precision (MAP)**: Average AP over a set of queries $Q$:
  $$\text{MAP} = \frac{1}{|Q|} \sum_{q=1}^{|Q|} \text{AP}_q$$
* **Best For**: Systems retrieving *multiple* binary-relevant items where ranking order of all items is critical.
::

::right::

<MapDiagram class="h-full w-full max-h-70" v-click="1"/>

<ul class="mt-2 tight-list" v-click="1">
  <li><b>Candidates</b>: Rankings are evaluated against binary relevance checklist.</li>
  <li><b>Case 1</b>: Perfect ranking yields maximum precision at all positions. <span class="text-green font-bold">AP = 1.00</span></li>
  <li v-click="2"><b>Case 2</b>: Irrelevant item at rank 2 penalizes precision of subsequent items. <span class="text-peach font-bold">AP = 0.84</span></li>
  <li v-click="3">Can be seen as an NDCG alternative with binary relevance.</li>
</ul>


---
layout: section
---

## F1 Score

---
layout: two-cols-header
class: text-sm
---

::left::

## F1 Score
Harmonic Mean of Precision and Recall

| Confusion matrix | In Results | Not in Results |
|:---|:---:|:---:|
| **Expected** | **TP** (True Positive)<br/>Correctly found | **FN** (False Negative)<br/>Missed |
| **Not Expected** | **FP** (False Positive)<br/>Incorrectly included | **TN** (True Negative)<br/>N/A in Search |

* **Precision P** = $\frac{\text{TP}}{\text{TP} + \text{FP}}$ (Quality of results)
* **Recall R** = $\frac{\text{TP}}{\text{TP} + \text{FN}}$ (Completeness of retrieval)
* **F1 Score** = $2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$

::right::
<F1Diagram class="h-full w-full max-h-80" v-click="1"/>

<ul class="mt-2 tight-list" v-click="1">
  <li><b>Candidates</b>: Retrieved sets are evaluated against the expected ground truth set.</li>
  <li><b>Case 1</b>: Perfect retrieval matches expected set exactly. <span class="text-green font-bold">F1 = 1.00</span></li>
  <li v-click="2"><b>Case 2</b>: One missed item and one extra wrong item penalize both precision and recall. <span class="text-peach font-bold">F1 = 0.67</span></li>
  <li v-click="3"><b>Case 3</b>: Missed item without any wrong/extra items penalizes recall but preserves perfect precision. <span class="text-yellow font-bold">F1 = 0.80</span></li>
</ul>

---
layout: section
---

## Size Accuracy

---
layout: two-cols-header
class: text-sm
---

::left::
**Size Accuracy**: Penalizing Mismatch in Result Counts

::Card{title="Size Accuracy" color="important"}
* **Goal**: Measures how closely the quantity of returned results matches expectations.
* **Normalized Difference**:
  $$\text{diff}_{\text{norm}} = \frac{|\text{expected} - \text{actual}|}{\max(\text{expected}, 1)}$$
* **Formula**:
  $$\text{Score} = \frac{1}{1 + \text{diff}_{\text{norm}}}$$
* **Special Rule**: If $\text{expected} > 0$ and $\text{actual} = 0$ (or vice versa), score is strictly **0.0**.
::

::right::

<SizeAccuracyDiagram class="h-full w-full max-h-70" v-click="1"/>

<ul class="mt-2 tight-list" v-click="1">
  <li><b>Candidates</b>: Returned candidate counts are compared to target expected count (5).</li>
  <li><b>Case 1</b>: Perfect match in count yields maximum accuracy. <span class="text-green font-bold">Score = 1.00</span></li>
  <li v-click="2"><b>Case 2</b>: Double the expected results degrades accuracy. <span class="text-peach font-bold">Score = 0.50</span></li>
  <li v-click="3"><b>Case 3</b>: Fewer than expected results degrades accuracy. <span class="text-yellow font-bold">Score = 0.63</span></li>
  <li v-click="4"><b>Case 4</b>: Complete failure (0 results) is heavily penalized. <span class="text-red font-bold">Score = 0.00</span></li>
</ul>

---
layout: section
---

## Bounding Metrics: Bounded @K

---
layout: two-cols-header
class: text-sm
---

::left::
**Evaluating with Bounded Cutoffs: Metric@K**

<BoundedKDiagram class="h-full w-full max-h-70"/>

<ul class="tight-list">
  <li><b>K = 3</b>: Evaluates only the top 3 retrieved candidate items.</li>
  <li><b>Score @ 3</b>: 2 out of 3 retrieved items are relevant. <span class="text-peach font-bold">P@3 = 67% / R@3 = 67%</span></li>
  <li v-click="2"><b>K = 5</b>: Expands the evaluation window to the top 5 candidates.</li>
  <li v-click="3"><b>Score @ 5</b>: Retrieves all 3 target items, achieving full recall. <span class="text-green font-bold">P@5 = 60% / R@5 = 100%</span></li>
</ul>

::right::


::Card{title="Why Bounding @K Matters" color="warning" v-click="4"}

<v-clicks at="+5">

* When the ground truth is large, it might be interesting to focus only on the **top K** elements.
* **Universal Application**: Bounded cutoffs apply to any ranking metric: precision, recall, ..., **MAP@K** and **NDCG@K** are standard industry practices.
* **Real-World Limits**: Users rarely scroll past the first 5 or 10 search results. Bounding evaluates what the user actually sees.
* **Recall@K Trade-off**: As $K$ increases, Recall increases (more chance to find relevant items), but Precision usually decreases (more irrelevant items are returned).
* **RAG Prompt Constraints**: Bounding at $K$ is vital for RAG since LLM context windows are limited and larger prompts increase cost and latency.
* **Compute & Latency Optimization**: Restricting evaluations to a smaller $K$ prevents downstream processing of unnecessary documents, saving context memory and compute.

</v-clicks>

::


---
layout: two-cols-header
---

## Matching Metrics to Use Cases

::left::

::Card{title="Case A: Navigational & Fact-Checking 🧐" color="success" class="mt-20" v-click="1"}
* **Goal**: Find *one specific* target document (e.g., *"reset password"* or *"support email"*).
* **Metric**: high **MRR** (Mean Reciprocal Rank) and low **Size**.
* **Why**: The user only needs the few top result. A correct item at rank 10 is almost useless (RR = 0.1).
::

::right::

::Card{title="Case B: Exploratory & Informational ℹ️" color="note" class="mt-20" v-click="2"}
* **Goal**: Get a comprehensive overview (e.g., *"machine learning frameworks"*).
* **Metric**: high **NDCG, MAP & F1** and high **Size**.
* **Why**: The user wants a diverse, high-quality set, and the ordering of multiple items matters.
::

---
layout: center
class: text-sm
---

## Which Metric Should You Use?

| Metric | Focus | Input Type | Best For |
| :--- | :--- | :---: | :--- |
| **MRR** | First relevant result position | Binary | Navigational search, Q&A |
| **NDCG** | Overall ranking quality, all positions | Graded | Search engines, e-commerce |
| **MAP** | Precision across multiple relevant items | Binary | Precision-critical retrieval |
| **F1 Score** | Balance of precision and recall | Binary (Set) | Recommendation, classification |
| **Size Accuracy** | Mismatch in total results count | Counts | Quantity-critical retrieval |
| **minRR** | Worst-case tail performance | Binary | Guarding against complete failures |
| **@K Bounded** | Real-world UI / context window limits | Any | RAG context chunking, mobile UI |




---
layout: section
---

## Combined Metric (Weighted Average)

---
layout: two-cols-header
class: text-xs
---

::left::

::Card{title="Weighted Combined Metric" color="important"}
* **Holistic Score**: Aggregates all aspects of ranking, recall, size, and worst-case performance into a single meaningful metric.
* **Formula**:
  $$\text{Score} = \frac{\sum_{i=1}^{n} w_i \cdot \text{metric}_i}{\sum_{i=1}^{n} w_i}$$
  * $w_i$ is the weight of each metric, $\text{metric}_i$ is the normalized score of each metric (between 0 and 1).
  * $\sum_{i=1}^{n} w_i$ is the sum of all weights (can be 1 or >1). The final score is the weighted average of all metrics.
* **Weight Distribution Example**:
  $$\text{Score} = \frac{0.3\text{NDCG} + 0.2\text{MRR} + 0.2\text{F1} + 0.2\text{minRR} + 0.1\text{Size}}{1.0}$$
::

::right::

<CombinedMetricDiagram class="h-full w-full max-h-70" />

<ul class="mt-1 tight-list" v-click="1">
  <li><b>MRR</b> <span class="text-peach font-bold">(20% weight)</span>: Captures importance of the top result.</li>
  <li v-click="2"><b>avgF1</b> <span class="text-peach font-bold">(20% weight)</span>: Balances quality and completeness.</li>
  <li v-click="3"><b>avgNDCG</b> <span class="text-green font-bold">(30% weight)</span>: Crucial ranking metric gets the highest allocation.</li>
  <li v-click="4"><b>avgSizeAccuracy</b> <span class="text-yellow font-bold">(10% weight)</span>: Checks count correctness.</li>
  <li v-click="5"><b>minRR</b> <span class="text-peach font-bold">(20% weight)</span>: Worst-case query check (guards against tail failures).</li>
  <li v-click="6"><b>Holistic Score</b>: Sum of all weighted products yields the single KPI. <span class="text-blue font-bold">Score = 0.785</span></li>
</ul>



---
layout: section
---

# Production Strategy: Retrieve & Rerank

---
layout: two-cols-header
class: text-xs
---

## Production RAG Pipelines: Retrieve & Rerank

::left::
<RerankPipelineDiagram class="h-full w-full max-h-80" />

<ul class="mt-2 tight-list">
  <li v-click="1"><b>Step 2 (Rerank)</b>: Slower, deep Cross-Encoder model scores the top candidates.</li>
  <li v-click="2"><b>Step 3 (Generation)</b>: LLM constructs the final response using only the top refined contexts.</li>
</ul>

::right::

::Card{title="Optimizing the Search Funnel" color="success"}
* **Step 1: Retrieval (Vector / Hybrid)**
  * **Goal**: High **Recall** (don't miss anything relevant).
  * **Scale**: Millions of docs $\to$ Top 50-100 candidates.
  * **Speed**: Extremely fast (milliseconds).
  * **SOTA Stack**: Bi-Encoder models (e.g., *Sentence-Transformers*, *Cohere v3 Embed*).
* **Step 2: Reranking (Cross-Encoder)**
  * **Goal**: High **NDCG / MRR** (push the most relevant documents to the top).
  * **Scale**: Top 100 candidates $\to$ Top 5-10.
  * **Speed**: Slower (deep transformer attention model checking all query-doc words simultaneously).
  * **SOTA Stack**: Cross-Encoder models (e.g., *BGE-Reranker*, *Cohere Rerank*).
::

---
layout: section
---

# Hands-on: Interactive Playlist Recommendation Playground


---

<InteractivePlayground class="max-w-[1000px] max-h-[800px]" />


---
layout: two-cols-header
---

# 💡 Key Takeaways

::left::

<div class="mt-10" v-click="1">

* **Select Metrics by Search Type**:
  * **Navigational**: Focus on **MRR** (first hit is everything).
  * **Exploratory**: Focus on **NDCG / MAP / F1** (whole-list relevance and completeness).
  * **System Fit**: Focus on **Size Accuracy** (matching length expectations).

</div>

::right::

<div class="mt-10" v-click="2">

* **Guard the Tail**: Do not rely strictly on averages. Use **minRR** to check for silent failures where queries return zero relevant results.
* **Funnel for Speed & Precision**: Build production pipelines as **Retrieve & Rerank** structures—retrieve cheaply for high recall, then rerank precisely for high NDCG.

</div>

---
layout: center
---

## 🚀 Thanks!

<a href="/blog/presentations/">Back to Presentations</a>

::right::

**Embeddings for Everything**

Lecture by **Dan Gillick** (Google)

::youtube{id="JGHVJXP9NHw"}
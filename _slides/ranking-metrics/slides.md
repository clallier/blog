---
theme: "@ktym4a/slidev-theme-ktym4a"
themeConfig:
    # baseColor Options: rosewater (default), flamingo, pink, mauve, red, maroon, peach, yellow, green, teal, sky, sapphire, blue, lavender
    baseColor: "teal"
    colorPattern: "rotation"
title: Ranking Metrics
titleTemplate: "%s"
info: |
    ## Ranking Metrics
    An introduction to ranking metrics.
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
Evaluating search quality in RAG (Retrieval Augmented Generation) or modern retrieval systems

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

# Introduction: The Ranking Challenge

---
layout: two-cols-header
---

## Why is Evaluating Search & Ranking Hard?

::left::

::Card{title="Multidimensional Comparisons" color="important"}
* **Multiple Ways to Evaluate**: Comparing two lists cannot be reduced to a single perspective:
  * Do we care most about the **first relevant result**?
  * Do we care about the **entire sorted order**?
  * Do we care about **precision vs. recall** of the retrieved set?
* **Pros & Cons**: Each metric targets a specific aspect of the user experience.
::

::right::

::Card{title="Dynamic & Subjective Ground Truth" color="warning"}
* **No Perfect Ground Truth**: User expectations are subjective. Different users seeking the same query might expect different result sequences.
* **Temporal Drift**: Relevant documents and user preferences evolve over time.
* **Conflicting Trade-offs**: Optimizing for one aspect (e.g., getting the top item perfect) often sacrifices other metrics (e.g., overall recall).
::

---
layout: two-cols-header
---

## Real-World Examples: Matching Metrics to Use Cases

::left::

::Card{title="Case A: Navigational & Fact-Checking" color="success"}
* **Goal**: Find *one specific* target document (e.g., *"reset password"* or *"support email"*).
* **Metric**: **MRR** (Mean Reciprocal Rank).
* **Why**: The user only needs the top result to be correct. A correct item at rank 10 is almost useless (RR = 0.1).
::

::Card{title="Case B: Exploratory & Informational" color="note"}
* **Goal**: Get a comprehensive overview (e.g., *"machine learning frameworks"*).
* **Metric**: **NDCG & F1**.
* **Why**: The user wants a diverse, high-quality set, and the ordering of multiple items matters.
::

::right::

::Card{title="Temporal Drift & Feedback Loops" color="warning"}
* **Dynamic Ground Truth**: For queries like *"elections"* or *"market news"*, relevance changes hourly.
* **Evaluation**: Expectation lists must be updated continuously using search log clicks and user signals as proxy labels.
::

---
layout: section
---

# Mean Reciprocal Rank (MRR)

---
layout: two-cols-header
---

## Mean Reciprocal Rank (MRR)

Focus on First Relevant Result

::left::

```mermaid
graph TD
    subgraph "Query: 'item1'"
        Q([Query: 'item1']) --> C1["1. item1 ✓<br/>2. item2<br/>3. item3"]
        Q --> C2["1. item2<br/>2. item1 ✓<br/>3. item3"]
        Q --> C3["1. item2<br/>2. item3<br/>3. item4 ✗"]

        C1 --> R1[Rank = 1<br/>RR = 1/1 = 1.0]
        C2 --> R2[Rank = 2<br/>RR = 1/2 = 0.5]
        C3 --> R3[Rank = N/A<br/>RR = 0]
    end

    style R1 fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style R2 fill:#ff9800,stroke:#f57c00,stroke-width:2px,color:#fff
    style R3 fill:#f44336,stroke:#d32f2f,stroke-width:2px,color:#fff
```

::right::

::Card{title="Key Concepts" color="important"}
* **First Relevant Item**: MRR only cares about where the *first* relevant result appears.
* **Reciprocal Rank (RR)**: For a single query:
  $$\text{RR} = \frac{1}{\text{rank of first relevant item}}$$
* **Mean Reciprocal Rank (MRR)**: Average RR over a set of queries $Q$:
  $$\text{MRR} = \frac{1}{|Q|}\sum_{q=1}^{|Q|} \text{RR}_q$$
* **Ranges from 0 to 1**: Closer to 1 is better.
* **Heavy late penalty**: Finding the first relevant item at rank 10 yields an RR of only 0.1.
::

---
layout: section
---

# Normalized Discounted Cumulative Gain (NDCG)

---
layout: two-cols-header
---

## NDCG: Graded Relevance with Logarithmic Discount

::left::

```mermaid
graph TD
    subgraph "Expected: [item1 (rel=3), item2 (rel=2), item3 (rel=1)]"
        Q([Query]) --> C1["Case 1: Perfect Order<br/>1. item1 (3)<br/>2. item2 (2)<br/>3. item3 (1)"]
        Q --> C2["Case 2: Permuted Order<br/>1. item2 (2)<br/>2. item1 (3)<br/>3. item3 (1)"]
        Q --> C3["Case 3: Missing item1<br/>1. item2 (2)<br/>2. item3 (1)<br/>3. item4 (0)"]

        C1 --> D1["DCG = 3/1 + 2/1.58 + 1/2 = 4.76<br/>NDCG = 4.76/4.76 = 1.00"]
        C2 --> D2["DCG = 2/1 + 3/1.58 + 1/2 = 4.39<br/>NDCG = 4.39/4.76 = 0.92"]
        C3 --> D3["DCG = 2/1 + 1/1.58 + 0/2 = 2.63<br/>NDCG = 2.63/4.76 = 0.55"]
    end

    style D1 fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style D2 fill:#ff9800,stroke:#f57c00,stroke-width:2px,color:#fff
    style D3 fill:#f44336,stroke:#d32f2f,stroke-width:2px,color:#fff
```

::right::

::Card{title="Key Concepts" color="important"}
* **Considers All Positions**: Unlike MRR, NDCG evaluates the quality of the entire list.
* **Graded Relevance**: Documents can have varying relevance levels (e.g. 0 to 3).
* **Discounted Cumulative Gain (DCG)**:
  $$\text{DCG}_p = \sum_{i=1}^p \frac{\text{rel}_i}{\log_2(i+1)}$$
* **Normalized (NDCG)**: Divides DCG by the Ideal DCG (IDCG - the best possible ranking order):
  $$\text{NDCG}_p = \frac{\text{DCG}_p}{\text{IDCG}_p}$$
::

---
layout: section
---

# Mean Average Precision (MAP)

---
layout: two-cols-header
---

## Mean Average Precision (MAP): Order-Aware Binary Relevance

::left::

```mermaid
graph TD
    subgraph "Query Expected: [item1 ✓, item2 ✓, item3 ✓]"
        Q([Query]) --> C1["Case 1: Perfect Rank<br/>1. item1 ✓ (P@1 = 1/1 = 1.00)<br/>2. item2 ✓ (P@2 = 2/2 = 1.00)<br/>3. item3 ✓ (P@3 = 3/3 = 1.00)"]
        Q --> C2["Case 2: Late Relevant Items<br/>1. item1 ✓ (P@1 = 1/1 = 1.00)<br/>2. item4 ✗ (P@2 = 1/2 = 0.50)<br/>3. item2 ✓ (P@3 = 2/3 = 0.67)"]

        C1 --> A1["AP = (1.0 + 1.0 + 1.0)/3 = 1.00"]
        C2 --> A2["AP = (1.0 + 0.67)/2 = 0.84"]
    end

    style A1 fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style A2 fill:#ff9800,stroke:#f57c00,stroke-width:2px,color:#fff
```

::right::

::Card{title="Key Concepts" color="important"}
* **Binary Relevance**: Items are either relevant (1) or irrelevant (0).
* **Average Precision (AP)**: For a single query:
  $$\text{AP} = \frac{1}{\text{No. of relevant items}} \sum_{k=1}^n P(k) \times rel(k)$$
  Where $P(k)$ is Precision@$k$, and $rel(k)$ is 1 if document at rank $k$ is relevant, 0 otherwise.
* **Mean Average Precision (MAP)**: Average AP over a set of queries $Q$:
  $$\text{MAP} = \frac{1}{|Q|} \sum_{q=1}^{|Q|} \text{AP}_q$$
* **Best For**: Systems retrieving *multiple* binary-relevant items where ranking order of all items is critical.
::

---
layout: section
---

# F1 Score

---
layout: two-cols-header
---

## F1 Score: Harmonic Mean of Precision and Recall

::left::

| Expected / Predicted | In Results | Not in Results |
|:---|:---:|:---:|
| **Expected** | **TP** (True Positive)<br/>Correctly found | **FN** (False Negative)<br/>Missed |
| **Not Expected** | **FP** (False Positive)<br/>Incorrectly included | **TN** (True Negative)<br/>N/A in Search |

* **Precision** = $\frac{\text{TP}}{\text{TP} + \text{FP}}$ (Quality of results)
* **Recall** = $\frac{\text{TP}}{\text{TP} + \text{FN}}$ (Completeness of retrieval)
* **F1 Score** = $2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$

::right::

```mermaid
graph TD
    subgraph "Expected: [item1, item2, item3]"
        Q([Query]) --> C1["Case 1: All Correct<br/>[item1, item2, item3]"]
        Q --> C2["Case 2: Extra / Wrong Item<br/>[item1, item2, item4]"]
        Q --> C3["Case 3: Missing Item<br/>[item1, item2]"]

        C1 --> E1["TP=3, FP=0, FN=0<br/>P=1.00, R=1.00<br/>F1 = 1.00"]
        C2 --> E2["TP=2, FP=1, FN=1<br/>P=0.67, R=0.67<br/>F1 = 0.67"]
        C3 --> E3["TP=2, FP=0, FN=1<br/>P=1.00, R=0.67<br/>F1 = 0.80"]
    end

    style E1 fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style E2 fill:#ff9800,stroke:#f57c00,stroke-width:2px,color:#fff
    style E3 fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#000
```

---
layout: section
---

# Size Accuracy

---
layout: two-cols-header
---

## Size Accuracy: Penalizing Mismatch in Result Counts

::left::

```mermaid
graph TD
    subgraph "Expected Count = 5"
        Q([Query]) --> C1["Case 1: Actual = 5<br/>Diff = 0<br/>Score = 1.00"]
        Q --> C2["Case 2: Actual = 10<br/>Diff = 5<br/>Score = 0.50"]
        Q --> C3["Case 3: Actual = 2<br/>Diff = 3<br/>Score = 0.63"]
        Q --> C4["Case 4: Actual = 0<br/>Diff = 5<br/>Score = 0.00"]
    end

    style C1 fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style C2 fill:#ff9800,stroke:#f57c00,stroke-width:2px,color:#fff
    style C3 fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#000
    style C4 fill:#f44336,stroke:#d32f2f,stroke-width:2px,color:#fff
```

::right::

::Card{title="Key Concepts" color="important"}
* **Goal**: Measures how closely the quantity of returned results matches expectations.
* **Normalized Difference**:
  $$\text{diff}_{\text{norm}} = \frac{|\text{expected} - \text{actual}|}{\max(\text{expected}, 1)}$$
* **Formula**:
  $$\text{Score} = \frac{1}{1 + \text{diff}_{\text{norm}}}$$
* **Special Rule**: If $\text{expected} > 0$ and $\text{actual} = 0$ (or vice versa), score is strictly **0.0**.
::

---
layout: section
---

# Bounding Metrics: Bounded @K

---
layout: two-cols-header
---

## Evaluating with Bounded Cutoffs: Precision@K & Recall@K

::left::

```mermaid
graph TD
    subgraph "Query: Expected [item1, item2, item3] (3 items)"
        Q([Query]) --> R["Retrieved: [item1 ✓, item4 ✗, item2 ✓, item5 ✗, item3 ✓, item6 ✗]"]
        R --> K3["Cutoff @ K=3<br/>Retrieved: [item1 ✓, item4 ✗, item2 ✓]"]
        R --> K5["Cutoff @ K=5<br/>Retrieved: [item1 ✓, item4 ✗, item2 ✓, item5 ✗, item3 ✓]"]

        K3 --> C3["Precision@3 = 2/3 = 67%<br/>Recall@3 = 2/3 = 67%"]
        K5 --> C5["Precision@5 = 3/5 = 60%<br/>Recall@5 = 3/3 = 100%"]
    end

    style C3 fill:#ff9800,stroke:#f57c00,stroke-width:2px,color:#fff
    style C5 fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
```

::right::

::Card{title="Why Bounding @K Matters" color="warning"}
* **Real-World Limits**: Users rarely scroll past the first 5 or 10 search results. Bounding evaluates what the user actually sees.
* **Recall@K Trade-off**: As $K$ increases, Recall increases (more chance to find relevant items), but Precision usually decreases (more irrelevant items are returned).
* **RAG Prompt Constraints**: Bounding at $K$ is vital for RAG since LLM context windows are limited and larger prompts increase cost and latency.
::

---
layout: section
---

# Combined Metric (Weighted Average)

---
layout: two-cols-header
---

## Combined Metric: Holistic Evaluation

::left::

```mermaid
graph TD
    subgraph "Weighted Score Aggregation"
        M[Individual Metrics] --> MRR[MRR = 0.85]
        M --> F1[avgF1 = 0.80]
        M --> NDCG[avgNDCG = 0.75]
        M --> Size[avgSizeAccuracy = 0.90]
        M --> MinRR[minRR = 0.70]

        MRR --> W1[x 20% = 0.17]
        F1 --> W2[x 20% = 0.16]
        NDCG --> W3[x 30% = 0.225]
        Size --> W4[x 10% = 0.09]
        MinRR --> W5[x 20% = 0.14]

        W1 --> Sum[Weighted Average: 0.785]
        W2 --> Sum
        W3 --> Sum
        W4 --> Sum
        W5 --> Sum
    end

    style W3 fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style Sum fill:#2196f3,stroke:#1976d2,stroke-width:2px,color:#fff
```

::right::

::Card{title="Key Concepts" color="important"}
* **Holistic Score**: Aggregates all aspects of ranking, recall, size, and worst-case performance into a single number.
* **Weight Distribution**:
  * **avgNDCG** (30%): Most important (ranking order).
  * **MRR** (20%): Importance of top result.
  * **avgF1** (20%): Precision & recall.
  * **minRR** (20%): Worst-case query check (guards against tail failures).
  * **avgSizeAccuracy** (10%): Size correctness.
* **Formula**:
  $$\text{Score} = 0.3\text{NDCG} + 0.2\text{MRR} + 0.2\text{F1} + 0.2\text{minRR} + 0.1\text{Size}$$
::

---
layout: section
---

# Production Strategy: Retrieve & Rerank

---
layout: two-cols-header
---

## Production RAG Pipelines: Retrieve & Rerank

::left::

```mermaid
graph TD
    User([User Query]) --> Retrieve[Step 1: Retrieve<br/>Bi-Encoder / Vector Search]
    Retrieve --> TopK["Broad Top-100 Results<br/>(Optimizing Recall@100)"]
    TopK --> Rerank[Step 2: Rerank<br/>Cross-Encoder Model]
    Rerank --> TopTen["Refined Top-5 Results<br/>(Optimizing NDCG@5 / MRR)"]
    TopTen --> LLM([Step 3: LLM Context])

    style Retrieve fill:#2196f3,stroke:#1976d2,color:#fff
    style Rerank fill:#9c27b0,stroke:#7b1fa2,color:#fff
    style LLM fill:#4caf50,stroke:#388e3c,color:#fff
```

::right::

::Card{title="Optimizing the Search Funnel" color="success"}
* **Step 1: Retrieval (Vector / Hybrid)**
  * **Goal**: High **Recall** (don't miss anything relevant).
  * **Scale**: Millions of docs $\to$ Top 50-100 candidates.
  * **Speed**: Extremely fast (milliseconds).
* **Step 2: Reranking (Cross-Encoder)**
  * **Goal**: High **NDCG / MRR** (push the most relevant documents to the top).
  * **Scale**: Top 100 candidates $\to$ Top 5-10.
  * **Speed**: Slower (deep transformer attention model checking all query-doc words simultaneously).
::

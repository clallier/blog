---
theme: "@ktym4a/slidev-theme-ktym4a"
themeConfig:
  # baseColor Options: rosewater (default), flamingo, pink, mauve, red, maroon, peach, yellow, green, teal, sky, sapphire, blue, lavender
  baseColor: 'peach'
  colorPattern: 'rotation'
title: 📙 RAG & Advanced Retrieval Techniques
titleTemplate: '%s'
info: |
  ## RAG & Advanced Retrieval Techniques
  An introduction to advanced RAG concepts, chunking, and rerankers.
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
  - RRF
  - cross-encoders
  - chunking strategies
---

<global-bottom />

# 📙 RAG & Advanced Retrieval Techniques
From simple pipelines to high-precision architectures

Corentin Lallier

---
layout: center
---

# Table of content

<div class="slidev-toc">

1. **What is RAG?** (Retrieval-Augmented Generation)
2. **Retrieval recap** (Dense Vector representation)
3. **Advanced Retrieval Techniques** (Hybrid, Reranker, Chunking)

</div>

---
layout: section
---

# 1. What is RAG?

---
layout: two-cols-header
---

## Retrieval-Augmented Generation (RAG)

::left::

<div v-click="1">

- **LLM Limitations:** LLMs lack private, real-time, or domain-specific context. They hallucinate when they don't know the answer.

</div>

<div v-click="2">

- **The RAG Solution:**
  1. **Retrieve:** Find relevant context in an external database.
  2. **Augment:** Paste that context into the LLM prompt.
  3. **Generate:** Ask the LLM to answer using only the provided context.

</div>

::right::

<div v-click="3">

**Concept Prompt:**

```yaml
Answer based ONLY on the context below:
------
Context:
- MS Teams API Endpoint: 'create_messages_in_a_channel'
- Slack API Endpoint: 'send_message'
------
Question: How to write on Teams?
```

</div>

---
layout: section
---

# 2. Retrieval Recap

---
layout: two-cols-header
---

## 2.1 Quick Recap: Semantic Vector Search

::left::

<QKVSemanticSearch class="h-full max-h-80 w-full" />

::right::

- Document strings are converted into high-dimensional vectors (**embeddings**) at index-time and stored in a **Vector DB**.
- The user query is embedded into the same vector space at runtime.
- Documents are ranked using **Cosine Similarity**:

$$ \text{similarity} = \cos(\theta) = \frac{\vec{A} \cdot \vec{B}}{\|\vec{A}\| \|\vec{B}\|} $$

---
layout: section
---

# 3. Why RAG can fail? Beyond simple Vector Search

---
layout: two-cols-header
---

## 3.1 Dense vs. Sparse representations

::left::

<div v-click="1">

- **Dense Vector Search:**
  - Represents concepts & synonyms (e.g. "how to write" $\rightarrow$ `create message`).
  - *Failure case:* Exact words, serial numbers, SKU IDs, or function names (e.g. `OPER-93a0`).

</div>

<div v-click="2">

- **Sparse Lexical Search (BM25):**
  - Matches exact character sequences (TF-IDF based).
  - *Failure case:* Conceptual variations and synonyms.

</div>

::right::

::Card{title="Hybrid Search using Reciprocal Rank Fusion (RRF)" color="success" v-click="3"}

$$ \text{Score}(d) = \sum_{m \in M} \frac{1}{k + r_m(d)} $$

For combining Lexical and Vector search:
$$ \text{Score}(d) = \frac{1}{60 + r_{\text{lexical}}(d)} + \frac{1}{60 + r_{\text{vector}}(d)} $$

Where:
- $M$: The set of search systems (here, Lexical and Vector).
- $r_m(d)$: The **rank** of document $d$ in system $m$ (1st, 2nd, etc.).
- $k = 60$: `Smoothing parameter`, a constant that prevents high ranks from dominating the score.

::

---
layout: two-cols-header
class: text-sm
---

## 3.2 Bi-Encoder vs. Cross-Encoder

::left::

<div v-click="1">

- **Bi-Encoder (Vector DB style):**
  - Computes query & document embeddings *independently*.
  - *Pros:* Fast and scalable - $O(1)$ query time using index search.
  - *Cons:* Lacks token-to-token attention.

</div>
  
<div v-click="2">

- **Cross-Encoder (Reranker style):**
  - Processes query & document *together*.
  - *Pros:* Highly accurate - full self-attention across query & doc.
  - *Cons:* Extremely slow for database scale - $O(N)$.

</div>

::right::

::Card{title="Reranker Concept" color="success" v-click="3"}

`[Query + Doc]` $\rightarrow$ `[Transformer]` $\rightarrow$ `[Score]`

```python
from sentence_transformers import CrossEncoder

model = CrossEncoder("BAAI/bge-reranker-v2-m3")

query = "What is the capital of China?"
documents = [
    "The capital of China is Beijing.",
    "Gravity is a force that attracts two bodies...",
]

pairs = [(query, doc) for doc in documents]
scores = model.predict(pairs)
print(scores)  # [ 7.625 -11.375]

rankings = model.rank(query, documents)
```
::

---
layout: two-cols-header
class: text-sm
---

## 3.3 The Chunking Challenge

::left::

<div v-click="1">

- **Why do we chunk:**
  - LLMs have token limits (typically 4k - 128k tokens).
  - Embedding models too have token limits (typically 512 - 8192 tokens).
  - Long text dilutes the semantic focus of embeddings.

</div>

<div v-click="2">

- **Chunking parameters:**
  - **Chunk Size:** Small chunks (precise but lose context) vs. Large chunks (rich context but diluted representation).
  - **Overlap:** Repeating tokens between consecutive chunks to avoid cutting off key sentences.

</div>

::right::

::Card{title="Strategies" color="info" v-click="3"}

- **Metadata-based:** Prepending metadata to chunks for better context.
- **Hierarchical chunking:** Keep "parent-chain" context from higher-level sections (titles, sub-titles, current section summary, etc. for each paragraph).
- **Semantic Chunking:** Detecting shifts in semantic similarity to split paragraphs dynamically.

::

---
layout: default
---

## Conclusion: The Production RAG Pipeline

1. **Preparation (Smart Chunking):** Split source text into chunks (Overlapping / Hierarchical / Semantic) to preserve context.
2. **Retrieval (Sparse + Dense Hybrid):** Combine **Vector Search** (conceptual intent) + **BM25** (exact matches) and merge with **RRF**.
3. **Reranking (Precision Filtering):** Pass top candidates through a **Cross-Encoder Reranker** to isolate the top-5 absolute best contexts.
4. **Generation (Context Augmentation):** Embed the top-5 passages into the LLM prompt context to generate more accurate answers.


---
layout: two-cols-header
---

# Resources & Further Reading

::left::

- **BERT:** [Research Paper](https://arxiv.org/abs/1810.04805) | [Official GitHub](https://github.com/google-research/bert)
- **Embeddings:** [Critique by Nils Reimers](https://medium.com/@nils_reimers/openai-gpt-3-text-embeddings-really-a-new-state-of-the-art-in-dense-text-embeddings-6571fe3ec9d9)
- **Sentence Transformers:** [Hugging Face ST Hub](https://huggingface.co/sentence-transformers)

## 🚀 Thanks!

<a href="/blog/presentations/">Back to Presentations</a>

::right::

**Embeddings for Everything**

Lecture by **Dan Gillick** (Google)

::youtube{id="JGHVJXP9NHw"}



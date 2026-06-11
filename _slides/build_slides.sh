#!/bin/bash
set -e

echo "Building LLM Fundamentals & Limitations Slides..."
npx @slidev/cli build _slides/llm-fundamentals/slides.md --out ../../presentations/llm-fundamentals --base ./

echo "Building Vector Search & Embeddings 101 Slides..."
npx @slidev/cli build _slides/vector-search-101/slides.md --out ../../presentations/vector-search-101 --base ./

echo "Building RAG & Advanced Retrieval Techniques Slides..."
npx @slidev/cli build _slides/rag-advanced/slides.md --out ../../presentations/rag-advanced --base ./

echo "Building Building Agentic Systems Slides..."
npx @slidev/cli build _slides/augmented-llms-agents/slides.md --out ../../presentations/augmented-llms-agents --base ./

echo "All slide builds completed successfully!"

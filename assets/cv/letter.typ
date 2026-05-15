// Imports
#import "@preview/brilliant-cv:3.3.0": letter
#import "./typ.typ": s
#let raw-metadata = toml("./metadata.toml")
#let info = raw-metadata.personal.info + (
  phone: s(raw-metadata.personal.info.phone),
  email: s(raw-metadata.personal.info.email),
  location: s(raw-metadata.personal.info.location)
)
#let metadata = raw-metadata + (personal: raw-metadata.personal + (info: info))
#let letter-language = sys.inputs.at("language", default: none)
#let privacy = sys.inputs.at("privacy", default: "false") == "true"
#let metadata = if letter-language != none {
  metadata + (language: letter-language)
} else {
  metadata
}
#let metadata = if privacy {
  let new-personal-info = metadata.personal.info + (phone: "", location: "")
  let new-personal = metadata.personal + (info: new-personal-info)
  metadata + (personal: new-personal)
} else {
  metadata
}

#show: letter.with(
  metadata,
  sender-address: metadata.personal.info.location,
  recipient-name: "Diane & the PhantomBuster Hiring Team",
  recipient-address: "Paris, France / Remote",
  date: datetime.today().display(),
  subject: "Application: Senior ML Engineer - AI Platform & Agents",
  signature: v(-1.5em) + image("assets/signature.png"),
)

#set par(justify: true)

Dear Diane,

Following my recent contact with Mateja, I've been interested in PhantomBuster’s development. I am now writing to express my interest in the Senior ML Engineer position for AI Platform & Agents, as this role aligns with my current professional focus. With a PhD in Graph Deep Learning and experience as a Senior Data Scientist and Cloud Engineer, I have spent the last few years developing and deploying agentic systems designed to orchestrate very large sets of tools.

The balance between infrastructure engineering and agent orchestration in this role is particularly interesting. In my current role at Mindflow, I am architecting multi-agent workflows using frameworks inspired by LangChain and LangGraph, specifically adapted to the constraints of isolated, serverless architectures, specializing in large external APIs/MCP orchestration as well as LLM usage for data enrichment.

My technical experience seems to align with your current requirements:
- *Data Relationships & Pragmatic RAG:* My technical background allows me to take a pragmatic approach to managing complex data relationships across SQL, NoSQL, and Graph structures. I focus on navigating the trade-offs between semantic RAG complexity (latency and cost) and the high-precision retrieval required for large-scale, reliable agentic systems.
- *Security & Reliability:* Experience navigating the trade-offs of multi-agent reproducibility versus adaptability. I prioritize security-first orchestration, addressing challenges like prompt injection, secure MCP tool-calling, and human-in-the-loop safeguards.
- *Architectural Abstraction & Observability:* Dedicated to building internal API layers that abstract model provider complexity and implementing traceability systems to monitor drift and visualize multi-turn interaction trees at scale.

I recognize that LLMs are not a silver bullet; depending on the task, a fine-tuned Small Language Model (SLM) or more traditional models can often be more efficient for speed and accuracy. I place a high value on the process of training custom models and curating datasets required to solve specific business problems. I also believe that complex concepts must be clearly explainable to be valuable.

I am eager to bring my research background and engineering experience to your team to contribute to the next iteration of your AI platform. Thank you for your time and consideration. I look forward to the possibility of discussing how my experience with agentic systems can support PhantomBuster’s objectives.

Sincerely,

Corentin Lallier

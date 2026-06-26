#import "@preview/brilliant-cv:3.3.0": cv-entry, cv-section

#cv-section("Professional Experience")

#cv-entry(
  title: [Senior Data Scientist],
  society: link("https://mindflow.io/")[Mindflow],
  logo: image("../assets/logos/mindflow.png"),
  date: [Apr 2023 - Juin 2026],
  location: [Paris / Remote],
  description: list(
    [Architected a custom agentic layer for a no-code cybersecurity platform, implementing long-term memory, context-aware reasoning, LLM Observability, and hallucination mitigation. Engineered an adaptive orchestration engine utilizing RAG and tool calls for reliable execution across multiple providers (OpenAI, Bedrock, Gemini, Mistral, LiteLLM).],
    [Mentored a talented AI team and shared expertise company-wide on agentic systems, RAG, and search optimization. Supported CSEs and Solution Designers in technical implementation.],
    [Developed an LLM drift monitoring framework (multi-route scenarios, parallel tool usage). Optimized internal search performance via a robust evaluation suite (MRR, F1, and NDCG).],
    [Scaled from €0 to €1.5M ARR since joining; delivered AI solutions for major accounts (Thales, LVMH, Auchan, Doctolib, Hermès, Cloudguard, Savencia, Fast Retailing, Heetch, etc.). #link("https://www.linkedin.com/company/mindflow/")[Mindflow LinkedIn page].],
    [*Tech Stack:* LiteLLM, Langchain, LangGraph, RAG, tool calls, Bedrock, GPT, Gemini, Claude, Mistral, AWS Cloud],
  ),
)

#cv-entry(
  title: [Data Scientist (PhD) & Cloud Data Engineer],
  society: link("https://www.lectra.com/en")[Lectra],
  logo: image("../assets/logos/lectra.jpeg"),
  date: [Sept 2017 - Apr 2023],
  location: [Bordeaux],
  description: list(
    [*PhD Research (2020-2023):* Enhanced "sections planning" algorithm by developing graph-oriented heuristics (Attention-based Deep Learning on Graphs) to minimize material waste. Trained models on 100,000+ real nestings using Azure ML, exceeding human expert precision. This is now a live web service used by industrial customers to optimize their production.],
    [*Data Engineering (2017-2020):* Designed and implemented large data pipelines (1000+ events/sec) for massive IoT fleet (Lectra cutters) using Kafka, Spark and Scala. CI/CD workflows on Kubernetes (Docker, Jenkins).],
    [One of the first Data Engineers hired at Lectra, supporting company revenue growth from €350M to €500M+ within a 500-person R&D department. #link("https://www.linkedin.com/company/lectra/")[Lectra LinkedIn page].],
    [*Tech Stack:* Python, Scala, PyTorch, GNN, Azure ML, Apache Kafka, Spark, Kubernetes, Docker, IoT],
  ),
)

#cv-entry(
  title: [Data Scientist - Consultant],
  society: link("https://www.linkedin.com/company/2b-softeam-data/")[2B Softeam Data & AI - Docaposte Group],
  logo: image("../assets/logos/2bconsulting.jpeg"),
  date: [Nov 2016 - Sept 2017],
  location: [Bordeaux],
  description: list(
    [*Cdiscount:* Developed counterfeit detection algorithms using NLP and Hadoop (Hive/Spark) to secure the marketplace. Collaborated with the legal team to ensure regulatory compliance.],
    [*Lectra:* Architected clothing pattern recognition tools using Deep Vision and initiated new large-scale data processing pipelines.],
    [*Tech Stack:* NLP, Computer Vision, Hadoop, Hive, Spark, Java, Scala],
  ),
)

#cv-entry(
  title: [Software Engineer (Freelance)],
  society: link("https://github.com/clallier/")[Freelance],
  logo: image("../assets/logos/CL_logo.png"),
  date: [May 2013 - Aug 2021],
  location: [Bordeaux / Remote],
  description: list(
    [*Data Science:* Implemented cloud-native analytics solutions using Python, AWS SageMaker and Google BigQuery for diverse industrial clients: #link("https://www.linkedin.com/company/cibler/")[Cibler], #link("https://www.linkedin.com/company/cdiscount/")[Cdiscount]],
    [*Full-Stack Development:* Developed high-performance web/mobile apps using React, Canvas API, WebRTC and Haxe.],
    [*Game Development:* Engineered 2D/3D games using Unity3D (C\#) and LibGDX. Winner of the #link("https://afjv.com/news/2979_intel-organise-la-codefest-destinee-aux-developpeurs-android.htm")[Android Codefest 2013]. Showcased my game during the Mobile World Congress (MWC) 2014 in Barcelona on the Intel booth.],
    [*Tech Stack:* AWS, BigQuery, React, Unity3D, C\#, Javascript, WebRTC],
  ),
)


#v(1.2em)
#cv-entry(
  title: [Project Manager & Software Engineer],
  society: link("https://www.linkedin.com/company/cybertech-computer/")[Cybertek],
  logo: image("../assets/logos/cybertek.jpeg"),
  date: [Mar 2014 - Nov 2016],
  location: [Bordeaux],
  description: list(
    [Integrated several marketplaces (Amazon, Fnac) and optimized logistics by automating shipping workflows using carrier APIs (UPS, Chronopost). Redesigned the #link("https://www.cybertek.fr/")[e-commerce platform] with responsive design, fuzzy search, and SEO optimization, increasing store visibility and sales by 100%+],
    [Enhanced internal ERP/CRM and data-driven communication strategies to optimize customer retention.],
    [*Tech Stack:* C\#, SQL Server, .NET, ERP, CRM, SEO, Marketplace APIs],
  ),
)

#cv-entry(
  title: [Software Engineer],
  society: link(
    "https://www.aerocontact.com/entreprise-aeronautique/societe-nexeya-3566/presentation",
  )[Nexeya - Aero Contact Group],
  logo: image("../assets/logos/groupe_nexeya_logo.jpeg"),
  date: [Oct 2012 - Apr 2013],
  location: [Bordeaux],
  description: list(
    [Developed LYNCEA, a multi-sensor data fusion platform for naval defense. Integrated data acquisition modules and co-developed the high-performance network layer. [#link("https://www.aerocontact.com/videos/91272-lyncea-defense")[Video]]],
    [*Tech Stack:* C++, Qt, Network Engineering, Embedded Systems],
  ),
)

#cv-entry(
  title: [Research Engineer],
  society: link("https://www.labri.fr/")[LaBRI (Research Laboratory)],
  logo: image("../assets/logos/labri.jpeg"),
  date: [Oct 2011 - Sep 2012],
  location: [Bordeaux],
  description: list(
    [Created Java JEE web services for research sharing and developed cross-language APIs (C++, C\#, Java) with a real-time web application.],
    [*Tech Stack:* Java JEE, C++, C\#, Javascript, Web Services],
  ),
)

#cv-entry(
  title: [PhD Researcher & Software Engineer],
  society: link("https://www.foxstream.us.com/")[Foxstream],
  logo: image("../assets/logos/foxstream_logo.jpeg"),
  date: [Sep 2009 - Aug 2011],
  location: [Lyon],
  description: list(
    [Object tracking and one-class classification algorithms for video surveillance. Developed video analysis software solutions using C\+\+, Winforms, and MFC in Agile environment. #link("https://www.linkedin.com/company/foxstream/")[Foxstream LinkedIn page]],
    [Engineered network video stream retrieval (OpenCV, Winsockets) and remote usage features.],
    [*Tech Stack:* C\+\+, OpenCV, Winforms, MFC, Agile, Winsockets],
  ),
)

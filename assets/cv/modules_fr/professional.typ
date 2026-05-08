#import "@preview/brilliant-cv:3.3.0": cv-section, cv-entry

#cv-section("Expérience Professionnelle")

#cv-entry(
  title: [Senior Data Scientist],
  society: link("https://mindflow.io/")[Mindflow],
  logo: image("../assets/logos/mindflow.png"),
  date: [Avr 2023 - Présent],
  location: [Paris / Remote],
  description: list(
    [Conception d’une couche agentique sur mesure pour une plateforme no-code orientée cybersécurité, incluant la gestion de mémoire, du contexte, de l'observabilité LLM et de la mitigation d'hallucinations. Développement d’un moteur d’orchestration avec tool-calls, pour une exécution multi-fournisseurs (OpenAI, Bedrock, Gemini, Mistral, LiteLLM).],
    [Mentorat d'une équipe IA et partage d'expertise sur les systèmes agentiques, le RAG et l'optimisation de recherche. Support technique des CSEs et Solution Designers.],
    [Création d'un framework de test de monitoring de drift LLM (scénarios multi-routes, usage d'outils en parallèles). Optimisation de la recherche interne via un framework d'évaluation robuste (MRR, F1, NDCG).],
    [Croissance de 0 à 1,5 M€ d'ARR ; déploiement de solutions IA pour clients majeurs (Thales, LVMH, Doctolib, Hermès, Cloudguard, Savencia, etc.). #link("https://www.linkedin.com/company/mindflow/")[Mindflow LinkedIn page].],
    [*Tech Stack:* LiteLLM, Langchain, LangGraph, RAG, tool-calls, Bedrock, GPT, Gemini, Claude, Mistral, AWS Cloud]
  )
)

#cv-entry(
  title: [Data Scientist (PhD) & Ingénieur Data Cloud],
  society: link("https://www.lectra.com/fr")[Lectra],
  logo: image("../assets/logos/lectra.jpeg"),
  date: [Sept 2017 - Avr 2023],
  location: [Bordeaux],
  description: list(
    [*Doctorat (2020-2023) :* Optimisation de la planification de sections via heuristiques sur graphes (Attention-based Deep Learning) pour réduire la perte de matière. Modèles entraînés sur 100 000+ cas réels (Azure ML), surpassant les experts humains. Service désormais utilisé en production par les clients industriels.],
    [*Data Engineering (2017-2020) :* Architecture de pipelines de données (1000+ évts/sec) pour des milliers de machines IoT (découpeurs connectés Lectra) via Kafka, Spark et Scala. Mise en œuvre de workflows CI/CD sur Kubernetes (Docker, Jenkins).],
    [L'un des premiers Data Engineers recrutés chez Lectra, accompagnant la croissance du CA de 350 M€ à 500 M€+ au sein d'une R&D de 500 personnes. #link("https://www.linkedin.com/company/lectra/")[page LinkedIn Lectra]],
    [*Tech Stack:* Python, Scala, PyTorch, GNN, Azure ML, Apache Kafka, Spark, Kubernetes, Docker, IoT]
  )
)

#cv-entry(
  title: [Data Scientist - Consultant],
  society: link("https://www.linkedin.com/company/2b-softeam-data/")[2B Softeam Data & AI],
  logo: image("../assets/logos/2bconsulting.jpeg"),
  date: [Nov 2016 - Sept 2017],
  location: [Bordeaux],
  description: list(
    [*Cdiscount :* Développement d'algorithmes de détection de contrefaçons via le NLP et Hadoop (Hive/Spark) pour sécuriser la marketplace. Collaboration étroite avec l'équipe juridique pour assurer la conformité réglementaire.],
    [*Lectra :* Architecture d’outils de reconnaissance de formes textiles via Deep Vision et amorce des nouveaux pipelines de données à grande échelle.],
    [*Tech Stack :* NLP, Computer Vision, Hadoop, Hive, Spark, Java, Scala]
  )
)

#cv-entry(
  title: [Ingénieur Logiciel (Freelance)],
  society: link("https://github.com/clallier/")[Indépendant],
  logo: image("../assets/logos/CL_logo.png"),
  date: [Mai 2013 - Août 2021],
  location: [Bordeaux / Remote],
  description: list(
    [*Data Science :* Implémentation de solutions analytiques cloud-native via Python, AWS SageMaker et Google BigQuery pour divers clients industriels : #link("https://www.linkedin.com/company/cibler/")[Cibler], #link("https://www.linkedin.com/company/cdiscount/")[Cdiscount]],
    [*Développement Full-Stack :* Création d'applications web/mobiles performantes avec React, Canvas API, WebRTC et Haxe.],
    [*Jeux Vidéo :* Développement de jeux 2D/3D avec Unity3D (C\#) et LibGDX. Vainqueur de l'#link("https://afjv.com/news/2979_intel-organise-la-codefest-destinee-aux-developpeurs-android.htm")[Android Codefest 2013]. Présentation du projet au Mobile World Congress (MWC) 2014 à Barcelone sur le stand Intel.],
    [*Tech Stack :* AWS, BigQuery, React, Unity3D, C\#, Javascript, WebRTC]
  )
)

#pagebreak()
#cv-entry(
  title: [Chef de Projet & Ingénieur Logiciel],
  society: link("https://www.linkedin.com/company/cybertech-computer/")[Cybertek],
  logo: image("../assets/logos/cybertek.jpeg"),
  date: [Mar 2014 - Nov 2016],
  location: [Bordeaux],
  description: list(
    [Intégration de plusieurs marketplaces (Amazon, Fnac) et optimisation de la logistique par l'automatisation des workflows via des APIs transporteurs (UPS, Chronopost). Refonte de la plateforme e-commerce (responsive, fuzzy search, SEO), entraînant une augmentation des ventes de plus de 100%.],
    [Amélioration de l'ERP/CRM interne et stratégies de communication data-driven pour optimiser la fidélisation client.],
    [*Tech Stack :* C\#, SQL Server, .NET, ERP, CRM, SEO, Marketplace APIs]
  )
)

#cv-entry(
  title: [Ingénieur Logiciel],
  society: link("https://www.aerocontact.com/entreprise-aeronautique/societe-nexeya-3566/presentation")[Nexeya - Now Aero Contact],
  logo: image("../assets/logos/groupe_nexeya_logo.jpeg"),
  date: [Oct 2012 - Avr 2013],
  location: [Bordeaux],
  description: list(
    [Développement de LYNCEA, plateforme de fusion de données multi-capteurs pour la défense navale. Intégration de modules d’acquisition et co-développement de la couche réseau haute performance. [#link("https://www.aerocontact.com/videos/91272-lyncea-defense")[Présentation]]],
    [*Tech Stack :* C++, Qt, Network Engineering, Embedded Systems]
  )
)

#cv-entry(
  title: [Ingénieur de Recherche],
  society: link("https://www.labri.fr/")[LaBRI (Laboratoire de Recherche)],
  logo: image("../assets/logos/labri.jpeg"),
  date: [Oct 2011 - Sep 2012],
  location: [Bordeaux],
  description: list(
    [Création de services web Java JEE pour le partage de recherche et développement d'APIs multi-langages (C++, C\#, Java) avec une application web temps réel.],
    [*Tech Stack :* Java JEE, C++, C\#, Javascript, Web Services]
  )
)

#cv-entry(
  title: [Chercheur Doctorant & Ingénieur Logiciel],
  society: link("https://www.foxstream.fr/")[Foxstream],
  logo: image("../assets/logos/foxstream_logo.jpeg"),
  date: [Sep 2009 - Août 2011],
  location: [Lyon],
  description: list(
    [Algorithmes de suivi d'objets et de classification one-class pour la vidéosurveillance. Développement de solutions logicielles d'analyse vidéo en C\+\+, Winforms et MFC en environnement Agile. #link("https://www.linkedin.com/company/foxstream/")[page LinkedIn Foxstream]],
    [Ingénierie de récupération de flux vidéo réseau (OpenCV, Winsockets) et fonctions d'utilisation à distance.],
    [*Tech Stack :* C\+\+, OpenCV, Winforms, MFC, Agile, Winsockets]
  )
)

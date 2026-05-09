#import "@preview/brilliant-cv:3.3.0": cv-section, cv-entry

#cv-section("Research Internships")

#cv-entry(
  title: [Research Intern],
  society: link("https://sbri.fr/")[Inserm - SBRI (Stem Cell and Brain Research Institute)],
  logo: image("../assets/logos/sbri.png"),
  date: [Jan 2009 - Sep 2009],
  location: [Lyon],
  description: list(
    [Developed a robotic system capable of learning rules through demonstration (Bayesian statistics, Markov networks).],
    [*Tech Stack:* C++, TCL, Bayesian Statistics, Robotic Platform]
  )
)

#cv-entry(
  title: [Research Intern],
  society: link("https://labo-emc.org/")[Laboratoire EMC (Laboratoire d'Etude des Mécanismes Cognitifs - UR EMC)],
  logo: image("../assets/logos/laboratoire_emc_logo.jpeg"),
  date: [Jan 2008 - Sep 2008],
  location: [Lyon],
  description: list(
    [Simulated neural-astrocyte network interactions using mathematical models and Java/RK4 to study focal cortical epilepsy.],
    [*Tech Stack:* Java, RK4, Computational Neuroscience]
  )
)

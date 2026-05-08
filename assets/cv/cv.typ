// Imports
#import "@preview/brilliant-cv:3.3.0": cv
#let metadata = toml("./metadata.toml")
#let cv-language = sys.inputs.at("language", default: none)
#let metadata = if cv-language != none {
  metadata + (language: cv-language)
} else {
  metadata
}

#let import-modules(modules, lang: metadata.language) = {
  for module in modules {
    include {
      "modules_" + lang + "/" + module + ".typ"
    }
  }
}

#set par(justify: true)
#show link: set text(fill: rgb("#305a8e"))

#show: cv.with(
  metadata,
  profile-photo: image("assets/avatar.jpeg"),
)

#import-modules((
  "profile",
  "professional",
  "research",
  "education",
  "publications",
  "skills",
))

// Imports
#import "@preview/brilliant-cv:3.3.0": cv
#import "./typ.typ": s
#let raw-metadata = toml("./metadata.toml")
#let info = raw-metadata.personal.info + (
  phone: s(raw-metadata.personal.info.phone),
  email: s(raw-metadata.personal.info.email),
  location: s(raw-metadata.personal.info.location)
)
#let metadata = raw-metadata + (personal: raw-metadata.personal + (info: info))
#let cv-language = sys.inputs.at("language", default: none)
#let privacy = sys.inputs.at("privacy", default: "false") == "true"
#let metadata = if cv-language != none {
  metadata + (language: cv-language)
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

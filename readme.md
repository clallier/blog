# Corentin Lallier

## Live version
https://clallier.github.io/blog/

## Quickstart Guide

### Setup

1. **Clone the repository:**

```sh
git clone https://github.com/clallier/blog.git
cd blog
```

2. **Installation**
   
```sh
bundle install
```  
   
3. **Build and serve locally**
  
```sh
bundle exec jekyll serve
```

4. **Deploy**
```sh
git push # trigger the 'pages-build-deployment' github action
```

### Troubleshot

#### Setup
See: [GitHub Pages with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll)

#### Out of the box fixes:
- In the `_config.yml`:
  - Set the `baseurl: ""` to point to the URL subpath of the site, e.g., `/blog`
- In the Gemfile:
  - Comment out `# gem "jekyll", "~> 4.3.2"` (line 10)
  - Uncomment `gem "github-pages", "~> 228", group: :jekyll_plugins` with the version of GitHub Pages (Dependency versions)

#### Fix some missing dependencies:
```sh
bundle add webrick
bundle add csv
```
 
#### Update github pages gem
```sh
bundle update github-pages
```

### Customise theme
1. Access to the default theme file (minima theme)
`open $(bundle info --path minima)`

2. Copy any bundle file into the local repo, e.g., `/opt/homebrew/lib/ruby/gems/3.4.0/gems/minima-2.5.1/_sass/minima/_layout.scss` to `./_sass/minima/_layout.scss`

3. Modify the file in the local repo (the local version has the precedence over the bundle version)
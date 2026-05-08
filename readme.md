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

2.1. **Install Bundler and dependencies**
This project use Ruby's Bundler to manage dependencies.
Make sure to have it installed (see https://bundler.io/guides/getting_started.html for more details).

Summary:

- First, install `Bundler` if missing (run `bundle -v` to check if it's installed)

```sh
gem install bundler
```

- Next, Check that the bundler version in the Gemfile.lock (generaly the last line of Gemfile.lock) is up-to-date with the current bundler version

- Finally, install all the project dependencies, using:

```sh
bundle install
```

- Yay! 🎉

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

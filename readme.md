# Corentin Lallier

## Setup 
See: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll

 - In the Gemfile 
   - Comment `# gem "jekyll", "~> 4.3.2"` (l. 10)
   - Uncomment `gem "github-pages", "~> 228", group: :jekyll_plugins` with the version of github pages (Dependency versions)
   - Fix a missing dep: `bundle add webrick`
   - Locally run: 
   - `bundle install` to install dependencies 
   - `bundle exec jekyll serve` to build and serve

## Update github pages gem
`bundle update github-pages`


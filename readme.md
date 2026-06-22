# Corentin Lallier | Blog & Resume

Creative and technical exploration. This repository contains the source code for my personal blog and portfolio, built with Jekyll 4.3 and the Minima 3.0 theme.

## Live Version
[https://clallier.github.io/blog/](https://clallier.github.io/blog/)

---

## 🛠 Local Ops

### 1. Setup
- Check **Ruby 3.2+** is installed (`rbenv` recommended).
- **Activate rbenv**: Run `eval "$(rbenv init -)"` in your terminal.
- **Lock version**: Run `rbenv local 3.2.4` inside this folder.
- Run `bundle install` to grab dependencies.

### 2. Multi-Platform Support (Mandatory)
- **Always** run these if you update gems on Mac (prevents GH Action failure):
  - `bundle lock --add-platform x86_64-linux`
  - `bundle lock --add-platform aarch64-linux`

### 3. Dev & Preview
- Run `bundle exec jekyll serve --livereload` to launch locally.
- Or single line: `clear && eval "$(rbenv init -)" && bundle exec jekyll serve`
- Check `http://127.0.0.1:4000/blog/`.

### 4. Deploy
- Push to `main` to trigger the **GitHub Action**.
- Watch status here: [Actions tab](https://github.com/clallier/blog/actions).

---

## Resume Sync (Typst Pipeline)
Keep `resume.md` and Typst files in lockstep:
1.  Update source in `assets/cv/modules_*`.
2.  Export English/French PDFs:
    ```bash
    cd assets/cv && ./build_cv.sh
    ```
3.  The script automatically places PDFs in `assets/pdf/`.
4.  Update `resume.md` text content with latest Typst changes.

---

## Build presentations locally
Add a new presentation:
1.  Add a new folder in `_slides`.
2.  Add a `slides.md` file in the folder.
3.  Run the build script:
    ```bash
    cd _slides && ./build_slides.sh
    ```
3.  The script automatically build sli.dev presentations in `presentions/`.

---

## Tech Stack
- **Engine**: Jekyll 4.3.4
- **Theme**: Minima 3.0 (Remote)
- **Plugins**: `seo-tag`, `sitemap`, `feed`, `titles-from-headings`, `jemoji`.


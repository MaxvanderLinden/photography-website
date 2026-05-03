# Lars van Straalen — Architecture Photography

Static portfolio website built with [Eleventy](https://www.11ty.dev/), hosted on GitHub Pages.

---

## Local development

```bash
npm install
npm start
```

The site will be available at `http://localhost:8080`. Eleventy watches for changes and reloads automatically.

To build for production:

```bash
npm run build
```

Output is written to `_site/`.

---

## Adding a new project

1. Duplicate `src/projects/example-project.njk` and rename it (e.g. `src/projects/my-project.njk`)
2. Update the front matter:
   - `title` — project name (displayed on the grid and project page)
   - `location` — city, country
   - `year` — four-digit year
   - `thumbnail` — path to the grid thumbnail image
   - `images` — list of full-size image paths for the project page
3. Add your images to `src/assets/images/`
4. Write a short description in the body of the file (one or two sentences)

The project will appear automatically in the homepage grid.

---

## Deploy

Pushing to the `main` branch triggers an automated build and deploy via GitHub Actions.

**First-time setup:**
1. Go to repo Settings → Pages → set source to the `gh-pages` branch
2. Optionally add a custom domain in the same panel
3. Replace `YOUR_FORMSPREE_ID` in `src/_data/site.json` with your actual Formspree form ID
4. Update `src/_data/site.json` with your real name, email, and description

---

## License

Code: MIT — see `LICENSE`  
Photography: All rights reserved — see `LICENSE-CONTEND.md`

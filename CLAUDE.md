---
output:
  html_document: default
  pdf_document: default
---
# CLAUDE.md — Generative Art Portfolio

This file gives Claude Code full context for this project. Read it at the start of every session.

## Project Overview

A generative art portfolio website. I create algorithmic and generative artworks, primarily using Rstudio with R and Rcpp for computational work, and p5.js for interactive web versions. This project is for the development of the portfolio website

## Tech Stack

- **Framework:** Astro (static site generator)
- **Hosting:** Netlify — auto-deploys on `git push` to `main`
- **Interactivity:** p5.js sketches embedded in pages (loaded from CDN, not bundled)
- **Styling:** Plain CSS with `<style scoped>` in components
- **No backend, no database, no server-side code**

## Site Structure

| Page | Description |
|---|---|
| Landing (`index.astro`) | Grid of series cards — one card per series |
| Project page | Grid of all thumbnails in that series |
| Image view | Lightbox overlay — clicking a thumbnail shows the display image without navigating away |

**One `.astro` file per series, NOT per image.** New images added to a series require no code changes — the project page reads the image folder dynamically.

## Folder Conventions

```
public/images/[series-slug]/thumb/[id].png      600×600px          (gallery grid)
public/images/[series-slug]/display/[id].png    2000px long side   (lightbox view)
public/images/[series-slug]/print/[id].png      full res           (download, optional)
public/data/[series-slug]/[id].json             p5.js sketch data  (optional)
```

**Image format:** PNG (switched from JPG for quality). The site also accepts `.jpg`, `.jpeg`, and `.webp` — extension is detected automatically.

**Image ID format:** `<order>_<seed>` — e.g. `001_4528`. The order prefix (3-digit,
zero-padded) controls gallery sort order; the seed suffix is the image's unique
artistic identity and links back to the manifest. Example filenames: `001_4528.png`,
`002_0042.png`.

```

src/pages/index.astro                           Home page / series grid
src/pages/projects/[series-slug].astro          One file per series
src/content/projects/[series-slug].md           Series title, year, description
src/components/                                 Reusable components: P5Sketch, GalleryCard, Lightbox, Nav, etc.
src/layouts/                                    Base layout wrapper used by all pages
```

## Image Data Format

For each image, R exports (at minimum) a thumb and display file. Print and JSON are optional:

```
public/images/[series-slug]/thumb/[id].png     600×600px
public/images/[series-slug]/display/[id].png   2000px long side
public/images/[series-slug]/print/[id].png     full res
public/data/[series-slug]/[id].json            { seed, params: {...}, elements: [...] }
```

Update the JSON schema here as the actual structure becomes clear.

## Lightbox Behaviour

Clicking a thumbnail opens a lightbox overlay (no page navigation). The lightbox shows:

- The display-resolution image
- Title / ID of the piece
- Arrow navigation to previous / next image in the series
- Close button (or click outside to close)
- Optional: download link to the print file
- Optional: "View interactive sketch" button if a `.json` exists for that image

## Design Language

Reference: [markjstock.com](https://markjstock.com/) — institutional gallery sensibility, content-first.

### Aesthetic Principles
- **White background throughout** — crisp, no tinted or dark backgrounds
- **Restrained, uncluttered layout** — generous whitespace, nothing competing with the artwork
- Artwork is the visual focus; UI elements deliberately recede

### Color
- Background: white
- Text: near-black for maximum contrast
- Accents: subtle grays only (borders, dividers, metadata)
- No decorative color — all color comes from the artwork itself

### Typography
- Clean sans-serif, single family throughout
- Restrained hierarchy: understated nav, clear headings, legible body
- No expressive or display type — institutional, not editorial

### Spacing
- Generous margins and padding around images and text
- Clear separation between grid items — no density-packing
- Museum-catalog rhythm: each work gets breathing room

### Image Presentation
- Thumbnails on neutral (white) background
- No drop shadows, borders, or decorative frames on images
- Lightbox view: image centered on white or very light overlay, minimal chrome

## Layout Requirements

### Responsive
- Works well on both mobile and desktop
- Mobile-first approach

### Series Grid (Home Page)
- 2 columns on mobile
- 3 columns on desktop
- Sorted newest to oldest

### Navigation
- Fixed at top of page
- Left side: site icon + site name
- Right side: links — **Work** (home page `/`), **About** (`/about`)

### Footer
- Present on all pages
- Left side: "Created by Dorit Geifman"
- Right side: "Contact: dorit.geifman@gmail.com"
- Same restrained style as the nav — subtle, minimal chrome

## Coding Conventions

- TypeScript in Astro component frontmatter (`---` blocks)
- Plain CSS in `<style scoped>` — no CSS framework, no Tailwind
- p5.js loaded from CDN, never bundled
- Each artwork page is fully self-contained — no shared sketch state between pages
- Prefer readable code over clever code; the artist is not a JS expert
- No localStorage — there is no user state to persist

## Series Pages

Each series page (`src/pages/projects/[series-slug].astro`) shows:

- Series title and year
- Short description of the algorithm / technique
- Full grid of thumbnails (all images found in `thumb/` folder — no code change needed to add images)
- Optional: link to a standalone p5 demo for the series

## Workflow: Adding a New Image to an Existing Series

1. R writes thumb, display, and print files into `public/images/[series-slug]/`
2. `git add . && git commit -m "add [series] [id]" && git push`
3. No `.astro` files need to change

## Workflow: Adding a New Series

1. R creates the new folder structure and writes the first images
2. Claude Code creates `src/pages/projects/[series-slug].astro`
3. Claude Code adds the series card to `src/pages/index.astro`
4. Write a short description in `src/content/projects/[series-slug].md`, and set the `cover` frontmatter field to the image ID to display on the series card (e.g. `cover: "001"`). If omitted, the first image in the `thumb/` folder is used as fallback.
5. `git push`

### Choosing the Cover Image for a Series Card

The series card on the home page displays one representative image. To control which image is used:

- Open `src/content/projects/[series-slug].md`
- Set `cover: "[id]"` in the frontmatter (e.g. `cover: "001_4528"`)
- The series page reads this field and loads `public/images/[series-slug]/thumb/[id].png` (or `.jpg` — extension is detected automatically)
- To change the cover image later, just update this field — no code changes needed

## Commands

```bash
npm run dev      # local preview at http://localhost:4321
npm run build    # build to dist/ (Netlify runs this automatically on push)
git push         # triggers Netlify deploy
```

## Things to Never Do

- Never edit anything inside `dist/`
- Never commit `node_modules/`
- Never add backend or server-side code of any kind
- Never use `localStorage` — there is no user state
- Never bundle p5.js — always load it from CDN

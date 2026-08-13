# IRL CROSSING CNRS - Projects

A standalone site indexing IRL CROSSING CNRS's scientific projects (publications, datasets, tools) organized by project, wiki-style. This is not the lab's institutional site (that's [crossing.cnrs.fr](https://crossing.cnrs.fr/)) - no lab presentation, no team pages, no commercial content. Just projects and the resources they produced.

Live at [irl-crossing-cnrs.github.io](https://irl-crossing-cnrs.github.io/).

![React](https://img.shields.io/badge/React_19-141414?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-141414?style=for-the-badge&logo=typescript&logoColor=3178C6)
![Vite](https://img.shields.io/badge/Vite_8-141414?style=for-the-badge&logo=vite&logoColor=BD34FE)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-141414?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![React Router](https://img.shields.io/badge/React_Router_7-141414?style=for-the-badge&logo=reactrouter&logoColor=CA4245)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-141414?style=for-the-badge&logo=framer&logoColor=white)
![Node](https://img.shields.io/badge/Node_%3E%3D20-141414?style=for-the-badge&logo=node.js&logoColor=339933)

## Stack

- **React 19 + TypeScript**, built with **Vite 8**
- **Tailwind CSS v4** (CSS-first config via `@theme`, plugged in through `@tailwindcss/vite`)
- **React Router v7** (library mode, `createBrowserRouter`)
- **Framer Motion** for animation
- **lucide-react** for icons
- Plain npm, no monorepo tooling, no backend - all content lives in `src/data/*.json`

## Getting started

Requires Node >= 20.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

Other scripts:

```bash
npm run build     # type-check (tsc -b) then production build to dist/
npm run preview   # serve the production build locally
npm run lint      # eslint
```

## Data model

No backend, no CMS. Content is organized in two layers:

- **Projects** (`src/data/projects.json`) - the top-level groupings shown on the home page (e.g. LOTUSim, RoboCup).
- **Resources** (`src/data/resources.json`) - the papers, datasets, and tools that belong to a project.

### Adding a project

Add an entry to `src/data/projects.json`:

```json
{
  "slug": "my-project",
  "name": "My Project",
  "description": "One or two sentences describing the project."
}
```

`slug` is used in the URL (`/projects/my-project`). Tags shown on the project card are derived automatically from the tags of its resources, no need to set them manually.

### Adding a resource

Add an entry to `src/data/resources.json` (shape defined in `src/types/resource.ts`):

```json
{
  "slug": "my-resource-2026",
  "title": "My Resource Title",
  "project": "my-project",
  "type": ["paper"],
  "authors": [{ "name": "First Last", "affiliations": [1] }],
  "affiliations": ["Institution Name"],
  "year": 2026,
  "venue": "Conference or journal name",
  "abstract": "Short summary shown on the card and detail page.",
  "tags": ["tag one", "tag two"],
  "pdfUrl": "/resources/my-resource-2026.pdf",
  "repoUrl": "https://github.com/...",
  "resourceUrl": "https://doi.org/...",
  "arxivUrl": "https://arxiv.org/abs/..."
}
```

Notes:

- `project` must match an existing project `slug` in `projects.json`.
- `type` is open-ended (`"paper"`, `"overview"`, ...); each value gets a badge on the card. `src/data/resourceTypes.ts` maps known types to a label and icon, anything else falls back to a generic tag icon.
- `pdfUrl`, `repoUrl`, `resourceUrl`, `arxivUrl` are all optional; only the ones present are shown as links.
- This alone is enough to make the resource show up on its project page and be searchable. It links out to `pdfUrl` / `resourceUrl` / etc. directly.

#### Authors

Each entry in `authors` is `{ name, url?, affiliations? }`:

- `affiliations` is a list of 1-based indexes into that resource's own `affiliations` array, rendered as superscript numbers next to the author's name (e.g. `"affiliations": [1, 2]` on an author with `"affiliations": ["Lab A", "Lab B"]` on the resource shows both).
- `url` links the author's name. You almost never need to set it by hand: names are looked up against the centralized registry in `src/data/authors.json` (`name -> profile URL`), so an author already listed there is linked automatically on every resource they appear on. Set `url` directly on the author only for a one-off case that shouldn't go in the shared registry (e.g. `"IRISA"` on the TrustedNews entry, which is a partner institution, not a person).
- To add a person's profile link once and have it apply everywhere, add them to `src/data/authors.json` instead of repeating `url` on every resource. The key must match `name` exactly (accents included).
- An author with neither `url` nor a registry entry just renders as plain text.

To give a resource its own detail page (like the existing LOTUSim or RoboBreizh pages) instead of just linking out:

1. Create `src/pages/resources/my-resource-2026.tsx` using an existing page (e.g. `robobreizh-robocup2023.tsx`) as a template - it composes `ResourceHero`, `Section`, `SidebarCard`, etc. from `src/components/resource-detail/`.
2. Register it in `src/data/resourcePages.ts`:

```ts
'my-resource-2026': lazy(() => import('../pages/resources/my-resource-2026')),
```

`ResourceCard` and `ResourceHero` pick this up automatically: the resource card links to `/resources/my-resource-2026` instead of an external URL, and the detail page's back link points to its parent project.

## Branching and deployment

- Work and test on the **`dev`** branch (or a feature branch merged into `dev`). Run `npm run dev` locally and check the result in the browser before merging.
- When a change is ready to go live, merge `dev` into **`main`**.
- Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the `gh-pages` branch. GitHub Pages serves that branch at the domain root, so anything merged into `main` goes live automatically, no manual deploy step.

# Book of Notes

`bookofnotes` is a clean web notebook for engineering course material.

It renders lessons as native pages, with searchable sections, static PDF downloads, math support, images, tables, and copyable code blocks.

## Installation

### Requirements

- [Node.js](https://nodejs.org/) 20+
- [npm](https://www.npmjs.com/)

### Procedure

1. Clone this repository to your machine.
2. Run `npm install` to install the dependencies.

## Usage

### Development Server

```bash
npm run dev
```

Open the local URL printed by Vite.

### Build

```bash
npm run build
```

The production files are written to `dist/`.

## Content

### Courses

Course pages are stored in `data/` as TypeScript content modules.

### Assets

Static assets are stored in `public/`.

### PDFs

Published subject PDFs are stored in `public/pdfs/` and downloaded directly from the app.

## Development

### Structure

- `components/` contains the React interface.
- `data/` contains the course content.
- `public/` contains static assets and downloadable PDFs.
- `scripts/` contains local maintenance helpers.

### Check

1. Run `npm run build` before publishing.
2. Open the affected course page and verify layout, code blocks, images, and PDF downloads.

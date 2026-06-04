# VNTR Locus & Haplotype Explorer

A Vite + React front-end prototype for visualizing a mock Variable Number Tandem Repeat (VNTR) locus from long-read sequencing data.

## What this prototype shows

- A dark genome-browser-style track view for the mock `ACAN` VNTR locus `chr15:89,850,410-89,850,790`.
- Reference, haplotype, coverage, spanning-read, and motif evidence tracks.
- A right-side summary panel with repeat counts, read support, confidence, and cautious interpretation language.
- Simple interactions for highlighting haplotypes, toggling coverage and motif tracks, and switching Haplotype 2 between collapsed and expanded motif displays.

## Important limitations

This is a learning and UI prototype only.

- It uses hardcoded mock data from `src/data/mockVntrData.js`.
- It does not use real patient-identifying information.
- It does not parse BAM, CRAM, VCF, FASTQ, or other genomics files.
- It does not perform real VNTR calling.
- It does not provide clinical classification and does not label the mock VNTR as pathogenic.

## Setup

Install dependencies:

```bash
npm install
```

## Run locally

Start the Vite development server:

```bash
npm run dev
```

Then open the local URL printed by Vite, usually `http://localhost:5173/`.

## Build

Create a production build:

```bash
npm run build
```

## Project structure

```text
package.json
index.html
src/main.jsx
src/App.jsx
src/App.css
src/data/mockVntrData.js
src/components/TopBar.jsx
src/components/CoordinateRuler.jsx
src/components/TrackPanel.jsx
src/components/HaplotypeTrack.jsx
src/components/CoverageTrack.jsx
src/components/SpanningReadsTrack.jsx
src/components/MotifTrack.jsx
src/components/SummaryPanel.jsx
src/components/Legend.jsx
```

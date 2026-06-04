# VNTR Locus & Haplotype Explorer — Prototype #2

A Vite + React front-end prototype for exploring a mock Variable Number Tandem Repeat (VNTR) locus using hardcoded long-read-style evidence.

**Demo data only — not for clinical use.** This prototype is designed for interface design, education, and workflow discussion. It does not perform real genomic analysis or clinical classification.

## What Prototype #2 shows

- A dark genome-browser-style **Haplotype Explorer** for a mock VNTR locus.
- A **Known Region** dropdown concept with demo metadata for ACAN, FMR1, HTT, DMPK, and C9orf72 examples.
- A reference track showing flanks and the reference repeat count.
- A dynamic list of observed allele groups rendered from mock data rather than assuming exactly two haplotypes.
- Allele/group tracks with repeat counts, size in base pairs, confidence, read support, and motif block patterns.
- Collapsed and detailed motif displays, including motif interruption colors.
- Coverage/read-depth evidence labeled clearly as read depth, not repeat length.
- Spanning reads grouped by their supporting allele/group, with partial or ambiguous reads shown separately.
- VNTR boundary markers and coordinate guide lines with explanatory labels.
- A wider right-side “answer key” summary panel with locus metadata, reference repeat count, observed allele groups, confidence, and warnings.

## How to run

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Then open the local URL printed by Vite, usually `http://localhost:5173/`.

## The 3 tabs

1. **Individual Overview**
   A case-level summary for sample `HG001`, including specimen type, sequencing type, selected known region, gene, motif, reference repeat count, observed allele group count, main finding, confidence, and cautious interpretation.

2. **Haplotype Explorer**
   The main genome-browser-style visualization. This tab includes the Known Region selector, Case type selector, coordinate ruler, reference track, observed allele/group tracks, coverage track, spanning-read evidence, motif evidence, legend, and summary panel.

3. **Cohort / All Samples View**
   A simple mock cohort table and CSS-only repeat-count distribution view for comparing repeat sizes across samples and identifying outliers.

## The 3 mock case types

1. **Standard 2-haplotype case**
   Shows two phased groups: `Haplotype 1 / Maternal` with 20 repeats and `Haplotype 2 / Paternal` with 46 repeats.

2. **1 observed allele group**
   Shows `Observed Allele Pattern 1` with 20 repeats and warns that one observed pattern may reflect homozygosity, hemizygosity, or unresolved second-haplotype support.

3. **3 repeat-size clusters**
   Shows `Repeat-size Cluster A`, `Repeat-size Cluster B`, and `Repeat-size Cluster C`, with a warning to review for mosaicism, copy-number complexity, sample heterogeneity, or technical artifact.

## Important limitations

This is a mock UI prototype only.

- It uses hardcoded mock data from `src/data/mockVntrData.js`.
- It has no backend.
- It does not parse BAM, CRAM, VCF, FASTQ, or other genomics files.
- It does not perform real VNTR calling.
- It does not perform real phasing.
- It does not provide clinical classification.
- It does not make pathogenicity claims.

## Build

Create a production build:

```bash
npm run build
```

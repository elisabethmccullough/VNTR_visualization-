export default function TopBar({ sample, showCoverage, setShowCoverage, showMotif, setShowMotif, collapsedHap2, setCollapsedHap2 }) {
  return (
    <header className="top-bar">
      <div>
        <p className="eyebrow">Prototype genome browser</p>
        <h1>VNTR Locus &amp; Haplotype Explorer</h1>
      </div>

      <div className="controls" aria-label="Visual controls">
        <label>
          Locus
          <select value={sample.locus_label} onChange={() => {}}>
            <option>{sample.locus_label}</option>
          </select>
        </label>
        <label>
          Gene
          <select value={sample.gene} onChange={() => {}}>
            <option>{sample.gene}</option>
          </select>
        </label>
        <label>
          Motif
          <select value={sample.primary_motif} onChange={() => {}}>
            <option>{sample.primary_motif}</option>
          </select>
        </label>
        <button type="button">Center on VNTR</button>
        <button type="button">Export View</button>
      </div>

      <div className="toggles" aria-label="Track toggles">
        <label><input type="checkbox" checked={showCoverage} onChange={(e) => setShowCoverage(e.target.checked)} /> Coverage</label>
        <label><input type="checkbox" checked={showMotif} onChange={(e) => setShowMotif(e.target.checked)} /> Motif track</label>
        <label><input type="checkbox" checked={collapsedHap2} onChange={(e) => setCollapsedHap2(e.target.checked)} /> Collapse Haplotype 2 repeats</label>
      </div>
    </header>
  );
}

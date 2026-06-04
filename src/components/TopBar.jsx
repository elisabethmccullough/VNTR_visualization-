import { mockCases } from '../data/mockVntrData.js';

export default function TopBar({
  data,
  knownRegions,
  knownRegionId,
  setKnownRegionId,
  caseType,
  setCaseType,
  showCoverage,
  setShowCoverage,
  showMotif,
  setShowMotif,
  showPartialReads,
  setShowPartialReads,
  collapsedMotifs,
  setCollapsedMotifs,
}) {
  return (
    <header className="top-bar">
      <div>
        <p className="eyebrow">Prototype genome browser</p>
        <h1>VNTR Locus &amp; Haplotype Explorer</h1>
      </div>

      <div className="controls" aria-label="Visual controls">
        <label>
          Known Region
          <select value={knownRegionId} onChange={(event) => setKnownRegionId(event.target.value)}>
            {knownRegions.map((region) => <option value={region.id} key={region.id}>{region.label}</option>)}
          </select>
        </label>
        <label>
          Case type
          <select value={caseType} onChange={(event) => setCaseType(event.target.value)}>
            {Object.values(mockCases).map((caseOption) => <option value={caseOption.id} key={caseOption.id}>{caseOption.label}</option>)}
          </select>
        </label>
        <label>
          Locus
          <select value={data.region.locus} onChange={() => {}}>
            <option>{data.region.locus}</option>
          </select>
        </label>
        <label>
          Gene
          <select value={data.region.gene} onChange={() => {}}>
            <option>{data.region.gene}</option>
          </select>
        </label>
        <label>
          Motif
          <select value={data.region.motif} onChange={() => {}}>
            <option>{data.region.motif}</option>
          </select>
        </label>
        <button type="button">Center on VNTR</button>
        <button type="button">Export View</button>
      </div>

      <div className="toggles" aria-label="Track toggles">
        <label><input type="checkbox" checked={showCoverage} onChange={(e) => setShowCoverage(e.target.checked)} /> Coverage</label>
        <label><input type="checkbox" checked={showMotif} onChange={(e) => setShowMotif(e.target.checked)} /> Motif track</label>
        <label><input type="checkbox" checked={collapsedMotifs} onChange={(e) => setCollapsedMotifs(e.target.checked)} /> Collapsed motif display</label>
        <label><input type="checkbox" checked={showPartialReads} onChange={(e) => setShowPartialReads(e.target.checked)} /> Show partial / ambiguous reads</label>
      </div>
    </header>
  );
}

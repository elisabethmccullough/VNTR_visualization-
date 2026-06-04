import CoordinateRuler from './CoordinateRuler.jsx';
import HaplotypeTrack from './HaplotypeTrack.jsx';
import CoverageTrack from './CoverageTrack.jsx';
import SpanningReadsTrack from './SpanningReadsTrack.jsx';
import MotifTrack from './MotifTrack.jsx';

export default function TrackPanel({ data, selectedHaplotype, setSelectedHaplotype, showCoverage, showMotif, collapsedHap2 }) {
  const [hap1, hap2] = data.haplotypes;

  return (
    <main className="track-panel">
      <div className="browser-header">
        <div>
          <p className="eyebrow">Current locus</p>
          <h2>{data.sample.gene} VNTR · {data.sample.locus_label}</h2>
        </div>
        <button className="clear-selection" type="button" onClick={() => setSelectedHaplotype('all')}>Show all reads</button>
      </div>

      <div className="browser-surface">
        <div className="guide-lines" aria-hidden="true">
          {[0, 25, 50, 75, 100].map((left) => <span key={left} style={{ left: `${left}%` }} />)}
        </div>
        <CoordinateRuler coordinates={data.coordinates} />
        <HaplotypeTrack type="reference" data={data.reference} selectedHaplotype={selectedHaplotype} setSelectedHaplotype={setSelectedHaplotype} />
        <HaplotypeTrack data={hap1} selectedHaplotype={selectedHaplotype} setSelectedHaplotype={setSelectedHaplotype} />
        <HaplotypeTrack data={hap2} selectedHaplotype={selectedHaplotype} setSelectedHaplotype={setSelectedHaplotype} collapsed={collapsedHap2} />
        {showCoverage && <CoverageTrack coverage={data.coverage} />}
        <SpanningReadsTrack reads={data.reads} selectedHaplotype={selectedHaplotype} setSelectedHaplotype={setSelectedHaplotype} />
        {showMotif && <MotifTrack motifs={data.motifEvidence} />}
      </div>

      <div className="helper-text">
        <p>A spanning read crosses the left flank, the full VNTR, and the right flank.</p>
        <p>Coverage shows how many reads overlap a coordinate, not how many repeats are present.</p>
        <p>Motif interruptions are alternate repeat units within the VNTR.</p>
      </div>
    </main>
  );
}

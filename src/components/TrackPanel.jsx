import CoordinateRuler from './CoordinateRuler.jsx';
import HaplotypeTrack from './HaplotypeTrack.jsx';
import CoverageTrack from './CoverageTrack.jsx';
import SpanningReadsTrack from './SpanningReadsTrack.jsx';
import MotifTrack from './MotifTrack.jsx';

export default function TrackPanel({ data, selectedGroup, setSelectedGroup, showCoverage, showMotif, showPartialReads, collapsedMotifs }) {
  return (
    <main className="track-panel">
      <div className="browser-header">
        <div>
          <p className="eyebrow">Current locus</p>
          <h2>{data.region.gene} VNTR · {data.region.locus}</h2>
          <p>{data.region.knownRegion} · {data.caseData.label}</p>
        </div>
        <button className="clear-selection" type="button" onClick={() => setSelectedGroup('all')}>Expand read evidence</button>
      </div>

      <div className="alert-banner">{data.caseData.alert}</div>

      <div className="browser-scroll">
        <div className="browser-surface">
          <div className="guide-lines" aria-hidden="true">
            {[0, 25, 50, 75, 100].map((left) => <span key={left} style={{ left: `${left}%` }} />)}
          </div>
          <div className="vntr-shade" aria-hidden="true"><span>VNTR repeat region</span></div>
          <CoordinateRuler coordinates={data.coordinates} />
          <HaplotypeTrack
            type="reference"
            data={{ ...data.reference, id: 'reference', referenceGenome: data.region.referenceGenome }}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            motif={data.region.motif}
          />
          {data.caseData.observedAlleleGroups.map((group) => (
            <HaplotypeTrack
              key={group.id}
              data={group}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              collapsed={collapsedMotifs}
              motif={data.region.motif}
            />
          ))}
          {showCoverage && <CoverageTrack coverage={data.coverage} />}
          <SpanningReadsTrack
            reads={data.caseData.reads}
            alleleGroups={data.caseData.observedAlleleGroups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            showPartialReads={showPartialReads}
          />
          {showMotif && <MotifTrack motifs={data.motifEvidence} />}
        </div>
      </div>

      <div className="helper-text">
        <p>In detailed view, each block is one motif unit. In collapsed view, one labeled block may represent a run of identical motifs.</p>
        <p>CAG × 12 means twelve consecutive CAG motif units.</p>
        <p>Yellow dashed lines mark VNTR boundaries; faint gray dashed lines are coordinate guides, not variants.</p>
      </div>
    </main>
  );
}

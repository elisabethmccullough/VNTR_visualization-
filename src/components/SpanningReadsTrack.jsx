export default function SpanningReadsTrack({ reads, selectedHaplotype, setSelectedHaplotype }) {
  return (
    <section className="track reads-track">
      <div className="track-header">
        <strong>Spanning reads</strong>
        <span>A spanning read crosses the left flank, the full VNTR, and the right flank.</span>
      </div>
      <div className="reads-lane">
        <span className="vntr-boundary left" aria-hidden="true" />
        <span className="vntr-boundary right" aria-hidden="true" />
        {reads.map((read, index) => {
          const isSelected = selectedHaplotype === read.haplotype;
          const isDimmed = selectedHaplotype !== 'all' && read.haplotype !== selectedHaplotype;
          return (
            <button
              className={`read-line ${read.haplotype} ${read.status} ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}`}
              key={read.id}
              style={{ left: `${read.start}%`, width: `${read.end - read.start}%`, top: `${index * 24 + 16}px` }}
              title={`Read ID: ${read.id}\nAssigned haplotype: ${read.label}\nStatus: ${read.status}\nEstimated repeat count: ${read.repeatCount}\nMapping quality: ${read.mapq}`}
              onClick={() => read.haplotype !== 'ambiguous' && setSelectedHaplotype(read.haplotype)}
            >
              <span>{read.id}</span>
            </button>
          );
        })}
      </div>
      <p className="track-note">Repeat count is estimated from the repeat units observed in spanning reads.</p>
    </section>
  );
}

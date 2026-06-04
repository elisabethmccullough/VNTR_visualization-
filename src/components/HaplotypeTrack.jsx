const motifClass = (motif) => `motif-block motif-${motif.toLowerCase()}`;

function MotifBlocks({ units, trackName }) {
  return (
    <div className="motif-blocks expanded-blocks">
      {units.map((motif, index) => (
        <span className={motifClass(motif)} key={`${trackName}-${index}`} title={`${trackName}: motif ${motif}, unit ${index + 1}`}>
          {motif}
        </span>
      ))}
    </div>
  );
}

function CollapsedBlocks({ units, trackName }) {
  return (
    <div className="motif-blocks collapsed-blocks">
      {units.map((unit, index) => (
        <span className={motifClass(unit.motif)} key={`${unit.motif}-${index}`} title={`${trackName}: ${unit.motif}${unit.count > 1 ? ` × ${unit.count}` : ''}`}>
          {unit.count > 1 ? `${unit.motif} × ${unit.count}` : unit.motif}
        </span>
      ))}
    </div>
  );
}

export default function HaplotypeTrack({ type = 'allele', data, selectedGroup, setSelectedGroup, collapsed = false, motif }) {
  const isReference = type === 'reference';
  const isSelected = selectedGroup === data.id;
  const canClick = !isReference;
  const label = isReference
    ? `Reference ${data.referenceGenome}: ${data.repeatCount} repeats / ${data.sizeBp} bp`
    : `${data.label}: ${data.repeatCount} repeats / ${data.sizeBp} bp / ${data.status}`;

  return (
    <section
      className={`track haplotype-track ${isSelected ? 'selected' : ''} ${canClick ? 'clickable' : ''}`}
      onClick={canClick ? () => setSelectedGroup(data.id) : undefined}
      tabIndex={canClick ? 0 : undefined}
      role={canClick ? 'button' : undefined}
      onKeyDown={(event) => {
        if (canClick && (event.key === 'Enter' || event.key === ' ')) setSelectedGroup(data.id);
      }}
    >
      <div className="track-header">
        <strong>{label}</strong>
        {!isReference && <span className={`confidence ${data.confidence.toLowerCase()}`}>{data.confidence} confidence</span>}
      </div>
      <div className="sequence-row">
        <span className="flank">left flank</span>
        {collapsed && data.collapsedUnits ? (
          <CollapsedBlocks units={data.collapsedUnits} trackName={data.label} />
        ) : (
          <MotifBlocks units={data.motifUnits} trackName={isReference ? `Reference ${data.referenceGenome}` : data.label} />
        )}
        <span className="flank">right flank</span>
      </div>
      {isReference ? (
        <p className="track-note">Reference {data.referenceGenome}: [left flank] [{motif} × {data.repeatCount}] [right flank] · {data.repeatCount} repeats / {data.sizeBp} bp.</p>
      ) : (
        <p className="track-note">{data.motifPattern}. Click to highlight this allele group and its reads.</p>
      )}
    </section>
  );
}

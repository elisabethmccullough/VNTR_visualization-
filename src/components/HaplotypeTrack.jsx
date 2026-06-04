const motifClass = (motif) => `motif-block motif-${motif.toLowerCase()}`;

function MotifBlocks({ units, trackName }) {
  return (
    <div className="motif-blocks expanded-blocks">
      {units.map((motif, index) => (
        <span
          className={motifClass(motif)}
          key={`${trackName}-${index}`}
          title={`${trackName}: motif ${motif}, unit ${index + 1}`}
        >
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
        <span
          className={motifClass(unit.motif)}
          key={`${unit.motif}-${index}`}
          title={`${trackName}: ${unit.motif}${unit.count > 1 ? ` × ${unit.count}` : ''}`}
        >
          {unit.count > 1 ? `${unit.motif} × ${unit.count}` : unit.motif}
        </span>
      ))}
    </div>
  );
}

export default function HaplotypeTrack({ type = 'haplotype', data, selectedHaplotype, setSelectedHaplotype, collapsed = false }) {
  const isReference = type === 'reference';
  const isSelected = selectedHaplotype === data.id;
  const canClick = !isReference;
  const label = isReference
    ? `Reference GRCh38: ${data.repeat_count} repeats / ${data.size_bp} bp`
    : `${data.label}: ${data.repeat_count} repeats / ${data.size_bp} bp / ${data.statusShort}`;

  return (
    <section
      className={`track haplotype-track ${isSelected ? 'selected' : ''} ${canClick ? 'clickable' : ''}`}
      onClick={canClick ? () => setSelectedHaplotype(data.id) : undefined}
      tabIndex={canClick ? 0 : undefined}
      role={canClick ? 'button' : undefined}
      onKeyDown={(event) => {
        if (canClick && (event.key === 'Enter' || event.key === ' ')) setSelectedHaplotype(data.id);
      }}
    >
      <div className="track-header">
        <strong>{label}</strong>
        {!isReference && <span className={`confidence ${data.confidence.toLowerCase()}`}>{data.confidence} confidence</span>}
      </div>
      <div className="sequence-row">
        <span className="flank">left flank</span>
        {collapsed && data.collapsed_units ? (
          <CollapsedBlocks units={data.collapsed_units} trackName={data.label} />
        ) : (
          <MotifBlocks units={data.motif_units} trackName={isReference ? 'Reference GRCh38' : data.label} />
        )}
        <span className="flank">right flank</span>
      </div>
      {!isReference && <p className="track-note">{data.motif_pattern}. Click to highlight this haplotype and its reads.</p>}
    </section>
  );
}

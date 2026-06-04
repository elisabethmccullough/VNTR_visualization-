function groupLabel(group) {
  return group?.shortLabel ?? group?.label ?? 'Partial / ambiguous reads';
}

export default function SpanningReadsTrack({ reads, alleleGroups, selectedGroup, setSelectedGroup, showPartialReads }) {
  const displayedGroups = [
    ...alleleGroups.map((group) => ({ id: group.id, label: `Reads supporting ${groupLabel(group)}`, group })),
    { id: 'ambiguous', label: 'Partial / ambiguous reads', group: null },
  ];

  let readIndex = 0;

  return (
    <section className="track reads-track">
      <div className="track-header">
        <strong>Spanning read evidence</strong>
        <span>A spanning read crosses the left flank, the full VNTR, and the right flank.</span>
      </div>
      <div className="reads-lane">
        <span className="vntr-region-label">VNTR repeat region</span>
        <span className="vntr-boundary left"><b>VNTR start</b></span>
        <span className="vntr-boundary right"><b>VNTR end</b></span>
        {displayedGroups.map((readGroup) => {
          const groupReads = reads.filter((read) => read.groupId === readGroup.id);
          if (readGroup.id === 'ambiguous' && !showPartialReads) return null;
          if (groupReads.length === 0) return null;

          return (
            <div className="read-group" key={readGroup.id}>
              <div className="read-group-label" style={{ top: `${readIndex * 24 + 14}px` }}>{readGroup.label}</div>
              {groupReads.map((read) => {
                const top = readIndex * 24 + 40;
                readIndex += 1;
                const isSelected = selectedGroup === read.groupId;
                const isDimmed = selectedGroup !== 'all' && read.groupId !== selectedGroup;
                return (
                  <button
                    className={`read-line ${read.groupId} ${read.status} ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}`}
                    key={read.id}
                    style={{ left: `${read.start}%`, width: `${read.end - read.start}%`, top: `${top}px` }}
                    title={`Read ID: ${read.id}\nAssigned group: ${read.groupLabel}\nSpanning or partial: ${read.status}\nEstimated repeat count: ${read.repeatCount}\nMapping quality: ${read.mapq}`}
                    onClick={() => read.groupId !== 'ambiguous' && setSelectedGroup(read.groupId)}
                  >
                    <span>{read.id}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <p className="track-note">Repeat count is estimated from the repeat units observed in spanning reads. Partial / ambiguous reads are faded and dashed.</p>
    </section>
  );
}

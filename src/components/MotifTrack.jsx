export default function MotifTrack({ motifs }) {
  return (
    <section className="track motif-evidence-track">
      <div className="track-header">
        <strong>Motif Track: combined motif evidence</strong>
        <span>Motif interruptions are alternate repeat units within the VNTR.</span>
      </div>
      <div className="motif-evidence-row">
        {motifs.map((motif, index) => (
          <span
            className={`motif-tick motif-${motif.toLowerCase()}`}
            key={`${motif}-${index}`}
            title={`Combined motif evidence: motif ${motif}, unit ${index + 1}`}
          />
        ))}
      </div>
      <p className="track-note">This track shows which repeat motifs are present and where interruptions occur.</p>
    </section>
  );
}

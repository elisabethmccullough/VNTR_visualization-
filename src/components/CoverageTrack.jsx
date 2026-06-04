export default function CoverageTrack({ coverage }) {
  const maxCoverage = Math.max(...coverage);

  return (
    <section className="track coverage-track">
      <div className="track-header">
        <strong>Coverage / read depth, not repeat length</strong>
        <span>Mock long-read depth</span>
      </div>
      <div className="coverage-bars" aria-label="Mock coverage bar chart">
        {coverage.map((value, index) => (
          <span className="coverage-bar" key={`${value}-${index}`} style={{ height: `${(value / maxCoverage) * 100}%` }} title={`Coverage bin ${index + 1}: ${value} reads`} />
        ))}
      </div>
      <p className="track-note">Coverage shows how many reads overlap each coordinate. Repeat count is estimated from motif units observed in spanning reads.</p>
    </section>
  );
}

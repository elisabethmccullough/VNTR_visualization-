const legendItems = [
  ['CAG', 'green swatch'],
  ['CAA', 'red swatch'],
  ['CAT', 'orange swatch'],
  ['Other/unknown', 'purple swatch'],
  ['Flanking DNA', 'gray swatch'],
  ['Coverage', 'coverage-swatch'],
  ['Spanning reads', 'read-swatch'],
  ['VNTR boundaries', 'boundary-swatch'],
  ['Coordinate guides', 'guide-swatch'],
];

export default function Legend() {
  return (
    <section className="legend" aria-label="Legend">
      <h2>Legend</h2>
      <div className="legend-grid">
        {legendItems.map(([label, className]) => (
          <div className="legend-item" key={label}>
            <span className={className} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

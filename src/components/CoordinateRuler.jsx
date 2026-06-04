const formatCoordinate = (value) => value.toLocaleString('en-US');

export default function CoordinateRuler({ coordinates }) {
  return (
    <section className="track coordinate-track" aria-label="Coordinate ruler">
      <div className="track-header">
        <strong>Coordinate ruler</strong>
        <span>Coordinate guides (not variants)</span>
      </div>
      <div className="ruler-line">
        {coordinates.map((coordinate, index) => (
          <div className="coordinate-tick" style={{ left: `${index * 25}%` }} key={coordinate}>
            <span>{formatCoordinate(coordinate)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

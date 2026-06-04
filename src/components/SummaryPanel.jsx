function SummaryCard({ title, children, tone = '' }) {
  return <section className={`summary-card ${tone}`}><h2>{title}</h2>{children}</section>;
}

function FactList({ items }) {
  return (
    <dl>
      {items.map(([label, value]) => (
        <div className="fact-row" key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function SummaryPanel({ data }) {
  const [hap1, hap2] = data.haplotypes;

  return (
    <aside className="summary-panel" aria-label="Clinical-style summary panel">
      <SummaryCard title="Locus Summary">
        <FactList items={[
          ['Gene', data.sample.gene],
          ['Locus', data.sample.locus_label],
          ['Reference genome', data.sample.reference_genome],
          ['Primary motif', data.sample.primary_motif],
          ['Variant type', data.sample.variant_type],
          ['Region length', `${data.sample.region_length_bp} bp`],
          ['GC content', `${data.sample.gc_content}%`],
        ]} />
      </SummaryCard>

      <SummaryCard title="Reference">
        <FactList items={[[ 'Repeat count', `${data.reference.repeat_count} repeats` ], [ 'Size', `${data.reference.size_bp} bp` ]]} />
      </SummaryCard>

      {[hap1, hap2].map((haplotype) => (
        <SummaryCard title={haplotype.shortLabel} key={haplotype.id}>
          <FactList items={[
            ['Repeat count', `${haplotype.repeat_count} repeats`],
            ['Size', `${haplotype.size_bp} bp`],
            ['Finding', haplotype.statusShort],
            ['Supporting reads', haplotype.supporting_reads],
            ['Spanning reads', haplotype.spanning_reads],
            ['Confidence', haplotype.confidence],
          ]} />
        </SummaryCard>
      ))}

      <SummaryCard title="Clinical interpretation / warning" tone="warning-card">
        <p>
          Observed finding: Haplotype 2 is expanded relative to the reference. Larger repeat count may indicate increased expansion instability risk. Motif interruptions are present. Only 4 spanning reads support the expanded haplotype. Clinical significance is uncertain because no established threshold is available for this mock VNTR.
        </p>
        <div className="caution-tags">
          <span>Expanded allele detected</span>
          <span>Clinical threshold not established</span>
          <span>Review recommended</span>
        </div>
      </SummaryCard>
    </aside>
  );
}

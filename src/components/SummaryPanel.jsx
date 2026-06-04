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

function BulletList({ title, items }) {
  return (
    <div className="bullet-section">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default function SummaryPanel({ data }) {
  return (
    <aside className="summary-panel" aria-label="Summary answer key panel">
      <SummaryCard title="Locus Summary">
        <FactList items={[
          ['Known region', data.region.knownRegion],
          ['Gene', data.region.gene],
          ['Locus', data.region.locus],
          ['Reference genome', data.region.referenceGenome],
          ['Primary motif', data.region.motif],
          ['Variant type', data.region.variantType],
          ['Clinical threshold', data.region.clinicalThreshold],
        ]} />
      </SummaryCard>

      <SummaryCard title="Reference">
        <FactList items={[
          ['Repeat count', `${data.reference.repeatCount} repeats`],
          ['Size bp', `${data.reference.sizeBp} bp`],
        ]} />
      </SummaryCard>

      <SummaryCard title="Observed Allele Groups">
        {data.caseData.observedAlleleGroups.map((group) => (
          <div className="allele-summary" key={group.id}>
            <h3>{group.label}</h3>
            <FactList items={[
              ['Repeat count', `${group.repeatCount} repeats`],
              ['Size bp', `${group.sizeBp} bp`],
              ['Status', group.status],
              ['Supporting reads', group.supportingReads],
              ['Spanning reads', group.spanningReads],
              ['Confidence', group.confidence],
            ]} />
          </div>
        ))}
      </SummaryCard>

      <SummaryCard title="Interpretation / Warnings" tone="warning-card">
        <BulletList title="Observed finding" items={data.caseData.observedFinding} />
        <BulletList title="Caution" items={data.caseData.cautions} />
      </SummaryCard>
    </aside>
  );
}

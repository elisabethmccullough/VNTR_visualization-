import { useMemo, useState } from 'react';
import { baseVntrData, cohortRows, knownRegions, mockCases } from './data/mockVntrData.js';
import TopBar from './components/TopBar.jsx';
import TrackPanel from './components/TrackPanel.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import Legend from './components/Legend.jsx';

const tabs = [
  { id: 'overview', label: 'Individual Overview' },
  { id: 'explorer', label: 'Haplotype Explorer' },
  { id: 'cohort', label: 'Cohort / All Samples View' },
];

function DemoBadge() {
  return <div className="demo-badge">Demo data only — not for clinical use.</div>;
}

function TabNavigation({ selectedTab, setSelectedTab }) {
  return (
    <nav className="tab-nav" aria-label="Prototype sections">
      {tabs.map((tab) => (
        <button
          type="button"
          className={selectedTab === tab.id ? 'active' : ''}
          key={tab.id}
          onClick={() => setSelectedTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

function IndividualOverview({ data, setSelectedTab }) {
  const cards = [
    ['Sample', data.sample.sampleId],
    ['Specimen', data.sample.specimenType],
    ['Sequencing type', data.sample.sequencingType],
    ['Reference genome', data.region.referenceGenome],
    ['Selected known region', data.region.knownRegion],
    ['Gene', data.region.gene],
    ['Motif', data.region.motif],
    ['Reference repeat count', data.caseData.referenceRepeatCount],
    ['Observed allele groups', data.caseData.observedAlleleGroups.length],
    ['Main finding', 'expanded allele detected on Haplotype 2'],
    ['Confidence', 'Medium'],
    ['Clinical threshold', data.region.clinicalThreshold],
  ];

  return (
    <main className="simple-view overview-view">
      <div className="view-heading">
        <p className="eyebrow">Case-level summary</p>
        <h2>Individual Overview for HG001</h2>
        <p>Expanded allele detected on Haplotype 2. Clinical threshold is not established for this mock VNTR. Review recommended.</p>
      </div>
      <div className="summary-cards-grid">
        {cards.map(([label, value]) => (
          <section className="metric-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </section>
        ))}
      </div>
      <button className="primary-action" type="button" onClick={() => setSelectedTab('explorer')}>
        Open Haplotype Explorer
      </button>
    </main>
  );
}

function CohortView() {
  const maxRepeat = Math.max(...cohortRows.map((row) => row.longest));

  return (
    <main className="simple-view cohort-view">
      <div className="view-heading">
        <p className="eyebrow">Mock cohort comparison</p>
        <h2>Cohort / All Samples View</h2>
        <p>This view is for comparing repeat sizes across individuals or samples. It can help identify outliers or unusually expanded alleles.</p>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Sample</th>
              <th>Allele/Group 1</th>
              <th>Allele/Group 2</th>
              <th>Longest allele</th>
              <th>Status</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {cohortRows.map((row) => (
              <tr key={row.sample}>
                <td>{row.sample}</td>
                <td>{row.group1}</td>
                <td>{row.group2}</td>
                <td>{row.longest}</td>
                <td>{row.status}</td>
                <td>{row.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="distribution-card">
        <h3>Repeat count distribution</h3>
        {cohortRows.map((row) => (
          <div className="distribution-row" key={`${row.sample}-bar`}>
            <span>{row.sample}</span>
            <div className="bar-track"><span style={{ width: `${(row.longest / maxRepeat) * 100}%` }} /></div>
            <strong>{row.longest}</strong>
          </div>
        ))}
      </section>
    </main>
  );
}

export default function App() {
  const [selectedTab, setSelectedTab] = useState('explorer');
  const [knownRegionId, setKnownRegionId] = useState('acan-demo');
  const [caseType, setCaseType] = useState('standard');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [showCoverage, setShowCoverage] = useState(true);
  const [showMotif, setShowMotif] = useState(true);
  const [showPartialReads, setShowPartialReads] = useState(true);
  const [collapsedMotifs, setCollapsedMotifs] = useState(true);

  const data = useMemo(() => {
    const region = knownRegions.find((item) => item.id === knownRegionId) ?? knownRegions[0];
    const caseData = mockCases[caseType] ?? mockCases.standard;

    return {
      ...baseVntrData,
      region,
      caseData,
      reference: {
        repeatCount: caseData.referenceRepeatCount,
        sizeBp: caseData.referenceSizeBp,
        motifUnits: Array(caseData.referenceRepeatCount).fill(region.motif),
      },
    };
  }, [knownRegionId, caseType]);

  return (
    <div className="app-shell">
      <DemoBadge />
      <TopBar
        data={data}
        knownRegions={knownRegions}
        knownRegionId={knownRegionId}
        setKnownRegionId={setKnownRegionId}
        caseType={caseType}
        setCaseType={(value) => { setCaseType(value); setSelectedGroup('all'); }}
        showCoverage={showCoverage}
        setShowCoverage={setShowCoverage}
        showMotif={showMotif}
        setShowMotif={setShowMotif}
        showPartialReads={showPartialReads}
        setShowPartialReads={setShowPartialReads}
        collapsedMotifs={collapsedMotifs}
        setCollapsedMotifs={setCollapsedMotifs}
      />
      <TabNavigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === 'overview' && <IndividualOverview data={data} setSelectedTab={setSelectedTab} />}
      {selectedTab === 'explorer' && (
        <div className="content-grid">
          <div className="left-column">
            <TrackPanel
              data={data}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              showCoverage={showCoverage}
              showMotif={showMotif}
              showPartialReads={showPartialReads}
              collapsedMotifs={collapsedMotifs}
            />
            <Legend />
          </div>
          <SummaryPanel data={data} />
        </div>
      )}
      {selectedTab === 'cohort' && <CohortView />}
    </div>
  );
}

import { useState } from 'react';
import { vntrData } from './data/mockVntrData.js';
import TopBar from './components/TopBar.jsx';
import TrackPanel from './components/TrackPanel.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import Legend from './components/Legend.jsx';

export default function App() {
  const [selectedHaplotype, setSelectedHaplotype] = useState('all');
  const [showCoverage, setShowCoverage] = useState(true);
  const [showMotif, setShowMotif] = useState(true);
  const [collapsedHap2, setCollapsedHap2] = useState(true);

  return (
    <div className="app-shell">
      <TopBar
        sample={vntrData.sample}
        showCoverage={showCoverage}
        setShowCoverage={setShowCoverage}
        showMotif={showMotif}
        setShowMotif={setShowMotif}
        collapsedHap2={collapsedHap2}
        setCollapsedHap2={setCollapsedHap2}
      />

      <div className="content-grid">
        <div>
          <TrackPanel
            data={vntrData}
            selectedHaplotype={selectedHaplotype}
            setSelectedHaplotype={setSelectedHaplotype}
            showCoverage={showCoverage}
            showMotif={showMotif}
            collapsedHap2={collapsedHap2}
          />
          <Legend />
        </div>
        <SummaryPanel data={vntrData} />
      </div>
    </div>
  );
}

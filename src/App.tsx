import React from 'react';
import TopBar from './components/TopBar';
import MainDashboard from './components/MainDashboard';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="main-layout">
        <TopBar />
        
        <main className="main-content">
          <div className="content-wrapper">
            <MainDashboard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import { Activity } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="brand-section">
        <div className="logo-icon">
          <Activity size={22} strokeWidth={2.5} />
        </div>
        <div className="brand-info">
          <h1 className="brand-name">NeuroScan</h1>
          <p className="brand-tagline">Medical Imaging Analytics</p>
        </div>
      </div>

      <style>{`
        .topbar {
          height: 64px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          padding: 0 48px;
          background: var(--bg-surface);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .brand-section {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        
        .logo-icon {
          width: 36px;
          height: 36px;
          background: var(--accent-primary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .brand-info {
          display: flex;
          flex-direction: column;
        }
        
        .brand-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        
        .brand-tagline {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0;
          font-weight: 500;
        }
      `}</style>
    </header>
  );
};

export default TopBar;

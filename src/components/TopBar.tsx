import React from 'react';
import { Bell, Activity } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="brand-section">
        <div className="logo-icon">
          <Activity size={24} />
        </div>
        <div className="brand-info">
          <h1 className="brand-name">NeuroScan <span className="brand-suffix">Pro</span></h1>
          <p className="brand-tagline">Advanced Diagnostic Analytics</p>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="action-button">
          <Bell size={20} />
          <span className="badge-dot"></span>
        </button>
        
        <div className="system-status">
          <span className="status-indicator online"></span>
          <span className="status-text">System Active</span>
        </div>
      </div>

      <style>{`
        .topbar {
          height: 72px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          background: var(--bg-surface);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .brand-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(var(--accent-primary-rgb), 0.2);
        }
        
        .brand-info {
          display: flex;
          flex-direction: column;
        }
        
        .brand-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.2;
        }
        
        .brand-suffix {
          color: var(--accent-primary);
          font-weight: 400;
        }
        
        .brand-tagline {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }
        
        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        
        .action-button {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        
        .action-button:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }
        
        .badge-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid var(--bg-surface);
        }
        
        .system-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: var(--bg-subtle);
          border-radius: 20px;
          border: 1px solid var(--border-color);
        }
        
        .status-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        
        .status-indicator.online {
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
        }
        
        .status-text {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
      `}</style>
    </header>
  );
};

export default TopBar;

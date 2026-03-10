import React, { useState } from 'react';
import { Upload, Download, CheckCircle2, AlertCircle, Scan, Loader2, Maximize2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MainDashboard: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    setTimeout(() => {
      setAnalysisResult({
        id: "NS-" + Math.floor(100000 + Math.random() * 900000),
        patientId: "PAT-0042",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        confidence: 94.7,
        classes: [
          { name: 'Glioma', value: 88, color: 'var(--accent-danger)' },
          { name: 'Meningioma', value: 12, color: 'var(--accent-primary)' },
          { name: 'Pituitary', value: 5, color: 'var(--accent-secondary)' },
          { name: 'No Abnormalities', value: 2, color: 'var(--accent-success)' }
        ],
        stats: [
          { label: 'Model Accuracy', value: '98.2%', icon: CheckCircle2 },
          { label: 'Diagnostic Reliability', value: 'High', icon: AlertCircle },
          { label: 'Latency', value: '1.2s', icon: Scan }
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateAnalysis();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateAnalysis();
    }
  };

  const downloadReport = async () => {
    const element = document.getElementById('dashboard-results');
    if (!element) return;
    
    const canvas = await html2canvas(element, {
      backgroundColor: '#020617',
      scale: 2,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`NeuroScan_Report_${analysisResult?.id}.pdf`);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div>
          <h2 className="section-title">Diagnostic Workspace</h2>
          <p className="section-subtitle">Real-time Neural Imaging Pipeline</p>
        </div>
        <div className="header-actions">
          <button className="secondary-btn" onClick={() => setAnalysisResult(null)} disabled={!analysisResult}>
            <Scan size={18} />
            New Analysis
          </button>
          <button className="primary-btn" onClick={downloadReport} disabled={!analysisResult}>
            <Download size={18} />
            Export DICOM Report
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!analysisResult && !isAnalyzing ? (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              id="file-upload" 
              className="hidden-input" 
              onChange={handleFileChange}
              accept="image/*"
            />
            <label htmlFor="file-upload" className="upload-label">
              <div className="upload-visual">
                <div className="upload-circle">
                  <Upload className="upload-icon" size={32} />
                </div>
                <div className="upload-pulse"></div>
              </div>
              <div className="upload-text">
                <h3>Initial Image Upload</h3>
                <p>Drag MRI sequence here or <span className="text-highlight">browse local files</span></p>
                <div className="format-badges">
                  <span className="format-badge">DICOM</span>
                  <span className="format-badge">NIfTI</span>
                  <span className="format-badge">PNG/JPG</span>
                </div>
              </div>
            </label>
          </motion.div>
        ) : isAnalyzing ? (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-container"
          >
            <div className="loading-visual">
              <Loader2 className="spinner" size={64} />
              <div className="scanning-line"></div>
            </div>
            <h3>Processing Neural Data</h3>
            <p>Executing multi-axial segmentation and volume analysis...</p>
            <div className="progress-track">
              <motion.div 
                className="progress-fill"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            id="dashboard-results"
            className="results-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Project Info Header */}
            <div className="results-info-banner glass-card">
              <div className="info-item">
                <span className="info-label">Case ID</span>
                <span className="info-value">#{analysisResult.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Analysis Date</span>
                <span className="info-value">{analysisResult.date}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="badge badge-primary">Finalized</span>
              </div>
            </div>

            <div className="main-grid">
              {/* Left Column: Visuals */}
              <div className="visuals-column">
                <div className="mri-analysis-card glass-card">
                  <div className="card-header">
                    <h4>Multi-Spectral Visualization</h4>
                    <button className="icon-btn"><Maximize2 size={16} /></button>
                  </div>
                  <div className="mri-viewer">
                    <div className="mri-frame">
                      <img src="/mri_scan.png" alt="Source" className="mri-image" />
                      <div className="mri-label">Axial T1w Pre-contrast</div>
                    </div>
                    <div className="mri-frame highlight">
                      <img src="/mri_heatmap.png" alt="Heatmap" className="mri-image" />
                      <div className="mri-label">Grad-CAM Activation Map</div>
                    </div>
                  </div>
                </div>

                <div className="stats-strip">
                  {analysisResult.stats.map((stat: any, idx: number) => (
                    <div key={idx} className="stat-pill glass-card">
                      <div className="stat-icon-box">
                        <stat.icon size={18} />
                      </div>
                      <div className="stat-content">
                        <span className="stat-label">{stat.label}</span>
                        <span className="stat-value">{stat.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Metrics */}
              <div className="metrics-column">
                <div className="confidence-meter-card glass-card">
                  <div className="card-header">
                    <h4>Detection Score</h4>
                    <FileText size={16} className="text-muted" />
                  </div>
                  <div className="gauge-container">
                    <div className="gauge-center">
                      <span className="gauge-number">{analysisResult.confidence}%</span>
                      <span className="gauge-label">Confidence</span>
                    </div>
                    <svg viewBox="0 0 100 100" className="gauge-svg">
                      <circle cx="50" cy="50" r="45" className="gauge-ring-bg" />
                      <motion.circle 
                        cx="50" cy="50" r="45" 
                        className="gauge-ring-fill"
                        initial={{ strokeDasharray: "0 283" }}
                        animate={{ strokeDasharray: `${(analysisResult.confidence / 100) * 283} 283` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                      />
                    </svg>
                  </div>
                </div>

                <div className="classification-card glass-card">
                  <div className="card-header">
                    <h4>Probability Distribution</h4>
                    <span className="badge badge-primary">Model V4.2</span>
                  </div>
                  <div className="class-list">
                    {analysisResult.classes.map((cls: any, idx: number) => (
                      <div key={idx} className="class-row">
                        <div className="class-header">
                          <span className="class-title">{cls.name}</span>
                          <span className="class-val">{cls.value}%</span>
                        </div>
                        <div className="class-progress-bg">
                          <motion.div 
                            className="class-progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${cls.value}%` }}
                            style={{ backgroundColor: cls.color }}
                            transition={{ delay: 0.3 + idx * 0.1, duration: 1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .dashboard-wrapper {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .section-title {
          font-size: 1.875rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .section-subtitle {
          color: var(--text-secondary);
          font-size: 0.9375rem;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .primary-btn, .secondary-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .primary-btn {
          background: var(--accent-primary);
          border: none;
          color: white;
          box-shadow: 0 4px 14px rgba(var(--accent-primary-rgb), 0.3);
        }

        .primary-btn:hover:not(:disabled) {
          background: #4f46e5;
          transform: translateY(-1px);
        }

        .secondary-btn {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .secondary-btn:hover:not(:disabled) {
          background: var(--bg-subtle);
        }

        .primary-btn:disabled, .secondary-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Upload Zone */
        .upload-zone {
          min-height: 480px;
          background: rgba(var(--accent-primary-rgb), 0.02);
          border: 2px dashed var(--border-color);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .upload-zone:hover, .upload-zone.drag-active {
          border-color: var(--accent-primary);
          background: rgba(var(--accent-primary-rgb), 0.05);
        }

        .upload-visual {
          position: relative;
          margin-bottom: 24px;
        }

        .upload-circle {
          width: 80px;
          height: 80px;
          background: var(--bg-surface);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          border: 1px solid var(--border-color);
          z-index: 2;
          position: relative;
        }

        .upload-pulse {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          border: 1px solid rgba(var(--accent-primary-rgb), 0.2);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }

        .upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
        }

        .upload-text h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .upload-text p {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .text-highlight {
          color: var(--accent-primary);
          font-weight: 600;
        }

        .format-badges {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .format-badge {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--text-muted);
          background: var(--bg-subtle);
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
        }

        /* Loading State */
        .loading-container {
          min-height: 480px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .loading-visual {
          position: relative;
          margin-bottom: 32px;
        }

        .spinner {
          color: var(--accent-primary);
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .scanning-line {
          position: absolute;
          top: 0;
          left: -20px;
          width: 104px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
          animation: scan 2s ease-in-out infinite;
        }

        @keyframes scan {
          0% { top: 0; }
          100% { top: 64px; }
        }

        .progress-track {
          width: 320px;
          height: 6px;
          background: var(--bg-subtle);
          border-radius: 10px;
          margin-top: 24px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent-primary);
          box-shadow: 0 0 12px rgba(var(--accent-primary-rgb), 0.5);
        }

        /* Results Display */
        .results-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .results-info-banner {
          display: flex;
          gap: 48px;
          padding: 16px 32px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-label {
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          font-weight: 700;
        }

        .info-value {
          font-weight: 600;
          font-size: 0.9375rem;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
        }

        .visuals-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .card-header h4 {
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .mri-viewer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .mri-frame {
          position: relative;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border-color);
        }

        .mri-frame.highlight {
          border-color: rgba(var(--accent-primary-rgb), 0.3);
        }

        .mri-image {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
        }

        .mri-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px 12px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .stats-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
        }

        .stat-icon-box {
          width: 36px;
          height: 36px;
          background: var(--bg-subtle);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .stat-value {
          font-weight: 700;
          font-size: 1rem;
        }

        /* Metrics Column */
        .metrics-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .gauge-container {
          position: relative;
          display: flex;
          justify-content: center;
          padding: 10px 0;
        }

        .gauge-center {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .gauge-number {
          font-size: 2.5rem;
          font-weight: 800;
          font-family: var(--font-display);
        }

        .gauge-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .gauge-svg {
          width: 180px;
          height: 180px;
          transform: rotate(-90deg);
        }

        .gauge-ring-bg {
          fill: none;
          stroke: var(--bg-subtle);
          stroke-width: 8;
        }

        .gauge-ring-fill {
          fill: none;
          stroke: var(--accent-primary);
          stroke-width: 8;
          stroke-linecap: round;
        }

        .class-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .class-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .class-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .class-title {
          font-weight: 600;
        }

        .class-val {
          color: var(--text-secondary);
        }

        .class-progress-bg {
          height: 6px;
          background: var(--bg-subtle);
          border-radius: 3px;
          overflow: hidden;
        }

        .class-progress-fill {
          height: 100%;
          border-radius: 3px;
        }

        .icon-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }

        .icon-btn:hover {
          background: var(--bg-subtle);
          color: var(--text-primary);
        }

        .hidden-input { display: none; }
      `}</style>
    </div>
  );
};

export default MainDashboard;

# 🧠 NeuroScan AI - Brain Tumor Detection Dashboard

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

NeuroScan AI is a state-of-the-art diagnostic workspace designed for neuro-radiologists and medical professionals. This dashboard leverages advanced neural imaging pipelines to provide real-time automated detection and analysis of brain tumors from MRI sequences.

## ✨ Key Features

### 🔍 Advanced Diagnostic Workspace
- **MRI Visualization**: View uploaded axial MRI scans with automated tumor classification.
- **Drag-and-Drop Pipeline**: Seamlessly upload DICOM, NIfTI, and standard image formats for immediate processing.

### 📊 Real-Time Analytics
- **Detection Confidence**: High-precision confidence scoring (98.2% model accuracy).
- **Probability Distribution**: Multi-class classification for Glioma, Meningioma, and Pituitary tumors.
- **Performance Metrics**: Diagnostic reliability checks and latency monitoring.

### 📄 Clinical Reporting
- **PDF Export**: Generate professional DICOM reports instantly using `jsPDF` and `html2canvas`.
- **Case Management**: Unique Case ID generation for audit trails and patient tracking.

### 🎨 Premium User Experience
- **Glassmorphic UI**: A modern, sleek dark theme built with CSS variables.
- **Fluid Animations**: Smooth transitions and interactive elements powered by `Framer Motion`.
- **Responsive Layout**: Designed for high-resolution medical displays.

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/), [Python 3.9+](https://www.python.org/)
- **AI/ML**: [TensorFlow/Keras](https://www.tensorflow.org/), [OpenCV](https://opencv.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Reporting**: [jsPDF](https://github.com/parallax/jsPDF), [html2canvas](https://html2canvas.hertzen.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.9 or higher
- npm or yarn

### Installation & Setup

#### 1. Model weights
Place your trained Keras model at `Model/brain_tumor_model.h5` (not tracked in git due to size).

#### 2. Backend Setup
The backend handles image processing and AI model inference.
```bash
cd backend
chmod +x start.sh
./start.sh
```
*The backend will run on [http://localhost:8000](http://localhost:8000).*

#### 3. Frontend Setup
In a new terminal window:
```bash
npm install
npm run dev
```
*The frontend will run on [http://localhost:5173](http://localhost:5173).*

> [!IMPORTANT]
> The **FastAPI backend must be running** for the analysis features to work. Check the connection indicator in the dashboard header to ensure the backend is online.

## 🗺️ Future Roadmap

- [ ] Direct DICOM metadata extraction and viewing.
- [ ] Integration with cloud-based inference models.
- [ ] Patient longitudinal history and trend analysis.
- [ ] Multi-axial (Sagittal/Coronal) reconstruction viewing.

---

*Note: This application is a diagnostic aid and intended for educational/demonstration purposes in clinical research settings.*

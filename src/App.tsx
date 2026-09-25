/**
 * PlantDoc AI - Plant Disease Detection Using Machine Learning
 * Full-Stack Flask + TensorFlow Project & Interactive Testing Studio
 */

import React, { useState } from 'react';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Scanner } from './components/Scanner';
import { RepoExplorer } from './components/RepoExplorer';
import { DiseaseCatalog } from './components/DiseaseCatalog';
import { ArchitectureView } from './components/ArchitectureView';
import { PROJECT_FILES } from './data/plantData';
import { Leaf, Download, CheckCircle, Github, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'repo' | 'diseases' | 'architecture'>('scanner');
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<boolean>(false);

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Bundle all project files into their exact paths
      PROJECT_FILES.forEach((file) => {
        zip.file(file.path, file.code);
      });

      // Include .gitkeep in uploads folder
      zip.file('static/uploads/.gitkeep', '');

      // Generate the binary zip archive
      const content = await zip.generateAsync({ type: 'blob' });

      // Create download anchor and trigger download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'plant-disease-detection-flask-ml.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      // Trigger celebration
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });

      setDownloadSuccessToast(true);
      setTimeout(() => setDownloadSuccessToast(false), 4500);
    } catch (err) {
      console.error('Failed to bundle zip:', err);
      alert('Error creating zip bundle. Please copy the files directly from the Project Repository tab.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadZip={handleDownloadZip}
        isZipping={isZipping}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'scanner' && <Scanner />}
        {activeTab === 'repo' && (
          <RepoExplorer
            onDownloadZip={handleDownloadZip}
            isZipping={isZipping}
          />
        )}
        {activeTab === 'diseases' && <DiseaseCatalog />}
        {activeTab === 'architecture' && <ArchitectureView />}
      </main>

      {/* Download Success Floating Toast */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-700/60 flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-sm">Download Started!</div>
            <div className="text-emerald-200">plant-disease-detection-flask-ml.zip is ready.</div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white tracking-tight">PlantDoc.AI</span>
            <span className="text-slate-600">&middot;</span>
            <span>MobileNetV2 Deep Learning Plant Pathology</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('repo')}
              className="hover:text-emerald-400 transition-colors"
            >
              Source Code (Flask)
            </button>
            <span>&middot;</span>
            <button
              onClick={() => setActiveTab('architecture')}
              className="hover:text-emerald-400 transition-colors"
            >
              Model Architecture
            </button>
            <span>&middot;</span>
            <button
              onClick={handleDownloadZip}
              className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold"
            >
              Download .ZIP
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

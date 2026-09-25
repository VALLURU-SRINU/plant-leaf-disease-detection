import React from 'react';
import { Leaf, Code2, BookOpen, Cpu, Download, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'scanner' | 'repo' | 'diseases' | 'architecture';
  setActiveTab: (tab: 'scanner' | 'repo' | 'diseases' | 'architecture') => void;
  onDownloadZip: () => void;
  isZipping?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onDownloadZip,
  isZipping = false
}) => {
  return (
    <header className="sticky top-0 z-40 bg-emerald-950 text-white border-b border-emerald-900/60 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-inner">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">PlantDoc<span className="text-emerald-400">.AI</span></span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80 bg-emerald-900/70 border border-emerald-700/50 px-1.5 py-0.5 rounded">
                  Flask + ML
                </span>
              </div>
              <p className="text-xs text-emerald-300/70 hidden sm:block">Deep Learning Foliar Pathology</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'scanner'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Live Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('repo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'repo'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
              }`}
            >
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Project Repository</span>
            </button>

            <button
              onClick={() => setActiveTab('diseases')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors hidden md:flex ${
                activeTab === 'diseases'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>Diseases (25)</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors hidden lg:flex ${
                activeTab === 'architecture'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Architecture</span>
            </button>
          </nav>

          {/* Action Button: Download .ZIP */}
          <div className="flex items-center gap-2">
            <button
              onClick={onDownloadZip}
              disabled={isZipping}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50"
              title="Download entire Python & Flask project as a .zip file"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{isZipping ? 'Bundling...' : 'Download .ZIP'}</span>
              <span className="sm:hidden">.ZIP</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

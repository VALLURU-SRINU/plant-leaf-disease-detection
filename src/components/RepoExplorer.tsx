import React, { useState } from 'react';
import {
  FileCode,
  FolderTree,
  Copy,
  Check,
  Download,
  Terminal,
  FileText,
  FileCheck,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { PROJECT_FILES } from '../data/plantData';

interface RepoExplorerProps {
  onDownloadZip: () => void;
  isZipping?: boolean;
}

export const RepoExplorer: React.FC<RepoExplorerProps> = ({
  onDownloadZip,
  isZipping = false
}) => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>('app.py');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const currentFile =
    PROJECT_FILES.find((f) => f.path === selectedFilePath) || PROJECT_FILES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySnippet = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // Group files into root, templates, static
  const rootFiles = PROJECT_FILES.filter((f) => !f.path.includes('/'));
  const templateFiles = PROJECT_FILES.filter((f) => f.path.startsWith('templates/'));
  const staticFiles = PROJECT_FILES.filter((f) => f.path.startsWith('static/'));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <FolderTree className="w-4 h-4" />
              <span>Full Project Source Tree &middot; Ready for GitHub</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Python + Flask + TensorFlow ML Architecture
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Inspect the exact production source code for every file. All files are generated and ready to run locally or push directly to your GitHub repository.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={onDownloadZip}
              disabled={isZipping}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'Generating ZIP...' : 'Download Full Project (.ZIP)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Setup Commands Bar */}
      <div className="bg-slate-950 rounded-2xl p-4 sm:p-5 border border-slate-800 text-slate-200">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Terminal Quickstart: Clone, Install &amp; Run</span>
          </div>
          <button
            onClick={() =>
              handleCopySnippet(
                `git clone https://github.com/your-username/plant-disease-detection.git\ncd plant-disease-detection\npython3 -m venv venv\nsource venv/bin/activate\npip install -r requirements.txt\npython app.py`,
                'all-commands'
              )
            }
            className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
          >
            {copiedSnippet === 'all-commands' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy 1-Liner</span>
              </>
            )}
          </button>
        </div>

        <div className="font-mono text-xs text-emerald-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 overflow-x-auto space-y-1">
          <div className="text-slate-500"># 1. Create virtual environment &amp; install dependencies</div>
          <div>python3 -m venv venv &amp;&amp; source venv/bin/activate</div>
          <div>pip install -r requirements.txt</div>
          <div className="text-slate-500 pt-1"># 2. Launch Flask server on http://localhost:5000</div>
          <div className="text-amber-300">python app.py</div>
        </div>
      </div>

      {/* Main File Explorer & Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Tree Navigator (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between px-2 pt-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Project Structure
            </h2>
            <span className="text-[11px] text-slate-400 font-medium">
              {PROJECT_FILES.length} files
            </span>
          </div>

          <div className="space-y-1">
            {/* Root Files */}
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Root Directory
            </div>
            {rootFiles.map((file) => (
              <button
                key={file.path}
                onClick={() => setSelectedFilePath(file.path)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedFilePath === file.path
                    ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode
                    className={`w-4 h-4 shrink-0 ${
                      file.path.endsWith('.py')
                        ? 'text-blue-600'
                        : file.path.endsWith('.txt')
                        ? 'text-amber-600'
                        : 'text-slate-500'
                    }`}
                  />
                  <span className="truncate">{file.path}</span>
                </div>
                {selectedFilePath === file.path && (
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                )}
              </button>
            ))}

            {/* Templates Directory */}
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-3 pb-1">
              templates/
            </div>
            {templateFiles.map((file) => (
              <button
                key={file.path}
                onClick={() => setSelectedFilePath(file.path)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedFilePath === file.path
                    ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 truncate pl-2">
                  <FileText className="w-4 h-4 text-orange-600 shrink-0" />
                  <span className="truncate">{file.path.replace('templates/', '')}</span>
                </div>
                {selectedFilePath === file.path && (
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                )}
              </button>
            ))}

            {/* Static Directory */}
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-3 pb-1">
              static/
            </div>
            {staticFiles.map((file) => (
              <button
                key={file.path}
                onClick={() => setSelectedFilePath(file.path)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedFilePath === file.path
                    ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 truncate pl-2">
                  <FileCode className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="truncate">{file.path.replace('static/', '')}</span>
                </div>
                {selectedFilePath === file.path && (
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                )}
              </button>
            ))}
          </div>

          {/* Git Push Reminder Box */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 mt-4">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Push to GitHub in 3 steps:</span>
            </div>
            <ol className="list-decimal list-inside text-slate-600 space-y-1 text-[11px]">
              <li>Click <strong>Download .ZIP</strong> above</li>
              <li>Extract files into your local directory</li>
              <li>Run <code className="text-emerald-700 font-mono">git init &amp;&amp; git push</code></li>
            </ol>
          </div>
        </div>

        {/* Right Code Viewer (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          
          {/* File Tab Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-white font-mono text-xs font-bold">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>{currentFile.path}</span>
                <span className="text-slate-500 font-normal">
                  ({currentFile.code.split('\n').length} lines)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {currentFile.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                title="Copy entire file contents"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Syntax Highlighted Code Viewer with Line Numbers */}
          <div className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto text-xs font-mono leading-relaxed">
            <table className="w-full border-collapse">
              <tbody>
                {currentFile.code.split('\n').map((line, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                    <td className="w-10 select-none text-right pr-4 text-slate-600 font-mono text-[11px] align-top">
                      {idx + 1}
                    </td>
                    <td className="text-slate-300 font-mono whitespace-pre break-normal">
                      {line}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="bg-slate-900/60 border-t border-slate-800/80 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Language: {currentFile.language}</span>
            <span>Character Count: {currentFile.code.length.toLocaleString()}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

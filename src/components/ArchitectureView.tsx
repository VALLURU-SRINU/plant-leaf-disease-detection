import React, { useState } from 'react';
import { Cpu, Layers, Zap, Database, ArrowRight, Code, Copy, Check, Terminal } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const curlExample = `curl -X POST \\
  -F "file=@tomato_leaf.jpg" \\
  http://localhost:5000/api/predict`;

  const jsonResponseExample = `{
  "success": true,
  "inference_time_ms": 34.2,
  "prediction": {
    "crop": "Tomato",
    "disease": "Early Blight",
    "class_key": "Tomato___Early_blight",
    "confidence": 97.45,
    "severity": "Moderate",
    "pathogen": "Alternaria solani",
    "is_healthy": false,
    "organic_treatment": "Bacillus subtilis bio-fungicide (Serenade)...",
    "chemical_treatment": "Chlorothalonil or Azoxystrobin...",
    "prevention": "Prune bottom 12 inches of suckers; mulch beds...",
    "top_candidates": [
      { "crop": "Tomato", "disease": "Early Blight", "confidence": 97.45 },
      { "crop": "Tomato", "disease": "Target Spot", "confidence": 1.82 },
      { "crop": "Tomato", "disease": "Septoria Leaf Spot", "confidence": 0.73 }
    ]
  }
}`;

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4" />
            <span>Deep Learning System Specifications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            MobileNetV2 Neural Architecture &amp; Pipeline
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            Detailed breakdown of inverted residual bottlenecks, depthwise separable convolutions, transfer learning adaptations, and edge deployment benchmarks.
          </p>
        </div>
      </div>

      {/* Architecture Stages Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
            1
          </div>
          <h2 className="text-sm font-bold text-slate-900">Input Standardization</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            224 &times; 224 &times; 3 tensor. Normalized to [-1, 1] range to match ImageNet mean and variance.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">
            2
          </div>
          <h2 className="text-sm font-bold text-slate-900">MobileNetV2 Backbone</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            53-layer deep architecture with 19 inverted residual bottleneck blocks. Trainable weights frozen.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
            3
          </div>
          <h2 className="text-sm font-bold text-slate-900">Dense Head &amp; Regularization</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            GlobalAveragePooling2D + BatchNorm + Dense(256, ReLU) + Dropout(0.35) to prevent foliar overfitting.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">
            4
          </div>
          <h2 className="text-sm font-bold text-slate-900">Softmax Inference</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            25-class probability vector producing diagnostic certainty score and ranked alternative hypotheses.
          </p>
        </div>
      </div>

      {/* Model Benchmark Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <h2 className="text-base font-bold text-slate-900 mb-1">
          Architecture Efficiency Comparison
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Why MobileNetV2 was chosen over standard ResNet-50 and VGG-16 for agricultural field deployment.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Architecture</th>
                <th className="p-3">Parameters</th>
                <th className="p-3">Model Size</th>
                <th className="p-3">Inference Latency (CPU)</th>
                <th className="p-3">Validation Top-1 Acc.</th>
                <th className="p-3">Edge / Drone Ready</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-emerald-50/50 font-semibold text-emerald-950">
                <td className="p-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  MobileNetV2 (Selected)
                </td>
                <td className="p-3">3.5 Million</td>
                <td className="p-3">~14 MB</td>
                <td className="p-3 text-emerald-800 font-bold">&lt; 40 ms</td>
                <td className="p-3 text-emerald-800 font-bold">96.4%</td>
                <td className="p-3 text-emerald-800 font-bold">Optimal</td>
              </tr>
              <tr className="text-slate-600">
                <td className="p-3">ResNet-50</td>
                <td className="p-3">25.6 Million</td>
                <td className="p-3">~98 MB</td>
                <td className="p-3">~130 ms</td>
                <td className="p-3">97.1%</td>
                <td className="p-3">Heavy</td>
              </tr>
              <tr className="text-slate-600">
                <td className="p-3">VGG-16</td>
                <td className="p-3">138 Million</td>
                <td className="p-3">~528 MB</td>
                <td className="p-3">&gt; 350 ms</td>
                <td className="p-3">95.8%</td>
                <td className="p-3">Not Viable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* REST API Endpoints Specification */}
      <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 shadow-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <span>Flask RESTful API Documentation</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              POST multipart/form-data to <code className="text-emerald-400 font-mono">/api/predict</code>
            </p>
          </div>
        </div>

        {/* cURL Example */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>cURL Command</span>
            <button
              onClick={() => handleCopy(curlExample, 'curl')}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              {copied === 'curl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === 'curl' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
            {curlExample}
          </pre>
        </div>

        {/* JSON Response Example */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>JSON Output Response (HTTP 200)</span>
            <button
              onClick={() => handleCopy(jsonResponseExample, 'json')}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              {copied === 'json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === 'json' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-72">
            {jsonResponseExample}
          </pre>
        </div>
      </div>
    </div>
  );
};

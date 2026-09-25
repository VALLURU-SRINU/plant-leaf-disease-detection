import React, { useState } from 'react';
import { Search, Filter, Leaf, ShieldAlert, CheckCircle2, Bug, Dna, Info } from 'lucide-react';
import { DISEASE_DATABASE, DiseaseInfo } from '../data/plantData';

export const DiseaseCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedPathogen, setSelectedPathogen] = useState<string>('All');

  const diseasesList: DiseaseInfo[] = Object.values(DISEASE_DATABASE);

  // Extract unique crops & pathogen types
  const crops = ['All', ...Array.from(new Set(diseasesList.map((d) => d.crop)))];
  const pathogens = ['All', 'Fungus', 'Bacterium', 'Virus', 'Pest', 'Healthy'];

  const filteredDiseases = diseasesList.filter((d) => {
    const matchesCrop = selectedCrop === 'All' || d.crop === selectedCrop;
    const matchesPathogen = selectedPathogen === 'All' || d.pathogenType === selectedPathogen;
    const matchesSearch =
      d.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.pathogen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.symptoms.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesPathogen && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-emerald-900">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <Leaf className="w-4 h-4" />
            <span>Foliar Disease Knowledge Base &middot; 25 Supported Taxa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Agricultural Disease Encyclopedia
          </h1>
          <p className="text-emerald-200/80 text-xs sm:text-sm mt-1 leading-relaxed">
            Detailed pathology guides for each classification category trained in the MobileNetV2 deep learning model. Filter by crop species or pathogen type.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by disease, pathogen, or symptoms..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Crop Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-500 font-semibold mr-1">Crop:</span>
          {crops.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedCrop === crop
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDiseases.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Clean metadata line */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                <span className="text-emerald-800 font-bold">{d.crop}</span>
                <span aria-hidden="true" className="text-slate-300">&middot;</span>
                <span>{d.pathogenType}</span>
                <span aria-hidden="true" className="text-slate-300">&middot;</span>
                <span className={d.isHealthy ? 'text-emerald-700' : 'text-amber-700'}>
                  {d.severity}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 mb-1">
                {d.disease}
              </h2>
              <div className="text-xs text-slate-500 font-mono mb-3">
                {d.pathogen}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {d.symptoms}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="text-emerald-900 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100/80">
                <strong className="block text-[11px] uppercase tracking-wider text-emerald-800 mb-0.5">
                  Treatment
                </strong>
                <span className="text-slate-700 line-clamp-2">{d.organicTreatment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
          No plant diseases matched your search criteria.
        </div>
      )}
    </div>
  );
};

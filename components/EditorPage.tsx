
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Layers, 
  Type as TypeIcon, 
  Image as ImageIcon, 
  Square, 
  MousePointer2, 
  Undo2, 
  Redo2, 
  Share2, 
  Download,
  Loader2,
  Trash2,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { DesignCanvas, DesignElement } from '../types';
import { generateDesignFromPrompt } from '../services/geminiService';

interface EditorPageProps {
  onExit: () => void;
}

const EditorPage: React.FC<EditorPageProps> = ({ onExit }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeCanvas, setActiveCanvas] = useState<DesignCanvas | null>(null);
  const [variations, setVariations] = useState<DesignCanvas[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    const results = await generateDesignFromPrompt(prompt);
    setVariations(results);
    if (results.length > 0) {
      setActiveCanvas(results[0]);
    }
    setIsGenerating(false);
  };

  const handleSelectVariation = (canvas: DesignCanvas) => {
    setActiveCanvas(canvas);
    setSelectedId(null);
  };

  const deleteElement = (id: string) => {
    if (!activeCanvas) return;
    setActiveCanvas({
      ...activeCanvas,
      elements: activeCanvas.elements.filter(el => el.id !== id)
    });
    setSelectedId(null);
  };

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] overflow-hidden">
      {/* Top Header */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#0d0d0d]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onExit}
            className="p-1.5 hover:bg-white/5 rounded-lg transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <span className="text-sm font-bold tracking-widest text-indigo-400">KONKCEE STUDIO</span>
        </div>
        
        {/* Command Bar in Header (Minified for Editor) */}
        <form onSubmit={handleAISubmit} className="flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="What should KONKCEE-TECH build today?" 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-20 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            type="submit"
            disabled={isGenerating}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white text-xs font-bold py-1.5 px-4 rounded-full transition"
          >
            {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Generate'}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-xs font-bold hover:bg-white/10 transition">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold transition">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <aside className="w-16 border-r border-white/5 bg-[#0d0d0d] flex flex-col items-center py-6 gap-6">
          <ToolbarItem icon={<MousePointer2 className="w-5 h-5" />} active label="Select" />
          <ToolbarItem icon={<TypeIcon className="w-5 h-5" />} label="Text" />
          <ToolbarItem icon={<Square className="w-5 h-5" />} label="Shape" />
          <ToolbarItem icon={<ImageIcon className="w-5 h-5" />} label="Assets" />
          <ToolbarItem icon={<Layers className="w-5 h-5" />} label="Layers" />
          <div className="mt-auto flex flex-col gap-4">
             <button className="p-2 text-slate-500 hover:text-white"><Undo2 className="w-5 h-5" /></button>
             <button className="p-2 text-slate-500 hover:text-white"><Redo2 className="w-5 h-5" /></button>
          </div>
        </aside>

        {/* Middle Canvas Area */}
        <main className="flex-1 bg-[#121212] relative overflow-auto p-12 no-scrollbar flex flex-col items-center">
          {activeCanvas ? (
             <div 
               className="relative shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500"
               style={{
                 width: `${activeCanvas.width}px`,
                 height: `${activeCanvas.height}px`,
                 backgroundColor: activeCanvas.backgroundColor,
                 transform: 'scale(0.8)',
                 transformOrigin: 'top center'
               }}
             >
                {activeCanvas.elements.map(el => (
                  <CanvasElement 
                    key={el.id} 
                    element={el} 
                    isSelected={selectedId === el.id}
                    onClick={() => setSelectedId(el.id)}
                  />
                ))}
             </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 max-w-md text-center">
               <Sparkles className="w-12 h-12 mb-6 text-indigo-500/50" />
               <h3 className="text-xl font-bold text-white mb-2">Ready to Design?</h3>
               <p className="text-sm">Type a prompt above like "Minimalist business card for a coffee shop" to see KONKCEE-TECH AI in action.</p>
            </div>
          )}

          {/* AI Variations Bar */}
          {variations.length > 0 && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-4 py-3 rounded-2xl flex gap-4 items-center">
               <span className="text-[10px] font-black uppercase text-indigo-400 mr-2">Variations</span>
               {variations.map((v, i) => (
                 <button 
                  key={v.id}
                  onClick={() => handleSelectVariation(v)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all overflow-hidden ${activeCanvas?.id === v.id ? 'border-indigo-500 scale-110' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                  style={{ backgroundColor: v.backgroundColor }}
                 >
                   <div className="w-full h-full flex items-center justify-center text-[10px] font-bold">V{i+1}</div>
                 </button>
               ))}
            </div>
          )}
        </main>

        {/* Right Properties Panel */}
        <aside className="w-72 border-l border-white/5 bg-[#0d0d0d] p-6 space-y-8">
           {selectedId ? (
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="font-bold text-sm uppercase tracking-widest">Properties</h3>
                   <button 
                    onClick={() => deleteElement(selectedId)}
                    className="p-1.5 text-red-400 hover:bg-red-400/10 rounded"
                  >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
                
                {/* Simulated Property Controls */}
                <div className="space-y-4">
                   <PropertyControl label="Position" value="X: 120, Y: 240" />
                   <PropertyControl label="Dimensions" value="W: 300, H: 450" />
                   <PropertyControl label="Fill Color" value="#6366F1" isColor />
                   <PropertyControl label="Opacity" value="100%" />
                   <PropertyControl label="Rotation" value="0°" />
                </div>

                <div className="pt-6 border-t border-white/5">
                   <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase">AI Enhancements</h4>
                   <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition">Regenerate Colors</button>
                   <button className="w-full py-2 mt-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition">Fix Alignment</button>
                </div>
             </div>
           ) : (
             <div className="h-full flex items-center justify-center text-slate-600 text-center px-4">
                <p className="text-xs italic">Select an element on the canvas to edit its properties.</p>
             </div>
           )}
        </aside>
      </div>
    </div>
  );
};

// Sub-components
const ToolbarItem: React.FC<{ icon: React.ReactNode, active?: boolean, label: string }> = ({ icon, active, label }) => (
  <button className={`flex flex-col items-center gap-1 group relative ${active ? 'text-indigo-500' : 'text-slate-500 hover:text-white'}`}>
    {icon}
    <span className="text-[9px] font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
    {active && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r"></div>}
  </button>
);

const PropertyControl: React.FC<{ label: string, value: string, isColor?: boolean }> = ({ label, value, isColor }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] text-slate-500 font-bold uppercase">{label}</label>
    <div className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs flex justify-between items-center cursor-pointer hover:border-white/20">
      <span>{value}</span>
      {isColor && <div className="w-3 h-3 rounded-full bg-indigo-500"></div>}
    </div>
  </div>
);

const CanvasElement: React.FC<{ element: DesignElement, isSelected: boolean, onClick: () => void }> = ({ element, isSelected, onClick }) => {
  const commonStyles: React.CSSProperties = {
    position: 'absolute',
    left: `${element.x}px`,
    top: `${element.y}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    cursor: 'pointer',
    outline: isSelected ? '2px solid #6366f1' : 'none',
    outlineOffset: '2px',
    transform: `rotate(${element.rotation || 0}deg)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-out'
  };

  const renderContent = () => {
    switch (element.type) {
      case 'text':
        return (
          <div style={{
            color: element.fill || 'white',
            fontSize: `${element.fontSize || 16}px`,
            fontWeight: element.fontWeight || 'normal',
            fontFamily: element.fontFamily || 'Inter',
            textAlign: 'center',
            lineHeight: 1.2
          }}>
            {element.content}
          </div>
        );
      case 'rect':
        return (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: element.fill || '#333',
            borderRadius: `${element.borderRadius || 0}px`
          }} />
        );
      case 'circle':
        return (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: element.fill || '#333',
            borderRadius: '50%'
          }} />
        );
      case 'image':
        return (
          <img 
            src={element.content || `https://picsum.photos/seed/${element.id}/400/400`}
            alt="Canvas asset"
            className="w-full h-full object-cover"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={commonStyles} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {renderContent()}
      {isSelected && (
        <>
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-indigo-500 rounded-sm" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-indigo-500 rounded-sm" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-indigo-500 rounded-sm" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-indigo-500 rounded-sm" />
        </>
      )}
    </div>
  );
};

export default EditorPage;

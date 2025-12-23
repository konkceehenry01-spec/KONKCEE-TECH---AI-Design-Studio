
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
  Sparkles,
  Zap,
  Wifi,
  Maximize2
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
  const [zoom, setZoom] = useState(80);

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

  const addImageElement = () => {
    const newId = `img-${Date.now()}`;
    const newElement: DesignElement = {
      id: newId,
      type: 'image',
      x: activeCanvas ? (activeCanvas.width / 2) - 100 : 440,
      y: activeCanvas ? (activeCanvas.height / 2) - 75 : 225,
      width: 200,
      height: 150,
      content: `https://picsum.photos/seed/${newId}/400/300`,
      rotation: 0
    };

    if (activeCanvas) {
      setActiveCanvas({
        ...activeCanvas,
        elements: [...activeCanvas.elements, newElement]
      });
    } else {
      setActiveCanvas({
        id: `canvas-${Date.now()}`,
        name: 'New Design',
        width: 1080,
        height: 1080,
        backgroundColor: '#ffffff',
        elements: [newElement]
      });
    }
    setSelectedId(newId);
  };

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] overflow-hidden selection:bg-indigo-500/30">
      {/* Top Header */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#0d0d0d] z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onExit}
            className="p-1.5 hover:bg-white/5 rounded-lg transition group"
          >
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white" />
          </button>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <span className="text-xs font-black tracking-[0.2em] text-indigo-500 uppercase">Studio</span>
        </div>
        
        {/* Command Bar in Header */}
        <form onSubmit={handleAISubmit} className="flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Describe your design vision..." 
            className="w-full bg-white/[0.03] border border-white/10 rounded-full py-2 pl-10 pr-24 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder:text-slate-600"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            type="submit"
            disabled={isGenerating}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full transition shadow-lg shadow-indigo-600/20"
          >
            {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Create'}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white text-black hover:bg-indigo-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition shadow-xl shadow-white/5">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <aside className="w-16 border-r border-white/5 bg-[#0d0d0d] flex flex-col items-center py-6 gap-6 z-10">
          <ToolbarItem icon={<MousePointer2 className="w-5 h-5" />} active label="Select" />
          <ToolbarItem icon={<TypeIcon className="w-5 h-5" />} label="Text" />
          <ToolbarItem icon={<Square className="w-5 h-5" />} label="Shape" />
          <ToolbarItem icon={<ImageIcon className="w-5 h-5" />} label="Image" onClick={addImageElement} />
          <ToolbarItem icon={<Layers className="w-5 h-5" />} label="Layers" />
          <div className="mt-auto flex flex-col gap-4">
             <button className="p-2 text-slate-500 hover:text-white transition-colors"><Undo2 className="w-5 h-5" /></button>
             <button className="p-2 text-slate-500 hover:text-white transition-colors"><Redo2 className="w-5 h-5" /></button>
          </div>
        </aside>

        {/* Middle Canvas Area */}
        <main className="flex-1 bg-[#0f0f0f] relative overflow-auto p-12 no-scrollbar flex flex-col items-center custom-grid">
          <style>{`
            .custom-grid {
              background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
              background-size: 32px 32px;
            }
          `}</style>
          
          {activeCanvas ? (
             <div 
               className="relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] transition-all duration-500"
               style={{
                 width: `${activeCanvas.width}px`,
                 height: `${activeCanvas.height}px`,
                 backgroundColor: activeCanvas.backgroundColor,
                 transform: `scale(${zoom / 100})`,
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
               <div className="relative mb-8">
                 <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full"></div>
                 <Sparkles className="w-16 h-16 text-indigo-500 relative z-10 animate-pulse" />
               </div>
               <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">New Canvas</h3>
               <p className="text-sm text-slate-400 font-medium leading-relaxed">
                 Enter a prompt in the command bar above to generate a design instantly with KONKCEE V-Engine.
               </p>
               <div className="mt-8 flex gap-3">
                 <button onClick={addImageElement} className="px-5 py-2 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition">Blank Template</button>
                 <button className="px-5 py-2 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition">Load Project</button>
               </div>
            </div>
          )}

          {/* AI Variations Bar */}
          {variations.length > 0 && (
            <div className="fixed bottom-14 left-1/2 -translate-x-1/2 glass px-5 py-4 rounded-[24px] flex gap-5 items-center z-20 shadow-2xl border-white/10">
               <div className="flex flex-col pr-4 border-r border-white/10">
                 <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em]">Variations</span>
                 <span className="text-[9px] text-slate-500 font-bold">V-ENGINE 3.0</span>
               </div>
               {variations.map((v, i) => (
                 <button 
                  key={v.id}
                  onClick={() => handleSelectVariation(v)}
                  className={`w-14 h-14 rounded-xl border-2 transition-all overflow-hidden shadow-lg ${activeCanvas?.id === v.id ? 'border-indigo-500 scale-110 -translate-y-1' : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'}`}
                  style={{ backgroundColor: v.backgroundColor }}
                 >
                   <div className="w-full h-full flex items-center justify-center text-[11px] font-black text-slate-800">#{i+1}</div>
                 </button>
               ))}
            </div>
          )}
        </main>

        {/* Right Properties Panel */}
        <aside className="w-72 border-l border-white/5 bg-[#0d0d0d] p-6 space-y-8 z-10">
           {selectedId ? (
             <div className="space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="font-black text-[10px] uppercase tracking-[0.25em] text-slate-400">Layer Info</h3>
                   <button 
                    onClick={() => deleteElement(selectedId)}
                    className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
                  >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
                
                <div className="space-y-5">
                   <PropertyControl label="Position" value={`X: ${activeCanvas?.elements.find(e => e.id === selectedId)?.x.toFixed(0)}, Y: ${activeCanvas?.elements.find(e => e.id === selectedId)?.y.toFixed(0)}`} />
                   <PropertyControl label="Size" value={`${activeCanvas?.elements.find(e => e.id === selectedId)?.width.toFixed(0)} x ${activeCanvas?.elements.find(e => e.id === selectedId)?.height.toFixed(0)}`} />
                   <PropertyControl label="Fill" value={activeCanvas?.elements.find(e => e.id === selectedId)?.fill || '#FFFFFF'} isColor color={activeCanvas?.elements.find(e => e.id === selectedId)?.fill} />
                   <PropertyControl label="Rotation" value={`${activeCanvas?.elements.find(e => e.id === selectedId)?.rotation || 0}°`} />
                </div>

                <div className="pt-8 border-t border-white/5 space-y-3">
                   <h4 className="text-[10px] font-black text-indigo-500/80 mb-4 uppercase tracking-[0.2em]">V-Generative Tools</h4>
                   <button className="w-full py-2.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group">
                    <Zap className="w-3 h-3 text-yellow-500 group-hover:scale-110 transition-transform" />
                    AI Style Refine
                   </button>
                   <button className="w-full py-2.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    Auto Layout
                   </button>
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-slate-700 text-center px-6">
                <Layers className="w-10 h-10 mb-4 opacity-20" />
                <p className="text-[10px] font-bold uppercase tracking-widest leading-loose">Select a layer to inspect properties</p>
             </div>
           )}
        </aside>
      </div>

      {/* Editor Footer (Status Bar) */}
      <footer className="h-8 border-t border-white/5 bg-[#0d0d0d] px-4 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-500 z-30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${activeCanvas ? 'bg-green-500' : 'bg-slate-700'}`}></div>
            <span>{activeCanvas ? 'Active Session' : 'Idle'}</span>
          </div>
          <div className="h-3 w-px bg-white/10"></div>
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-indigo-500" />
            <span>V-ENGINE 3.0</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-4">
             <button onClick={() => setZoom(Math.max(10, zoom - 10))} className="hover:text-white">-</button>
             <span className="w-10 text-center text-slate-400">{zoom}%</span>
             <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="hover:text-white">+</button>
           </div>
           <div className="h-3 w-px bg-white/10"></div>
           <div className="flex items-center gap-2">
             <Wifi className="w-3 h-3 text-green-500" />
             <span>Syncing</span>
           </div>
           <button className="hover:text-white"><Maximize2 className="w-3 h-3" /></button>
        </div>
      </footer>
    </div>
  );
};

// Sub-components
const ToolbarItem: React.FC<{ icon: React.ReactNode, active?: boolean, label: string, onClick?: () => void }> = ({ icon, active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 group relative w-full py-1 transition-all ${active ? 'text-indigo-500' : 'text-slate-600 hover:text-white'}`}
  >
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-indigo-500/10 shadow-lg shadow-indigo-500/5' : 'group-hover:bg-white/5'}`}>
      {icon}
    </div>
    <span className="text-[8px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity absolute -right-2 translate-x-full bg-[#0d0d0d] px-2 py-1 rounded border border-white/10 pointer-events-none whitespace-nowrap z-50">
      {label}
    </span>
    {active && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r shadow-[0_0_10px_#6366f1]"></div>}
  </button>
);

const PropertyControl: React.FC<{ label: string, value: string, isColor?: boolean, color?: string }> = ({ label, value, isColor, color }) => (
  <div className="space-y-2">
    <label className="text-[9px] text-slate-500 font-black uppercase tracking-[0.15em]">{label}</label>
    <div className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2 text-[10px] font-bold flex justify-between items-center cursor-pointer hover:bg-white/[0.06] hover:border-white/10 transition-all">
      <span className="text-slate-300">{value}</span>
      {isColor && (
        <div 
          className="w-4 h-4 rounded-md shadow-inner border border-white/10" 
          style={{ backgroundColor: color || '#6366F1' }}
        ></div>
      )}
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
    transition: 'all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
    zIndex: isSelected ? 10 : 1
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
            lineHeight: 1.2,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
            className="w-full h-full object-cover select-none pointer-events-none rounded-[inherit]"
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
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-500 rounded-full shadow-lg" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-500 rounded-full shadow-lg" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-500 rounded-full shadow-lg" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-500 rounded-full shadow-lg" />
        </>
      )}
    </div>
  );
};

export default EditorPage;

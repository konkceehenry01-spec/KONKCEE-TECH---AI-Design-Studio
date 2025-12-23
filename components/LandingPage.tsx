
import React from 'react';
import Logo from './Logo';
import MeshBackground from './MeshBackground';
import FloatingUIElements from './FloatingUIElements';
import Footer from './Footer';
import { ArrowRight, Box, Cpu, Zap, Globe, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onEnterEditor: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterEditor }) => {
  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <FloatingUIElements />
      
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto relative z-10">
        <Logo className="w-40" />
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition">Features</a>
          <a href="#" className="hover:text-white transition">Showcase</a>
          <a href="#" className="hover:text-white transition">Pricing</a>
        </div>
        <button 
          onClick={onEnterEditor}
          className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-indigo-500 hover:text-white transition duration-300 flex items-center gap-2 group"
        >
          Launch Studio
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>AI-Powered Design v3.0</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-extrabold leading-[1.1] tracking-tight">
              Design <span className="text-indigo-500">Intelligently</span>, Build Instantly.
            </h1>
            
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-light">
              KONKCEE-TECH is the world's first motion-first design platform. Turn prompts into professional visuals and export to production-ready code.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={onEnterEditor}
                className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
              >
                Get Started Free
              </button>
              <button className="px-8 py-4 rounded-xl glass hover:bg-white/10 text-white font-bold text-lg transition-all">
                Watch Demo
              </button>
            </div>

            <div className="pt-8 flex items-center space-x-8 text-slate-500">
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5" />
                <span className="text-sm">3D Editor</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                <span className="text-sm">V-Generative AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="text-sm">Cloud Scale</span>
              </div>
            </div>
          </div>

          <div className="relative group perspective-1000">
             <div className="relative glass rounded-2xl overflow-hidden aspect-square md:aspect-video border-indigo-500/20 shadow-2xl transition-transform duration-700 group-hover:rotate-y-6 group-hover:rotate-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200" 
                  alt="Editor Preview" 
                  className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-transparent"></div>
                
                {/* Main Hero Card Overlay */}
                <div className="absolute bottom-10 left-10 w-64 p-6 glass rounded-2xl border-white/20 shadow-2xl">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="text-sm font-bold">AI Suggestion</div>
                   </div>
                   <p className="text-xs text-slate-300">"We recommend a minimalist high-contrast typography for this tech branding project."</p>
                </div>
             </div>
             
             {/* Glow effect */}
             <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl -z-10 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </div>
      </main>

      {/* Trusted By Section (Social Proof) */}
      <section className="max-w-7xl mx-auto px-8 pb-32 relative z-10 opacity-60">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-10">Trusted by modern engineering teams</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-50">
           <span className="text-2xl font-bold tracking-tighter">Vercel</span>
           <span className="text-2xl font-bold tracking-tighter">Linear</span>
           <span className="text-2xl font-bold tracking-tighter">Supabase</span>
           <span className="text-2xl font-bold tracking-tighter">Stripe</span>
           <span className="text-2xl font-bold tracking-tighter">GitHub</span>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-5xl mx-auto px-8 py-32 border-t border-white/5 relative z-10">
         <h2 className="text-4xl font-bold text-center mb-16">The KONKCEE-TECH Advantage</h2>
         <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-10 rounded-[32px] border-white/5 relative group hover:border-white/10 transition-colors">
               <h3 className="text-xl font-bold mb-6 text-slate-500 uppercase tracking-widest text-sm">Legacy Tools</h3>
               <ul className="space-y-5">
                  <li className="flex items-start gap-4 text-slate-400">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0"></div>
                     <p className="text-sm">Manual, template-locked layouts</p>
                  </li>
                  <li className="flex items-start gap-4 text-slate-400">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0"></div>
                     <p className="text-sm">Static asset libraries with fixed styling</p>
                  </li>
                  <li className="flex items-start gap-4 text-slate-400">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0"></div>
                     <p className="text-sm">Primitive keyframe-based animations</p>
                  </li>
                  <li className="flex items-start gap-4 text-slate-400">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0"></div>
                     <p className="text-sm">Raster-based exports (PNG/JPG only)</p>
                  </li>
               </ul>
            </div>
            <div className="p-10 rounded-[32px] bg-indigo-600/5 border border-indigo-500/30 relative overflow-hidden group hover:border-indigo-500/60 transition-all duration-500">
               <div className="absolute top-0 right-0 p-3 bg-indigo-500 text-[10px] font-black uppercase rounded-bl-xl tracking-tighter shadow-lg">V-Engine v3</div>
               <h3 className="text-xl font-bold mb-6 text-indigo-400 uppercase tracking-widest text-sm">KONKCEE-TECH</h3>
               <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1] shrink-0"></div>
                     <span className="font-semibold text-white text-sm">AI-Prompt driven fluid architecture</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1] shrink-0"></div>
                     <span className="font-semibold text-white text-sm">Vector Generative AI custom assets</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1] shrink-0"></div>
                     <span className="font-semibold text-white text-sm">Real-time dynamic motion engine</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1] shrink-0"></div>
                     <span className="font-semibold text-white text-sm">Production-ready React/SVG code export</span>
                  </li>
               </ul>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/10 blur-[60px] rounded-full group-hover:bg-indigo-600/20 transition-all"></div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-8 py-32 text-center relative z-10">
         <div className="glass p-16 rounded-[48px] border-white/5 relative overflow-hidden">
            <div className="relative z-10 space-y-8">
               <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Ready to evolve your workflow?</h2>
               <p className="text-slate-400 text-lg max-w-xl mx-auto">Join thousands of engineers and designers building the next generation of visual experiences.</p>
               <button 
                  onClick={onEnterEditor}
                  className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
               >
                  Start Creating Now
               </button>
            </div>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

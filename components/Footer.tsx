
import React from 'react';
import Logo from './Logo';
import { Github, Twitter, Linkedin, Instagram, Mail, ArrowUpRight, ArrowUp, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl pt-24 pb-12 px-8 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="group cursor-pointer" onClick={scrollToTop}>
              <Logo className="w-44" animated={false} />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
              Pioneering the future of digital expression through generative intelligence and motion-aware design architecture.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} label="Twitter" />
              <SocialLink href="#" icon={<Github className="w-4 h-4" />} label="GitHub" />
              <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
              <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} label="Instagram" />
            </div>
          </div>

          {/* Product Links */}
          <div className="lg:pl-8">
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-[10px] text-indigo-400">The Studio</h4>
            <ul className="space-y-5">
              <FooterLink label="Design Editor" href="#" />
              <FooterLink label="AI Prompt Engine" href="#" badge="Pro" />
              <FooterLink label="Motion Library" href="#" />
              <FooterLink label="Export Systems" href="#" />
              <FooterLink label="Asset Cloud" href="#" />
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-[10px] text-indigo-400">Platform</h4>
            <ul className="space-y-5">
              <FooterLink label="Documentation" href="#" />
              <FooterLink label="Showcase" href="#" />
              <FooterLink label="API Access" href="#" />
              <FooterLink label="Community" href="#" />
              <FooterLink label="Marketplace" href="#" />
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-8">
            <h4 className="font-bold text-white mb-2 uppercase tracking-[0.2em] text-[10px] text-indigo-400">Newsletter</h4>
            <div className="space-y-4">
              <p className="text-slate-500 text-xs">Get weekly insights on AI design and motion trends.</p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 px-5 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer group">
                <Mail className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span>hello@konkcee-tech.studio</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/5 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 w-fit">
                <Sparkles className="w-3 h-3" />
                <span>POWERED BY GEMINI 3.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
          <div className="flex items-center gap-6">
            <span>© {currentYear} KONKCEE-TECH INC.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Status</a>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
              <span>San Francisco, CA</span>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <span>Back to Top</span>
              <div className="p-1 rounded bg-white/5 group-hover:bg-white/10 transition-colors">
                <ArrowUp className="w-3 h-3" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ label: string; href: string; badge?: string }> = ({ label, href, badge }) => (
  <li>
    <a href={href} className="text-slate-400 hover:text-white text-[13px] font-medium transition-all flex items-center gap-2 group w-fit">
      <span className="relative overflow-hidden">
        {label}
        <span className="absolute bottom-0 left-0 w-full h-px bg-indigo-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
      </span>
      {badge && (
        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-indigo-500 text-white font-black scale-90">
          {badge}
        </span>
      )}
    </a>
  </li>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a 
    href={href} 
    aria-label={label}
    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-600/10 hover:-translate-y-1 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;

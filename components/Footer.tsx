
import React from 'react';
import Logo from './Logo';
import { Github, Twitter, Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md pt-20 pb-10 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Logo className="w-40" animated={false} />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Empowering the next generation of creators with motion-first, AI-driven design tools that bridge the gap between imagination and production.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Github className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Product</h4>
            <ul className="space-y-4">
              <FooterLink label="Design Studio" href="#" />
              <FooterLink label="AI Generative Engine" href="#" badge="Beta" />
              <FooterLink label="Motion Presets" href="#" />
              <FooterLink label="Vector Assets" href="#" />
              <FooterLink label="Export to React" href="#" />
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4">
              <FooterLink label="Documentation" href="#" />
              <FooterLink label="Design Systems" href="#" />
              <FooterLink label="Tutorials" href="#" />
              <FooterLink label="Community" href="#" />
              <FooterLink label="API Status" href="#" />
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-6">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Stay Connected</h4>
            <p className="text-slate-400 text-sm">Join our newsletter for the latest AI design trends and updates.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
              <Mail className="w-3 h-3" />
              <span>support@konkcee-tech.studio</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <div>© {currentYear} KONKCEE-TECH. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span>Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ label: string; href: string; badge?: string }> = ({ label, href, badge }) => (
  <li>
    <a href={href} className="text-slate-400 hover:text-indigo-400 text-sm transition-colors flex items-center gap-2 group">
      {label}
      {badge && (
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {badge}
        </span>
      )}
      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
    </a>
  </li>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => (
  <a 
    href={href} 
    className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all"
  >
    {icon}
  </a>
);

export default Footer;

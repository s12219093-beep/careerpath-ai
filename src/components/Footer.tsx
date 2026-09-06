import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'analyzer', label: 'Career Analyzer' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'quiz', label: 'Career Quiz' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'about', label: 'About' },
  ];

  return (
    <footer className="bg-[#F4F1EA] border-t border-[#E5E0D6] mt-24 text-[#3A403C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#23412E] flex items-center justify-center text-[#FBF9F5]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  <path d="m9 10 2 2 4-4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-[#1F2421] tracking-tight">CareerPath AI</span>
            </div>
            
            <p className="text-base text-[#4F5550] max-w-md font-medium">
              "Build skills. Find direction. Grow your career."
            </p>
            <p className="text-xs text-[#6F7670] leading-relaxed max-w-md">
              A university-grade career intelligence platform bridging undergraduate curriculum with real hiring requirements through structured skill gap diagnosis and milestone execution.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2421] mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActiveTab(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#4E544F] hover:text-[#1B3224] transition-colors font-medium text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic & Tech Specs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2421] mb-4">Architecture</h4>
            <ul className="space-y-2 text-xs text-[#5C635D]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B3F]" />
                Secure Server-side API Proxy
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B3F]" />
                Structured JSON Output Parsing
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B3F]" />
                OpenAI GPT-4o Mini Ready
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B3F]" />
                Interactive Local Persistence
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 mt-10 border-t border-[#E2DDD2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#727972] gap-4">
          <p>© {new Date().getFullYear()} CareerPath AI. Designed for University Students & Fresh Graduates.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Assessment</span>
            <span>University Partnerships</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

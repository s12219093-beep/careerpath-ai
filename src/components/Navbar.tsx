import React, { useState } from 'react';
import { Compass, Sparkles, Menu, X, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasAnalysis: boolean;
  isOpenAIReady: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  hasAnalysis,
  isOpenAIReady
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'analyzer', label: 'Career Analyzer' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'quiz', label: 'Career Quiz' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#23412E] flex items-center justify-center text-[#FBF9F5] shadow-xs group-hover:bg-[#1B3224] transition-colors">
              {/* Minimal icon: Career path node + compass orientation */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="m9 10 2 2 4-4" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg tracking-tight text-[#1F2421]">CareerPath</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#E3EBE3] text-[#23412E] tracking-wider uppercase">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-[#6E736E] font-medium hidden sm:block">EdTech Career Planning Platform</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F4F0E8] p-1.5 rounded-xl border border-[#E6E0D4]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#FFFFFF] text-[#23412E] shadow-xs font-semibold'
                      : 'text-[#555C56] hover:text-[#1F2421] hover:bg-[#FAF8F3]'
                  }`}
                >
                  {item.label}
                  {item.id === 'dashboard' && hasAnalysis && (
                    <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#3D704D]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action & Provider status */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#555C56] px-2.5 py-1 rounded-lg bg-[#EFEBE3] border border-[#E2DDD2]">
              {isOpenAIReady ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E6B3F]" />
                  <span className="font-medium text-[#23412E]">OpenAI Engine</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6547]" />
                  <span className="font-medium text-[#36423A]">AI Synthesis v2.4</span>
                </>
              )}
            </div>

            <button
              id="nav-cta-analyze"
              onClick={() => handleNavClick('analyzer')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[#23412E] text-[#FBF9F5] hover:bg-[#1B3224] transition-all shadow-xs hover:shadow-sm active:translate-y-px"
            >
              <span>Analyze My Career</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1F2421] hover:bg-[#EFEBE3] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E4DC] bg-[#FBF9F5] px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-[#E3EBE3] text-[#23412E] font-semibold'
                  : 'text-[#3E4540] hover:bg-[#F2EFE8]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#E8E4DC]">
            <button
              id="mobile-cta-analyze"
              onClick={() => handleNavClick('analyzer')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-[#23412E] text-[#FBF9F5]"
            >
              <span>Analyze My Career</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

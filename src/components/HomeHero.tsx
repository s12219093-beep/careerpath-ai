import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Compass, Award, ShieldCheck } from 'lucide-react';

interface HomeHeroProps {
  onAnalyzeClick: () => void;
  onQuizClick: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onAnalyzeClick,
  onQuizClick
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Hero Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2EB] border border-[#D5E2D5] text-[#23412E] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#2E6B3F] animate-pulse" />
              <span>University & Graduate Career Intelligence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F2421] tracking-tight leading-[1.08]">
              Build the Career <br className="hidden sm:inline" />
              <span className="text-[#23412E]">You're Meant For.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#555E57] font-normal leading-relaxed max-w-xl">
              Discover your strengths, identify skill gaps, and build a personalized career roadmap with AI. Designed for university students and fresh graduates navigating modern hiring standards.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="hero-primary-cta"
                onClick={onAnalyzeClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-[#23412E] hover:bg-[#1B3224] transition-all shadow-xs hover:shadow-md active:translate-y-px text-sm"
              >
                <span>Analyze My Career</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onQuizClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-[#2C332E] bg-[#FFFFFF] border border-[#DCD6CA] hover:bg-[#F7F5F0] transition-colors text-sm"
              >
                <Compass className="w-4 h-4 text-[#23412E]" />
                <span>Take Career Quiz</span>
              </button>
            </div>

            {/* Institutional Endorsement / Social Proof */}
            <div className="pt-6 border-t border-[#E8E4DC] flex flex-wrap items-center gap-6 text-xs text-[#636C65]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E6B3F]" />
                <span className="font-semibold text-[#1F2421]">18,000+</span> Students Guided
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E6B3F]" />
                <span className="font-semibold text-[#1F2421]">85+</span> Specialized Career Paths
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E6B3F]" />
                <span className="font-semibold text-[#1F2421]">OpenAI</span> Architecture Ready
              </div>
            </div>
          </div>

          {/* RIGHT: Realistic High-Fidelity Product UI Preview */}
          <div className="lg:col-span-6 relative">
            {/* Subtle floating badge 1 */}
            <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-[#E8E4DC] text-xs font-semibold text-[#1F2421]">
              <div className="w-2 h-2 rounded-full bg-[#2E6B3F]" />
              <span>Profile Analyzed: MIS Senior</span>
            </div>

            {/* Subtle floating badge 2 */}
            <div className="absolute -bottom-4 -right-2 z-20 hidden sm:flex items-center gap-2 bg-[#23412E] text-white px-3.5 py-2 rounded-xl shadow-xs text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-[#D1DDD1]" />
              <span>84% Career Readiness</span>
            </div>

            {/* Main Application Mock Window */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#DCD6CA] shadow-sm overflow-hidden text-left">
              {/* Fake Window Bar */}
              <div className="bg-[#F4F1EA] px-4 py-3 border-b border-[#E8E4DC] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DCD4C6]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DCD4C6]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DCD4C6]" />
                  <span className="text-[11px] font-mono text-[#6A736C] ml-2">app.careerpath.ai/analyzer</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EBF2EB] text-[#23412E]">
                  AI Synthesized
                </span>
              </div>

              {/* Product Preview Interior */}
              <div className="p-5 sm:p-6 space-y-4 bg-[#FAF9F6]">
                {/* Career Profile Card Preview */}
                <div className="bg-white p-4 rounded-xl border border-[#E8E4DC] shadow-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F7670]">Top Career Match</span>
                    <h3 className="text-base sm:text-lg font-bold text-[#1F2421]">Business Analyst</h3>
                    <p className="text-xs text-[#525B54]">Enterprise Operations & Data Systems</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-[#23412E]">92%</span>
                    <span className="text-[10px] font-semibold text-[#4F6A52] block uppercase tracking-wider">Match</span>
                  </div>
                </div>

                {/* Grid: Circular Score + Skill Gap */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Circular Readiness Score Mini */}
                  <div className="bg-white p-3.5 rounded-xl border border-[#E8E4DC] flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-4 border-[#23412E] border-t-[#D1DDD1] flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-[#1F2421]">84%</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-[#1F2421] block">Career Readiness</span>
                      <span className="text-[11px] text-[#555E57]">Technical: 78% · Comm: 86%</span>
                    </div>
                  </div>

                  {/* Skill Gap Comparison Mini */}
                  <div className="bg-white p-3.5 rounded-xl border border-[#E8E4DC] space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-[#23412E]">You Have</span>
                      <span className="text-[#8C5E28]">You Need</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#4F5751]">
                      <span>SQL, Excel, BI</span>
                      <span className="font-semibold text-[#8C4A19]">Python, Stats, Adv SQL</span>
                    </div>
                  </div>
                </div>

                {/* 4-Step Roadmap Preview */}
                <div className="bg-white p-3.5 rounded-xl border border-[#E8E4DC] space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-[#1F2421]">
                    <span>Personalized Career Roadmap</span>
                    <span className="text-[10px] text-[#23412E] bg-[#EBF2EB] px-2 py-0.5 rounded">4 Stages</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div className="bg-[#F8FAF8] p-1.5 rounded border border-[#DCE4DC]">
                      <span className="text-[9px] font-bold text-[#23412E] block">STEP 01</span>
                      <span className="text-[10px] font-medium text-[#38423A]">Foundation</span>
                    </div>
                    <div className="bg-[#F8FAF8] p-1.5 rounded border border-[#DCE4DC]">
                      <span className="text-[9px] font-bold text-[#23412E] block">STEP 02</span>
                      <span className="text-[10px] font-medium text-[#38423A]">Skills</span>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-[#E8E4DC]">
                      <span className="text-[9px] font-bold text-[#6E7570] block">STEP 03</span>
                      <span className="text-[10px] font-medium text-[#38423A]">Experience</span>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-[#E8E4DC]">
                      <span className="text-[9px] font-bold text-[#6E7570] block">STEP 04</span>
                      <span className="text-[10px] font-medium text-[#38423A]">Job Ready</span>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation Card Mini */}
                <div className="bg-[#F4F6F4] p-3 rounded-xl border border-[#D5E2D5] flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#23412E] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#2C3B2F] leading-snug">
                    <strong className="font-bold">AI Strategic Recommendation:</strong> Focus on advanced SQL and Power BI first, then complete one real-world business analysis project to strengthen your portfolio.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Target, Compass, BookOpen, ShieldCheck, CheckCircle2, Award, Users, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  setActiveTab: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Intro Banner */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#48634B]">
          About CareerPath AI
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F2421] tracking-tight">
          Empowering the Next Generation of Graduates with Direction & Proof.
        </h1>
        <p className="text-base sm:text-lg text-[#555E57] leading-relaxed">
          The traditional bridge between academic coursework and modern employer demands is broken. CareerPath AI turns ambiguous degree requirements into a prioritized roadmap of real-world competencies.
        </p>
      </div>

      {/* 5 Core Pillars (Section 9) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-7 rounded-2xl border border-[#E8E4DC] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2EA] text-[#23412E] flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-lg font-bold text-[#1F2421]">
            Making Better Career Decisions Early
          </h3>
          <p className="text-xs sm:text-sm text-[#555E57] leading-relaxed">
            Students frequently pick entry roles based on outdated alumni impressions or generic titles. Our model pairs academic majors with empirical market demand and compensation trajectories.
          </p>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-[#E8E4DC] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2EA] text-[#23412E] flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-lg font-bold text-[#1F2421]">
            Understanding Individual Strengths
          </h3>
          <p className="text-xs sm:text-sm text-[#555E57] leading-relaxed">
            Rather than generic assessments, CareerPath AI identifies multidimensional strengths—such as whether a student naturally gravitates toward systems logic, empirical analytics, or stakeholder strategy.
          </p>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-[#E8E4DC] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2EA] text-[#23412E] flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="text-lg font-bold text-[#1F2421]">
            Identifying & Quantifying Skill Gaps
          </h3>
          <p className="text-xs sm:text-sm text-[#555E57] leading-relaxed">
            Universities excel at theory, but hiring managers scan for tool proficiency (such as Advanced SQL, Power BI, and Git pipelines). We highlight missing requirements in an actionable priority hierarchy.
          </p>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-[#E8E4DC] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2EA] text-[#23412E] flex items-center justify-center font-bold">
            04
          </div>
          <h3 className="text-lg font-bold text-[#1F2421]">
            Building Realistic, Sequential Roadmaps
          </h3>
          <p className="text-xs sm:text-sm text-[#555E57] leading-relaxed">
            A career plan shouldn’t feel overwhelming. Our sequential 4-stage roadmap guides students from foundational tools through to high-impact portfolio capstones and interview preparation.
          </p>
        </div>
      </div>

      {/* Technology & Security Commitment */}
      <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-10 border border-[#ECE6DB] space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#23412E]">
          <ShieldCheck className="w-4 h-4 text-[#23412E]" />
          <span>Enterprise-Grade Technology & Security</span>
        </div>

        <h3 className="text-2xl font-bold text-[#1F2421]">
          Privacy-First Architecture & OpenAI Integration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#525B54]">
          <div className="space-y-1.5 bg-white p-4 rounded-xl border border-[#E8E4DC]">
            <span className="font-bold text-[#1F2421] text-sm block">Server-Side Proxy</span>
            <p>API keys and credentials never leak to the client browser. All generation occurs behind a secure Express backend.</p>
          </div>
          <div className="space-y-1.5 bg-white p-4 rounded-xl border border-[#E8E4DC]">
            <span className="font-bold text-[#1F2421] text-sm block">Structured JSON</span>
            <p>OpenAI schema enforcement returns verified, strongly typed payloads that seamlessly feed UI analytics.</p>
          </div>
          <div className="space-y-1.5 bg-white p-4 rounded-xl border border-[#E8E4DC]">
            <span className="font-bold text-[#1F2421] text-sm block">Zero Chatbot Slop</span>
            <p>We reject unstructured chat windows. The AI functions as an analytical diagnostic tool directly driving interactive dashboards.</p>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            onClick={() => setActiveTab('analyzer')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#23412E] text-white hover:bg-[#1B3224] transition-all shadow-xs"
          >
            <span>Launch AI Career Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

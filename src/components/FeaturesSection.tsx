import React from 'react';
import {
  Compass,
  Cpu,
  BarChart3,
  GitMerge,
  FolderGit2,
  FileQuestion,
  ArrowRight
} from 'lucide-react';

interface FeaturesSectionProps {
  setActiveTab: (tab: string) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ setActiveTab }) => {
  const features = [
    {
      icon: Compass,
      title: 'AI Career Analysis',
      description: 'Discover career paths that match your strengths, academic foundation, and domain curiosity.',
      tabTarget: 'analyzer',
      tag: 'Core Diagnostic'
    },
    {
      icon: BarChart3,
      title: 'Skill Gap Analysis',
      description: 'Understand exactly which skills you need to develop by comparing acquired vs required market proficiencies.',
      tabTarget: 'analyzer',
      tag: 'Benchmarking'
    },
    {
      icon: Cpu,
      title: 'Career Readiness',
      description: 'Measure how prepared you are for your target career across technical, communication, and portfolio indices.',
      tabTarget: 'dashboard',
      tag: 'Quantitative Score'
    },
    {
      icon: GitMerge,
      title: 'Personalized Roadmap',
      description: 'Follow a step-by-step path from student to job-ready, organized into Foundation, Skills, Experience, and Launch.',
      tabTarget: 'roadmap',
      tag: 'Milestones'
    },
    {
      icon: FolderGit2,
      title: 'Portfolio Builder',
      description: 'Discover practical projects that strengthen your professional profile and eliminate the "no experience" hurdle.',
      tabTarget: 'roadmap',
      tag: 'Proof of Work'
    },
    {
      icon: FileQuestion,
      title: 'AI Interview Preparation',
      description: 'Practice high-frequency interview questions based on your target career with behavioral and technical frameworks.',
      tabTarget: 'roadmap',
      tag: 'Hiring Practice'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F8FAF7] border-y border-[#E5E0D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#48634B]">
            End-To-End EdTech Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
            Everything You Need to Build Your Career
          </h2>
          <p className="text-sm sm:text-base text-[#566058] leading-relaxed">
            Eliminating career guesswork for students through structured algorithmic analysis, skills benchmarking, and realistic project milestones.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E4DC] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#CBD8CB] hover:shadow-sm transition-all text-left group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF2EA] flex items-center justify-center text-[#23412E] group-hover:bg-[#23412E] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F4F1EA] text-[#555E57]">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1F2421] tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#555E57] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActiveTab(feature.tabTarget);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#23412E] group-hover:text-[#1B3224] transition-colors"
                  >
                    <span>Explore module</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

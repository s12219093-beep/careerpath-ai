import React, { useState } from 'react';
import { StudentProfile, AICareerAnalysisResult } from '../types';
import { sampleMISProfile, sampleCSProfile, sampleFinanceProfile } from '../data/mockCareerData';
import { CareerReadinessGauge } from './CareerReadinessGauge';
import { SkillGapVisualizer } from './SkillGapVisualizer';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Plus,
  X,
  Briefcase,
  Layers,
  GraduationCap,
  Compass,
  Cpu,
  RefreshCw
} from 'lucide-react';

interface CareerAnalyzerProps {
  currentAnalysis: AICareerAnalysisResult | null;
  onAnalysisGenerated: (result: AICareerAnalysisResult) => void;
  setActiveTab: (tab: string) => void;
}

export const CareerAnalyzer: React.FC<CareerAnalyzerProps> = ({
  currentAnalysis,
  onAnalysisGenerated,
  setActiveTab,
}) => {
  // Form State
  const [profile, setProfile] = useState<StudentProfile>(
    currentAnalysis ? currentAnalysis.studentProfile : sampleMISProfile
  );

  const [newSkillInput, setNewSkillInput] = useState('');
  const [newInterestInput, setNewInterestInput] = useState('');

  // Processing Animation State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatusIndex, setProcessingStatusIndex] = useState(0);

  const processingMessages = [
    'Analyzing your career profile...',
    'Understanding your strengths...',
    'Matching your skills...',
    'Analyzing career compatibility...',
    'Identifying skill gaps...',
    'Building your career roadmap...'
  ];

  // Quick skill presets
  const popularSkills = ['SQL', 'Python', 'Excel', 'Power BI', 'Communication', 'Tableau', 'Agile', 'Figma', 'Financial Modeling', 'Data Structures'];

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !profile.skills.includes(trimmed)) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, trimmed] }));
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleAddInterest = (interestToAdd: string) => {
    const trimmed = interestToAdd.trim();
    if (trimmed && !profile.interests.includes(trimmed)) {
      setProfile(prev => ({ ...prev, interests: [...prev.interests, trimmed] }));
      setNewInterestInput('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interestToRemove)
    }));
  };

  const handleLoadSample = (sample: StudentProfile) => {
    setProfile(sample);
  };

  // Run AI Analysis
  const handleAnalyzeCareer = async () => {
    setIsProcessing(true);
    setProcessingStatusIndex(0);

    // Cycle through messages smoothly
    const interval = setInterval(() => {
      setProcessingStatusIndex(prev => {
        if (prev < processingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        const result: AICareerAnalysisResult = await response.json();
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          onAnalysisGenerated(result);
        }, 500);
      } else {
        throw new Error('Analysis API failed');
      }
    } catch (err) {
      console.warn('Backend API request error, synthesizing locally:', err);
      // Fallback
      clearInterval(interval);
      import('../utils/careerEngine').then(({ synthesizeCareerAnalysis }) => {
        const result = synthesizeCareerAnalysis(profile, 'intelligent_engine');
        setTimeout(() => {
          setIsProcessing(false);
          onAnalysisGenerated(result);
        }, 600);
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Workspace Intro Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#667067]">
          <Compass className="w-3.5 h-3.5 text-[#23412E]" />
          <span>AI Diagnostics Workspace</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421] tracking-tight">
          AI Career Analyzer
        </h1>
        <p className="text-sm text-[#555C56] max-w-3xl">
          Enter your academic background, demonstrated skills, and career preferences. The platform maps your profile against real hiring specifications and benchmarks your readiness.
        </p>
      </div>

      {/* Main Two-Column Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Your Career Profile Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E4DC] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#F0ECE4] pb-4">
            <h2 className="text-lg font-bold text-[#1F2421] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#23412E]" />
              Your Career Profile
            </h2>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#6E736E]">Presets:</span>
              <button
                type="button"
                onClick={() => handleLoadSample(sampleMISProfile)}
                className="px-2 py-0.5 rounded bg-[#F4F1EA] hover:bg-[#ECE7DC] text-[#2C332E] font-medium text-[11px]"
              >
                MIS
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample(sampleCSProfile)}
                className="px-2 py-0.5 rounded bg-[#F4F1EA] hover:bg-[#ECE7DC] text-[#2C332E] font-medium text-[11px]"
              >
                CS
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample(sampleFinanceProfile)}
                className="px-2 py-0.5 rounded bg-[#F4F1EA] hover:bg-[#ECE7DC] text-[#2C332E] font-medium text-[11px]"
              >
                Finance
              </button>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* University Major */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#2C332E]">University Major</label>
              <input
                type="text"
                value={profile.major}
                onChange={e => setProfile({ ...profile, major: e.target.value })}
                placeholder="e.g. Management Information Systems"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6CA] bg-[#FAF9F6] text-[#1F2421] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#23412E] transition-colors"
              />
            </div>

            {/* Academic Level */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#2C332E]">Academic Level</label>
              <select
                value={profile.academicLevel}
                onChange={e => setProfile({ ...profile, academicLevel: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6CA] bg-[#FAF9F6] text-[#1F2421] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#23412E] transition-colors"
              >
                <option value="Undergraduate (1st / 2nd Year)">Undergraduate (1st / 2nd Year)</option>
                <option value="Junior (3rd Year)">Junior (3rd Year)</option>
                <option value="Senior / Final Year">Senior / Final Year</option>
                <option value="Master's / Postgraduate">Master's / Postgraduate</option>
                <option value="Fresh Graduate (< 1 Year)">Fresh Graduate (&lt; 1 Year)</option>
              </select>
            </div>

            {/* Current Skills Tag Input */}
            <div className="space-y-2">
              <label className="font-bold text-[#2C332E]">Current Skills</label>
              <div className="flex flex-wrap gap-1.5 min-h-[38px] p-2 rounded-xl border border-[#DCD6CA] bg-[#FAF9F6]">
                {profile.skills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FFFFFF] text-[#23412E] border border-[#D9E2D9] shadow-xs"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-[#6D776F] hover:text-[#933] transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={e => setNewSkillInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(newSkillInput);
                    }
                  }}
                  placeholder="Type skill & press Enter..."
                  className="grow min-w-[120px] bg-transparent text-xs text-[#1F2421] focus:outline-none py-1"
                />
              </div>

              {/* Popular quick adds */}
              <div className="flex flex-wrap gap-1 items-center pt-1">
                <span className="text-[11px] text-[#6E736E] mr-1">Suggestions:</span>
                {popularSkills.slice(0, 6).map(s => {
                  const alreadyHas = profile.skills.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={alreadyHas}
                      onClick={() => handleAddSkill(s)}
                      className={`text-[11px] px-2 py-0.5 rounded-md transition-colors ${
                        alreadyHas
                          ? 'bg-[#EAE6DE] text-[#8C918C] cursor-not-allowed'
                          : 'bg-[#F2EFE8] text-[#424A44] hover:bg-[#E5E0D5]'
                      }`}
                    >
                      + {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interests Tag Input */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#2C332E]">Interests</label>
              <div className="flex flex-wrap gap-1.5 p-2 rounded-xl border border-[#DCD6CA] bg-[#FAF9F6]">
                {profile.interests.map(interest => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FFFFFF] text-[#363E39] border border-[#E0DBD0] shadow-xs"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      className="text-[#6D776F] hover:text-[#933] transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={newInterestInput}
                  onChange={e => setNewInterestInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddInterest(newInterestInput);
                    }
                  }}
                  placeholder="Add interest & enter..."
                  className="grow min-w-[120px] bg-transparent text-xs text-[#1F2421] focus:outline-none py-1"
                />
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#2C332E]">Experience</label>
              <select
                value={profile.experience}
                onChange={e => setProfile({ ...profile, experience: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6CA] bg-[#FAF9F6] text-[#1F2421] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#23412E] transition-colors"
              >
                <option value="Academic Coursework & Class Projects">Academic Coursework & Class Projects</option>
                <option value="University Projects & Case Competitions">University Projects & Case Competitions</option>
                <option value="1 Internship (3-6 Months)">1 Internship (3-6 Months)</option>
                <option value="2+ Internships / Practical Work">2+ Internships / Practical Work</option>
                <option value="Student Leadership & Club Executive">Student Leadership & Club Executive</option>
              </select>
            </div>

            {/* Target Industry & Preferred Role (2-col grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-[#2C332E]">Target Industry</label>
                <select
                  value={profile.targetIndustry}
                  onChange={e => setProfile({ ...profile, targetIndustry: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DCD6CA] bg-[#FAF9F6] text-[#1F2421] focus:bg-white text-xs"
                >
                  <option value="Technology">Technology</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Consulting & Strategy">Consulting & Strategy</option>
                  <option value="Healthcare & Biotech">Healthcare & Biotech</option>
                  <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#2C332E]">Preferred Role</label>
                <select
                  value={profile.preferredRole}
                  onChange={e => setProfile({ ...profile, preferredRole: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DCD6CA] bg-[#FAF9F6] text-[#1F2421] focus:bg-white text-xs"
                >
                  <option value="Analytical & Strategic">Analytical & Strategic</option>
                  <option value="Technical & Engineering">Technical & Engineering</option>
                  <option value="Client-Facing & Consulting">Client-Facing & Consulting</option>
                  <option value="Product & Design">Product & Design</option>
                </select>
              </div>
            </div>

            {/* Work Environment */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#2C332E]">Work Environment</label>
              <div className="grid grid-cols-3 gap-2">
                {['Remote', 'Hybrid', 'In-Office'].map(env => (
                  <button
                    key={env}
                    type="button"
                    onClick={() => setProfile({ ...profile, workEnvironment: env })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      profile.workEnvironment === env
                        ? 'bg-[#23412E] text-white border-[#23412E] shadow-xs'
                        : 'bg-[#FAF9F6] text-[#474E49] border-[#DCD6CA] hover:bg-[#F0ECE2]'
                    }`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              id="analyze-career-btn"
              disabled={isProcessing || !profile.major}
              onClick={handleAnalyzeCareer}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white transition-all shadow-xs ${
                isProcessing
                  ? 'bg-[#67806D] cursor-wait'
                  : 'bg-[#23412E] hover:bg-[#1B3224] active:translate-y-px hover:shadow-sm'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Assessment...</span>
                </>
              ) : (
                <>
                  <span>Analyze My Career</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Career Insights Workspace */}
        <div className="lg:col-span-7 space-y-8">
          {/* AI PROCESSING STATE (Section 16) */}
          {isProcessing ? (
            <div className="bg-white rounded-2xl p-10 border border-[#E8E4DC] shadow-xs flex flex-col items-center justify-center text-center min-h-[460px] space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[#EAF2EA] flex items-center justify-center text-[#23412E]">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#1F2421]">
                  Analyzing your career profile...
                </h3>
                <p className="text-sm font-medium text-[#48634B] min-h-[24px] transition-all">
                  {processingMessages[processingStatusIndex]}
                </p>
              </div>

              {/* Step indicator pills */}
              <div className="flex items-center gap-1.5">
                {processingMessages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx <= processingStatusIndex
                        ? 'w-6 bg-[#23412E]'
                        : 'w-2 bg-[#E2DDD2]'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : currentAnalysis ? (
            /* COMPREHENSIVE AI RESULTS VIEW (Section 8 & 15) */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Best Career Match Card (Section 8) */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E4DC] shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0ECE4] pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#667067]">
                      Top Algorithmic Recommendation
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421] tracking-tight mt-0.5">
                      {currentAnalysis.bestCareerMatch.title}
                    </h2>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#EBF2EB] border border-[#D4E3D4] text-[#1B3224]">
                    <span className="text-2xl font-black">{currentAnalysis.bestCareerMatch.matchPercentage}%</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Match</span>
                  </div>
                </div>

                {/* Why It Fits You */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#667067]">
                    Why It Fits You
                  </h4>
                  <p className="text-sm text-[#3E4741] leading-relaxed font-medium">
                    {currentAnalysis.bestCareerMatch.fitReason}
                  </p>
                </div>

                {/* Strong Areas vs Needs Development (Section 8) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E0ECE0] space-y-2">
                    <span className="text-xs font-bold text-[#1B3224] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2E6B3F]" />
                      Strong Areas
                    </span>
                    <ul className="space-y-1 text-xs text-[#2F4232]">
                      {currentAnalysis.strongAreas.map((sa, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3D704D]" />
                          {sa}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#ECE6DB] space-y-2">
                    <span className="text-xs font-bold text-[#4D3A25] flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-[#8C5E28]" />
                      Needs Development
                    </span>
                    <ul className="space-y-1 text-xs text-[#4F463B]">
                      {currentAnalysis.needsDevelopment.map((nd, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#965A20]" />
                          {nd}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI Recommendation Highlight */}
                <div className="bg-[#F4F6F4] p-4 rounded-xl border border-[#D5E2D5] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#23412E]">
                    AI Recommendation
                  </span>
                  <p className="text-xs text-[#2A3B2D] leading-relaxed">
                    {currentAnalysis.aiRecommendation}
                  </p>
                </div>

                {/* Meta details: Salary & Outlook */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#636C65] pt-2 border-t border-[#F0ECE4]">
                  {currentAnalysis.bestCareerMatch.salaryRange && (
                    <span className="flex items-center gap-1">
                      <span className="font-semibold text-[#1F2421]">Entry Salary:</span> {currentAnalysis.bestCareerMatch.salaryRange}
                    </span>
                  )}
                  {currentAnalysis.bestCareerMatch.growthOutlook && (
                    <span className="flex items-center gap-1">
                      <span className="font-semibold text-[#1F2421]">Outlook:</span> {currentAnalysis.bestCareerMatch.growthOutlook}
                    </span>
                  )}
                </div>
              </div>

              {/* Alternative Careers Section */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E4DC] shadow-xs space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#667067]">
                    Broaden Your Horizons
                  </span>
                  <h3 className="text-lg font-bold text-[#1F2421]">Alternative Careers</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentAnalysis.alternativeCareers.map((alt, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-[#E8E4DC] bg-[#FAF9F6] space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1F2421]">{alt.title}</span>
                          <span className="text-xs font-bold text-[#23412E] bg-[#EAF2EA] px-1.5 py-0.5 rounded">
                            {alt.matchPercentage}%
                          </span>
                        </div>
                        <p className="text-[11px] text-[#555E57] line-clamp-3 leading-relaxed">
                          {alt.fitReason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Readiness Score Component (Section 4) */}
              <CareerReadinessGauge data={currentAnalysis.careerReadiness} />

              {/* Skill Gap Component (Section 5) */}
              <SkillGapVisualizer
                youHave={currentAnalysis.skillGap.youHave}
                youNeed={currentAnalysis.skillGap.youNeed}
                prioritySkills={currentAnalysis.skillGap.prioritySkills}
                onBuildLearningPlan={() => setActiveTab('roadmap')}
              />

              {/* Action Banner: Build My Roadmap */}
              <div className="bg-[#23412E] rounded-2xl p-6 sm:p-7 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold">Ready to bridge your skill gaps?</h4>
                  <p className="text-xs text-[#D5E2D5] max-w-md">
                    Follow the 4-step personalized roadmap structured specifically for {currentAnalysis.bestCareerMatch.title}.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('roadmap');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#FAF9F5] text-[#23412E] hover:bg-white transition-all shadow-xs shrink-0"
                >
                  <span>Build My Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="bg-white rounded-2xl p-10 border border-[#E8E4DC] shadow-xs flex flex-col items-center justify-center text-center min-h-[460px] space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F4F1EA] flex items-center justify-center text-[#5C665F]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1F2421]">
                Your personalized career insights will appear here.
              </h3>
              <p className="text-xs sm:text-sm text-[#667067] max-w-md leading-relaxed">
                Complete your academic profile on the left or load the pre-configured sample profile, then click <strong className="text-[#1F2421]">Analyze My Career</strong>.
              </p>
              <button
                type="button"
                onClick={() => handleLoadSample(sampleMISProfile)}
                className="mt-2 text-xs font-semibold px-4 py-2 rounded-xl bg-[#EBF2EB] text-[#23412E] hover:bg-[#DFEADF] transition-colors"
              >
                Load Sample Student Profile (MIS)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

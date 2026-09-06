import React from 'react';
import { AICareerAnalysisResult } from '../types';
import { CareerReadinessGauge } from './CareerReadinessGauge';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  FolderGit2,
  Briefcase,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface DashboardViewProps {
  analysis: AICareerAnalysisResult;
  setActiveTab: (tab: string) => void;
  onTaskToggle: (stageIndex: number, taskId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  analysis,
  setActiveTab,
  onTaskToggle
}) => {
  const totalTasks = analysis.learningRoadmap.reduce((acc, stage) => acc + stage.tasks.length, 0);
  const completedTasks = analysis.learningRoadmap.reduce(
    (acc, stage) => acc + stage.tasks.filter((t) => t.completed).length,
    0
  );
  const remainingTasks = totalTasks - completedTasks;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E4DC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#667067]">
            <span className="w-2 h-2 rounded-full bg-[#2E6B3F]" />
            <span>Active Student Trajectory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421] tracking-tight">
            {analysis.studentProfile.major} Workspace
          </h1>
          <p className="text-sm text-[#555C56] max-w-xl">
            Tracking your trajectory toward <strong className="text-[#1F2421]">{analysis.bestCareerMatch.title}</strong> ({analysis.bestCareerMatch.matchPercentage}% algorithmic compatibility).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('analyzer')}
            className="px-4 py-2.5 rounded-xl border border-[#DCD6CA] text-xs font-semibold text-[#2C332E] bg-[#FAF9F6] hover:bg-[#F2EFE8] transition-colors"
          >
            Re-run Analyzer
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#23412E] text-white hover:bg-[#1B3224] transition-all shadow-xs"
          >
            Open Roadmap
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E4DC] shadow-xs space-y-2">
          <span className="text-xs font-semibold text-[#667067] uppercase tracking-wider">Career Readiness</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#1F2421]">
              {analysis.careerReadiness.overallScore}%
            </span>
            <span className="text-xs font-bold text-[#23412E] bg-[#EBF2EB] px-2 py-0.5 rounded">
              High Tier
            </span>
          </div>
          <p className="text-[11px] text-[#555C56]">Technical index: {analysis.careerReadiness.technicalScore}%</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E4DC] shadow-xs space-y-2">
          <span className="text-xs font-semibold text-[#667067] uppercase tracking-wider">Best Career Match</span>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-[#1F2421] truncate pr-2">
              {analysis.bestCareerMatch.title}
            </span>
            <span className="text-xs font-bold text-[#23412E] bg-[#EBF2EB] px-2 py-0.5 rounded shrink-0">
              {analysis.bestCareerMatch.matchPercentage}%
            </span>
          </div>
          <p className="text-[11px] text-[#555C56]">{analysis.bestCareerMatch.primaryDomain || 'Target role'}</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E4DC] shadow-xs space-y-2">
          <span className="text-xs font-semibold text-[#667067] uppercase tracking-wider">Skills Acquired</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#1F2421]">
              {analysis.skillGap.youHave.length}
            </span>
            <span className="text-xs font-medium text-[#4B544E]">
              {analysis.skillGap.youNeed.length} missing
            </span>
          </div>
          <p className="text-[11px] text-[#555C56]">Priority focus: {analysis.skillGap.prioritySkills[0] || 'SQL'}</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E4DC] shadow-xs space-y-2">
          <span className="text-xs font-semibold text-[#667067] uppercase tracking-wider">Roadmap Progress</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#1F2421]">
              {progressPercent}%
            </span>
            <span className="text-xs font-medium text-[#4B544E]">
              {completedTasks}/{totalTasks} tasks
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#EAE6DE] rounded-full overflow-hidden">
            <div className="h-full bg-[#23412E] rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Main Dashboard Section: 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Readiness Gauge + Roadmap Status */}
        <div className="lg:col-span-7 space-y-8">
          {/* Readiness Gauge */}
          <CareerReadinessGauge data={analysis.careerReadiness} />

          {/* Sequential Stage Roadmap Progress */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E4DC] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#667067]">Milestone Tracking</span>
                <h3 className="text-lg font-bold text-[#1F2421]">Roadmap Progression</h3>
              </div>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="text-xs font-semibold text-[#23412E] hover:underline flex items-center gap-1"
              >
                <span>View Full Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {analysis.learningRoadmap.map((stage, idx) => {
                const doneCount = stage.tasks.filter(t => t.completed).length;
                const stagePct = Math.round((doneCount / stage.tasks.length) * 100);

                return (
                  <div
                    key={stage.stepNumber}
                    className="p-4 rounded-xl border border-[#E8E4DC] bg-[#FAF9F6] space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EAE6DE] text-[#333A35]">
                          {stage.stepNumber}
                        </span>
                        <span className="text-sm font-bold text-[#1F2421]">{stage.title}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#48524B]">
                        {doneCount} / {stage.tasks.length} ({stagePct}%)
                      </span>
                    </div>

                    <div className="h-2 w-full bg-[#E5E1D8] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#23412E] rounded-full transition-all duration-300"
                        style={{ width: `${stagePct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Portfolio Capstone Tracker */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E4DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#667067]">Portfolio Builder</span>
                <h3 className="text-lg font-bold text-[#1F2421]">Featured Project Capstone</h3>
              </div>
              <span className="text-xs font-semibold text-[#23412E] bg-[#EBF2EB] px-2.5 py-1 rounded-full">
                {analysis.recommendedProjects[0]?.difficulty || 'Intermediate'}
              </span>
            </div>

            {analysis.recommendedProjects[0] && (
              <div className="p-4 rounded-xl border border-[#DCE4DC] bg-[#F8FAF8] space-y-3">
                <h4 className="text-sm font-bold text-[#1F2421]">
                  {analysis.recommendedProjects[0].title}
                </h4>
                <p className="text-xs text-[#4F5951] leading-relaxed">
                  {analysis.recommendedProjects[0].description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analysis.recommendedProjects[0].skillsCovered.map((sc, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-[#23412E] border border-[#D1DDD1]">
                      {sc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): AI Recommendations, Skill Gap & Matches */}
        <div className="lg:col-span-5 space-y-8">
          {/* AI Strategic Advice */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E4DC] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#23412E]">
              <BookOpen className="w-4 h-4 text-[#23412E]" />
              <span>Current Strategic Directives</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE6DB] space-y-2">
              <span className="text-xs font-bold text-[#8C5E28] uppercase tracking-wider">AI Recommendation</span>
              <p className="text-xs sm:text-sm text-[#2D3530] font-medium leading-relaxed">
                "{analysis.aiRecommendation}"
              </p>
            </div>

            {/* Resume recommendations list */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-[#1F2421]">Resume & Positioning Guidance</span>
              <ul className="space-y-2">
                {analysis.resumeImprovements.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="text-xs text-[#525B54] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D704D] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Alternative Careers Snapshot */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E4DC] shadow-xs space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#667067]">Market Alternatives</span>
              <h3 className="text-lg font-bold text-[#1F2421]">Compatible Career Paths</h3>
            </div>

            <div className="space-y-2.5">
              {analysis.alternativeCareers.map((alt, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[#E8E4DC] bg-white flex items-center justify-between hover:border-[#D1DDD1] transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#1F2421] block">{alt.title}</span>
                    <span className="text-[11px] text-[#636C65]">{alt.salaryRange || '$70k - $95k'}</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-[#EBF2EB] text-[#23412E]">
                    {alt.matchPercentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

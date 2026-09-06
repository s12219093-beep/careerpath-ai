import React, { useState } from 'react';
import { AICareerAnalysisResult, RoadmapStage, RoadmapTask } from '../types';
import { CheckCircle2, Circle, Clock, Briefcase, FileText, ChevronRight, Award, Lightbulb, Sparkles, FolderGit2, BookOpen } from 'lucide-react';

interface RoadmapViewProps {
  analysis: AICareerAnalysisResult;
  onTaskToggle: (stageIndex: number, taskId: string) => void;
  setActiveTab?: (tab: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  analysis,
  onTaskToggle,
  setActiveTab
}) => {
  const [activeStageFilter, setActiveStageFilter] = useState<string>('all');
  const [expandedProject, setExpandedProject] = useState<string | null>(analysis.recommendedProjects[0]?.id || null);

  const totalTasks = analysis.learningRoadmap.reduce((acc, stage) => acc + stage.tasks.length, 0);
  const completedTasks = analysis.learningRoadmap.reduce(
    (acc, stage) => acc + stage.tasks.filter((t) => t.completed).length,
    0
  );
  const overallProgressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Banner: Position & Target Goal */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E8E4DC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#667067]">
            <span>Personalized Execution Path</span>
            <span className="w-1 h-1 rounded-full bg-[#A9B2AA]" />
            <span className="text-[#23412E]">{analysis.bestCareerMatch.primaryDomain || 'Career Track'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421] tracking-tight">
            Target: {analysis.bestCareerMatch.title}
          </h1>
          <p className="text-sm text-[#555C56] max-w-2xl">
            A milestone-based curriculum engineered to bridge your current {analysis.studentProfile.major} academic status to day-one job readiness.
          </p>
        </div>

        {/* Milestone Progress pill */}
        <div className="bg-[#F8FAF8] border border-[#DCE8DC] p-4 rounded-xl min-w-[220px] flex flex-col justify-center">
          <div className="flex justify-between items-center text-xs font-semibold text-[#243527] mb-1.5">
            <span>Roadmap Completion</span>
            <span className="text-sm font-bold text-[#1B3224]">{overallProgressPercentage}%</span>
          </div>
          <div className="h-2 w-full bg-[#E5EFE5] rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[#23412E] rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-[#4F6352] font-medium">
            {completedTasks} of {totalTasks} milestones completed
          </p>
        </div>
      </div>

      {/* Main Roadmap Timeline Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#667067]">Sequential Stages</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F2421] tracking-tight">Interactive Career Stages</h2>
          </div>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#F4F1EA] p-1 rounded-xl border border-[#E5E0D6] text-xs">
            <button
              onClick={() => setActiveStageFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeStageFilter === 'all' ? 'bg-white text-[#1F2421] shadow-xs font-semibold' : 'text-[#5A635B]'
              }`}
            >
              All 4 Stages
            </button>
            {analysis.learningRoadmap.map((stage) => (
              <button
                key={stage.stageCode}
                onClick={() => setActiveStageFilter(stage.stageCode)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeStageFilter === stage.stageCode ? 'bg-white text-[#1F2421] shadow-xs font-semibold' : 'text-[#5A635B]'
                }`}
              >
                {stage.stepNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-[#E2DDD2] before:hidden sm:before:block">
          {analysis.learningRoadmap
            .filter((stage) => activeStageFilter === 'all' || activeStageFilter === stage.stageCode)
            .map((stage, sIdx) => {
              const stageTasksCompleted = stage.tasks.filter((t) => t.completed).length;
              const isStageDone = stageTasksCompleted === stage.tasks.length;
              const isStageInProgress = stageTasksCompleted > 0 && !isStageDone;

              return (
                <div key={stage.stepNumber} className="relative sm:pl-16">
                  {/* Step Marker on connecting line (desktop) */}
                  <div className="hidden sm:flex absolute left-4 -translate-x-1/2 top-6 w-8 h-8 rounded-full items-center justify-center font-bold text-xs border-2 bg-white z-10 transition-colors shadow-xs">
                    {isStageDone ? (
                      <div className="w-full h-full rounded-full bg-[#23412E] text-white flex items-center justify-center">
                        ✓
                      </div>
                    ) : (
                      <span className={isStageInProgress ? 'text-[#23412E] border-[#23412E]' : 'text-[#7D857E]'}>
                        0{sIdx + 1}
                      </span>
                    )}
                  </div>

                  {/* Stage Card */}
                  <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E4DC] shadow-xs space-y-5">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0ECE4] pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#F2EFE8] text-[#4E5650] tracking-wider">
                            {stage.stepNumber}
                          </span>
                          <span className="text-xs font-medium text-[#6F7670]">{stage.subtitle}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#1F2421]">{stage.title}</h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F4F2EB] text-[#475049]">
                          {stageTasksCompleted}/{stage.tasks.length} Completed
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#4E5650] leading-relaxed">
                      {stage.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[#6F7670] font-medium mr-1">Skills covered:</span>
                      {stage.skills.map((skill, kIdx) => (
                        <span
                          key={kIdx}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#F4F6F4] text-[#243527] border border-[#DCE4DC]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Checklist */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#667067] block">
                        Actionable Milestones (Click to Mark Complete)
                      </span>
                      {stage.tasks.map((task) => (
                        <button
                          key={task.id}
                          onClick={() => onTaskToggle(sIdx, task.id)}
                          className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all text-sm ${
                            task.completed
                              ? 'bg-[#F9FCF9] border-[#CDE1CD] text-[#243527]'
                              : 'bg-white border-[#E8E4DC] text-[#2C332E] hover:border-[#D1DDD1] hover:bg-[#FAF9F6]'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-[#2E6B3F] fill-[#EAF4EA]" />
                            ) : (
                              <Circle className="w-5 h-5 text-[#A6AEA7]" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <span className={`font-semibold ${task.completed ? 'line-through text-[#637265]' : ''}`}>
                              {task.name}
                            </span>
                            {task.resourceHint && (
                              <p className="text-xs text-[#6B756E] italic">
                                💡 Tip: {task.resourceHint}
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Recommended Projects Section */}
      <div className="space-y-6 pt-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#667067]">Portfolio Evidence</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F2421] tracking-tight">Recommended Portfolio Projects</h2>
          <p className="text-sm text-[#555C56] mt-1">
            Real-world capstones designed to eliminate the "no experience" paradox on graduate resumes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analysis.recommendedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl p-6 border border-[#E8E4DC] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D1DDD1] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EBF2EB] text-[#23412E]">
                    {project.difficulty}
                  </span>
                  <span className="text-xs text-[#667067] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {project.estimatedHours}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1F2421] leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs text-[#525B54] leading-relaxed">
                  {project.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#667067] block">
                    Core Deliverables
                  </span>
                  <ul className="space-y-1">
                    {project.deliverables.map((d, dIdx) => (
                      <li key={dIdx} className="text-xs text-[#3E4740] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3D704D]" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EFECE5]">
                <div className="flex flex-wrap gap-1">
                  {project.skillsCovered.map((sc, sIdx) => (
                    <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-[#F4F1EA] text-[#4E5650]">
                      {sc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Prep Flashcards Section */}
      <div className="space-y-6 pt-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#667067]">Target Role Mastery</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F2421] tracking-tight">Interview Preparation Topics</h2>
          <p className="text-sm text-[#555C56] mt-1">
            High-frequency technical and behavioral questions specifically evaluated for {analysis.bestCareerMatch.title}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysis.interviewPreparation.map((prep) => (
            <div
              key={prep.id}
              className="bg-white rounded-2xl p-6 border border-[#E8E4DC] shadow-xs space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3EFE8] text-[#4E544F]">
                  {prep.category}
                </span>
                <span className="text-xs font-semibold text-[#23412E]">{prep.topic}</span>
              </div>

              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#ECE6DB]">
                <span className="text-[11px] font-bold text-[#8C5E28] uppercase tracking-wider block mb-1">
                  Sample Interview Prompt
                </span>
                <p className="text-sm font-semibold text-[#252A26] italic">
                  "{prep.sampleQuestion}"
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#323934] block">Recommended Framework & Strategy</span>
                <p className="text-xs text-[#525C54] leading-relaxed">
                  {prep.recommendedAnswerStrategy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

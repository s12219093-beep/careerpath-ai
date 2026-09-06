import React from 'react';
import { Check, AlertCircle, ArrowRight, Zap, Target } from 'lucide-react';

interface SkillGapVisualizerProps {
  youHave: string[];
  youNeed: string[];
  prioritySkills: string[];
  onBuildLearningPlan?: () => void;
}

export const SkillGapVisualizer: React.FC<SkillGapVisualizerProps> = ({
  youHave,
  youNeed,
  prioritySkills,
  onBuildLearningPlan,
}) => {
  return (
    <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 border border-[#E8E4DC] shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#667067]">Comparative Diagnostics</span>
          <h3 className="text-xl font-bold text-[#1F2421] tracking-tight mt-0.5">Your Skill Gap</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-md bg-[#F4F1EA] text-[#4E544F] font-medium border border-[#E6E0D4]">
            {youHave.length} Validated
          </span>
          <span className="text-xs px-2.5 py-1 rounded-md bg-[#FFF5EB] text-[#8C4A19] font-medium border border-[#F6DEC9]">
            {youNeed.length} Missing Target
          </span>
        </div>
      </div>

      {/* Two Columns: You Have vs You Need */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1: You Have */}
        <div className="bg-[#F8FAF8] rounded-xl p-4 sm:p-5 border border-[#E0ECE0]">
          <div className="flex items-center justify-between mb-3.5">
            <h4 className="text-sm font-bold text-[#1B3224] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#2E6B3F] text-white flex items-center justify-center text-xs">
                ✓
              </span>
              You Have
            </h4>
            <span className="text-xs text-[#4F6A52] font-medium">Acquired proficiencies</span>
          </div>

          <div className="space-y-2.5">
            {youHave.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-lg border border-[#E2ECE2] text-sm text-[#243527] shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#3D704D]" />
                  <span className="font-semibold">{skill}</span>
                </div>
                <span className="text-[11px] font-medium text-[#48634B] bg-[#EAF2EA] px-2 py-0.5 rounded">
                  Validated
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: You Need */}
        <div className="bg-[#FAF9F5] rounded-xl p-4 sm:p-5 border border-[#EDE7DB]">
          <div className="flex items-center justify-between mb-3.5">
            <h4 className="text-sm font-bold text-[#42321D] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#8C5E28] text-white flex items-center justify-center text-xs">
                !
              </span>
              You Need
            </h4>
            <span className="text-xs text-[#786650] font-medium">Required for target role</span>
          </div>

          <div className="space-y-2.5">
            {youNeed.map((skill, index) => {
              const isPriority = prioritySkills.includes(skill);
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-sm shadow-xs transition-colors ${
                    isPriority
                      ? 'bg-white border-[#E6D4BD] text-[#332617]'
                      : 'bg-white/80 border-[#E8E2D6] text-[#4A453E]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${isPriority ? 'bg-[#965A20]' : 'bg-[#9E978C]'}`} />
                    <span className="font-semibold">{skill}</span>
                  </div>
                  {isPriority ? (
                    <span className="text-[11px] font-semibold text-[#8C4A19] bg-[#FDF0E2] px-2 py-0.5 rounded border border-[#F8DEC0]">
                      Priority
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#6E675E] bg-[#F3EFE8] px-2 py-0.5 rounded">
                      Required
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Priority Skills Callout & Action */}
      <div className="mt-6 pt-6 border-t border-[#EAE6DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#667067] mb-1.5">
            <Zap className="w-3.5 h-3.5 text-[#965A20]" />
            Immediate Development Priorities
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {prioritySkills.map((pSkill, idx) => (
              <span
                key={pSkill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-[#F4F1EA] text-[#2C332E] border border-[#E0DBD0]"
              >
                <span className="text-[#8C5E28] font-extrabold">{idx + 1}.</span>
                {pSkill}
              </span>
            ))}
          </div>
        </div>

        {onBuildLearningPlan && (
          <button
            onClick={onBuildLearningPlan}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#23412E] text-white hover:bg-[#1B3224] transition-all shadow-xs active:translate-y-px whitespace-nowrap"
          >
            <span>Build My Learning Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

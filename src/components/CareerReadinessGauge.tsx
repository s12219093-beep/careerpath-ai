import React, { useEffect, useState } from 'react';
import { CareerReadinessBreakdown } from '../types';
import { Award, CheckCircle, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

interface CareerReadinessGaugeProps {
  data: CareerReadinessBreakdown;
  size?: 'normal' | 'compact';
}

export const CareerReadinessGauge: React.FC<CareerReadinessGaugeProps> = ({
  data,
  size = 'normal'
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = data.overallScore / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= data.overallScore) {
        setAnimatedScore(data.overallScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [data.overallScore]);

  // Circular gauge geometry
  const radius = size === 'compact' ? 52 : 72;
  const strokeWidth = size === 'compact' ? 9 : 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const subMetrics = [
    { label: 'Technical Skills', score: data.technicalScore, color: '#3A6345' },
    { label: 'Communication', score: data.communicationScore, color: '#4E7D5B' },
    { label: 'Experience', score: data.experienceScore, color: '#6A8F74' },
    { label: 'Portfolio Strength', score: data.portfolioScore, color: '#8BA692' },
  ];

  return (
    <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 border border-[#E8E4DC] shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#667067]">Assessment Index</span>
          <h3 className="text-xl font-bold text-[#1F2421] tracking-tight mt-0.5">Career Readiness</h3>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EBF2EB] text-[#23412E]">
          <TrendingUp className="w-3.5 h-3.5" />
          Benchmarked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        {/* Circular Progress Gauge */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center p-3">
          <div className="relative flex items-center justify-center">
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90 transition-transform"
            >
              {/* Track */}
              <circle
                stroke="#EAE6DE"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Progress */}
              <circle
                stroke="#23412E"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>

            {/* Centered Number Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
                {animatedScore}%
              </span>
              <span className="text-[11px] font-semibold text-[#667067] uppercase tracking-wider mt-0.5">
                Readiness
              </span>
            </div>
          </div>

          <p className="text-xs text-[#5D6660] text-center mt-3 font-medium">
            {animatedScore >= 80 ? (
              <span className="text-[#23412E] font-semibold">Competitive candidate for target entry programs</span>
            ) : (
              <span>Approaching candidate readiness threshold (75%)</span>
            )}
          </p>
        </div>

        {/* Sub-scores Progress Bars */}
        <div className="sm:col-span-7 space-y-4">
          {subMetrics.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-[#363D37]">{item.label}</span>
                <span className="font-semibold text-[#1F2421]">{item.score}%</span>
              </div>
              <div className="h-2 w-full bg-[#EAE6DE] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${item.score}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

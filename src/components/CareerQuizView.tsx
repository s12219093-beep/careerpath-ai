import React, { useState } from 'react';
import { careerQuizQuestions } from '../data/mockCareerData';
import { QuizResult } from '../types';
import { evaluateQuizAnswers } from '../utils/careerEngine';
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, Sparkles, Compass, Lightbulb } from 'lucide-react';

interface CareerQuizViewProps {
  onQuizComplete: (result: QuizResult) => void;
  setActiveTab: (tab: string) => void;
}

export const CareerQuizView: React.FC<CareerQuizViewProps> = ({
  onQuizComplete,
  setActiveTab
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const currentQ = careerQuizQuestions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / careerQuizQuestions.length) * 100);
  const currentSelection = selectedAnswers[currentQ.id];

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleNext = async () => {
    if (currentQuestionIndex < careerQuizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz complete, evaluate
      setIsEvaluating(true);
      const answerIds: string[] = Object.values(selectedAnswers);
      
      // Try backend endpoint if available or fallback
      try {
        const res = await fetch('/api/quiz-evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selectedOptionIds: answerIds })
        });
        if (res.ok) {
          const data = await res.json();
          setQuizResult(data);
          onQuizComplete(data);
        } else {
          const fallback = evaluateQuizAnswers(answerIds);
          setQuizResult(fallback);
          onQuizComplete(fallback);
        }
      } catch (err) {
        const fallback = evaluateQuizAnswers(answerIds);
        setQuizResult(fallback);
        onQuizComplete(fallback);
      } finally {
        setIsEvaluating(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!quizResult ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E4DC] shadow-xs space-y-8">
          {/* Header & Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#667067] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#23412E]" />
                Career Archetype Assessment
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F4F1EA] text-[#363E39]">
                Question {currentQuestionIndex + 1} of {careerQuizQuestions.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-[#F0EDE6] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#23412E] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F2421] tracking-tight leading-snug">
              {currentQ.question}
            </h2>
            {currentQ.subtitle && (
              <p className="text-sm text-[#667067]">
                {currentQ.subtitle}
              </p>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-3.5">
            {currentQ.options.map((option) => {
              const isSelected = currentSelection === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#F9FCF9] border-[#2E6B3F] ring-1 ring-[#2E6B3F] shadow-xs'
                      : 'bg-white border-[#E8E4DC] hover:border-[#D1DDD1] hover:bg-[#FAF9F5]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-sm sm:text-base font-bold text-[#1F2421] block">
                      {option.label}
                    </span>
                    <p className="text-xs sm:text-sm text-[#5C665F] leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                  <div className="mt-1 shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#23412E] bg-[#23412E] text-white'
                          : 'border-[#CBD3CC] bg-white'
                      }`}
                    >
                      {isSelected && <span className="text-xs">✓</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F0ECE4]">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentQuestionIndex === 0
                  ? 'text-[#A0A8A2] cursor-not-allowed'
                  : 'text-[#48524A] hover:bg-[#F2EFE8]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!currentSelection || isEvaluating}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-xs ${
                !currentSelection || isEvaluating
                  ? 'bg-[#A2B3A6] cursor-not-allowed'
                  : 'bg-[#23412E] hover:bg-[#1B3224] active:translate-y-px'
              }`}
            >
              {isEvaluating ? (
                <span>Synthesizing Profile...</span>
              ) : currentQuestionIndex === careerQuizQuestions.length - 1 ? (
                <>
                  <span>Reveal My Career Profile</span>
                  <Sparkles className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Result View */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E4DC] shadow-xs space-y-8 animate-in fade-in duration-300">
          {/* Result Badge */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF2EB] text-[#23412E] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Assessment Complete
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
              {quizResult.archetype}
            </h2>
            <p className="text-base text-[#525B54] max-w-xl mx-auto italic font-medium">
              "{quizResult.tagline}"
            </p>
          </div>

          <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#ECE6DB] text-sm text-[#454E47] leading-relaxed">
            {quizResult.summary}
          </div>

          {/* Strengths */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#667067]">
              Identified Core Strengths
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quizResult.coreStrengths.map((str, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E8E4DC] text-xs font-semibold text-[#1F2421]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2E6B3F] shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Matches */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#667067]">
              Highest Compatibility Career Matches
            </h3>
            <div className="space-y-3">
              {quizResult.topCareerMatches.map((career, cIdx) => (
                <div
                  key={cIdx}
                  className="p-4 rounded-xl border border-[#E8E4DC] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base font-bold text-[#1F2421]">{career.title}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EBF2EB] text-[#23412E]">
                        {career.compatibility}% Match
                      </span>
                    </div>
                    <p className="text-xs text-[#5E6761]">{career.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-[#F0ECE4] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#5A635B] hover:bg-[#F2EFE8] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Career Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('analyzer')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#23412E] text-white hover:bg-[#1B3224] transition-all shadow-xs"
            >
              <span>Transfer Profile to AI Analyzer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

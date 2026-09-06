/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';
import { FeaturesSection } from './components/FeaturesSection';
import { CareerAnalyzer } from './components/CareerAnalyzer';
import { DashboardView } from './components/DashboardView';
import { CareerQuizView } from './components/CareerQuizView';
import { RoadmapView } from './components/RoadmapView';
import { AboutView } from './components/AboutView';
import { AICareerAnalysisResult, QuizResult } from './types';
import { initialAnalysisResult } from './data/mockCareerData';
import {
  Compass,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  BarChart3
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentAnalysis, setCurrentAnalysis] = useState<AICareerAnalysisResult | null>(initialAnalysisResult);
  const [isOpenAIReady, setIsOpenAIReady] = useState(false);

  // Check backend server config on mount
  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.hasOpenAIKey) {
          setIsOpenAIReady(true);
        }
      })
      .catch((err) => {
        console.log('Server config check, using client synthesis fallback:', err);
      });
  }, []);

  // Handle task completion toggle in roadmap
  const handleTaskToggle = (stageIndex: number, taskId: string) => {
    if (!currentAnalysis) return;

    setCurrentAnalysis((prev) => {
      if (!prev) return null;

      const newRoadmap = [...prev.learningRoadmap];
      const targetStage = { ...newRoadmap[stageIndex] };
      const newTasks = targetStage.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      targetStage.tasks = newTasks;
      newRoadmap[stageIndex] = targetStage;

      // Calculate new completed tasks
      const allTasks = newRoadmap.flatMap((s) => s.tasks);
      const completed = allTasks.filter((t) => t.completed).length;
      const completionRatio = completed / allTasks.length;

      // Adjust readiness dynamically
      const baseScore = 70;
      const boostedScore = Math.min(98, Math.round(baseScore + completionRatio * 25));

      return {
        ...prev,
        learningRoadmap: newRoadmap,
        careerReadiness: {
          ...prev.careerReadiness,
          overallScore: boostedScore,
          portfolioScore: Math.min(96, prev.careerReadiness.portfolioScore + (completed > 2 ? 4 : 0))
        }
      };
    });
  };

  const handleAnalysisGenerated = (result: AICareerAnalysisResult) => {
    setCurrentAnalysis(result);
  };

  const handleQuizComplete = (quizRes: QuizResult) => {
    // Optionally pre-populate or switch
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1F2421] flex flex-col font-sans selection:bg-[#D1DDD1] selection:text-[#1B3224]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasAnalysis={Boolean(currentAnalysis)}
        isOpenAIReady={isOpenAIReady}
      />

      {/* Main Content Render */}
      <main className="grow">
        {activeTab === 'home' && (
          <div>
            {/* Hero */}
            <HomeHero
              onAnalyzeClick={() => {
                setActiveTab('analyzer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onQuizClick={() => {
                setActiveTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Features Section */}
            <FeaturesSection setActiveTab={setActiveTab} />

            {/* Live Sample Result Showcase (Section 19) */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-[#48634B]">
                  Sample AI Output Showcase
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
                  High-Precision Career Synthesis
                </h2>
                <p className="text-sm text-[#555E57] leading-relaxed">
                  See how CareerPath AI evaluates a senior Management Information Systems student profile into structured hiring diagnostics.
                </p>
              </div>

              {/* Sample Profile Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E4DC] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#F4F1EA] text-[#2C332E]">
                      Student Profile
                    </span>
                    <span className="text-xs text-[#6E736E] font-medium">Undergraduate Senior</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1F2421]">
                    Management Information Systems
                  </h3>

                  <div className="space-y-2 text-xs text-[#4F5550]">
                    <div className="flex items-center justify-between border-b border-[#F2EEE6] pb-1.5">
                      <span className="font-semibold text-[#1F2421]">Current Skills:</span>
                      <span>Excel, SQL, Communication, Power BI</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#F2EEE6] pb-1.5">
                      <span className="font-semibold text-[#1F2421]">Academic Interests:</span>
                      <span>Business, Technology, Data</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#F2EEE6] pb-1.5">
                      <span className="font-semibold text-[#1F2421]">Experience:</span>
                      <span>University Projects & Case Competitions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1F2421]">Target Industry:</span>
                      <span>Technology</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setActiveTab('analyzer');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#23412E] hover:text-[#1B3224] transition-colors"
                    >
                      <span>Load this profile in Analyzer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* AI Result Cards on the right */}
                <div className="lg:col-span-7 bg-[#FAF9F6] p-6 rounded-xl border border-[#E8E4DC] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#667067]">
                        Optimal Recommendation
                      </span>
                      <h4 className="text-lg font-bold text-[#1F2421]">Business Analyst</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#23412E]">92%</span>
                      <span className="text-[10px] text-[#4F6A52] font-semibold block uppercase">Compatibility</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4E5650] leading-relaxed">
                    "Your combination of analytical thinking, business knowledge, communication skills, and interest in technology makes this role a strong match."
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-white p-3 rounded-lg border border-[#E2DDD2] text-xs">
                      <span className="font-bold text-[#1B3224] block mb-1">Career Readiness: 84%</span>
                      <span className="text-[11px] text-[#636C65]">Technical: 78% · Comm: 86%</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-[#E2DDD2] text-xs">
                      <span className="font-bold text-[#8C5E28] block mb-1">Missing Priorities</span>
                      <span className="text-[11px] text-[#636C65]">Python, Statistics, Adv SQL</span>
                    </div>
                  </div>

                  <div className="bg-[#EBF2EB] p-3 rounded-lg text-xs text-[#23412E] font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Focus on SQL and Power BI first, then build one real-world business analysis capstone.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* University & Career Center Trust Banner */}
            <section className="py-12 bg-[#F2EEE7] border-t border-[#E2DDD2]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#667067]">
                  University Career Center Standard
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1F2421]">
                  Engineered for Higher Education & Graduate Transition
                </h3>
                <p className="text-xs sm:text-sm text-[#555E57] max-w-2xl mx-auto">
                  Trusted by university counseling departments, academic advisors, and undergraduate student bodies to bridge diploma requirements with actual market expectations.
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'analyzer' && (
          <CareerAnalyzer
            currentAnalysis={currentAnalysis}
            onAnalysisGenerated={handleAnalysisGenerated}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'dashboard' && (
          currentAnalysis ? (
            <DashboardView
              analysis={currentAnalysis}
              setActiveTab={setActiveTab}
              onTaskToggle={handleTaskToggle}
            />
          ) : (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
              <h2 className="text-2xl font-bold text-[#1F2421]">No Career Profile Analyzed Yet</h2>
              <p className="text-sm text-[#667067]">
                Please run the AI Career Analyzer first to populate your student dashboard.
              </p>
              <button
                onClick={() => setActiveTab('analyzer')}
                className="px-6 py-3 rounded-xl font-bold bg-[#23412E] text-white hover:bg-[#1B3224]"
              >
                Go to Career Analyzer
              </button>
            </div>
          )
        )}

        {activeTab === 'quiz' && (
          <CareerQuizView
            onQuizComplete={handleQuizComplete}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'roadmap' && (
          currentAnalysis ? (
            <RoadmapView
              analysis={currentAnalysis}
              onTaskToggle={handleTaskToggle}
              setActiveTab={setActiveTab}
            />
          ) : (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
              <h2 className="text-2xl font-bold text-[#1F2421]">No Active Roadmap</h2>
              <p className="text-sm text-[#667067]">
                Generate an analysis first to unlock your personalized 4-step career roadmap.
              </p>
              <button
                onClick={() => setActiveTab('analyzer')}
                className="px-6 py-3 rounded-xl font-bold bg-[#23412E] text-white hover:bg-[#1B3224]"
              >
                Go to Career Analyzer
              </button>
            </div>
          )
        )}

        {activeTab === 'about' && (
          <AboutView setActiveTab={setActiveTab} />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

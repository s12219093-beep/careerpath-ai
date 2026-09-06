export interface StudentProfile {
  major: string;
  academicLevel: string;
  skills: string[];
  interests: string[];
  experience: string;
  targetIndustry: string;
  preferredRole: string;
  workEnvironment: string;
}

export interface CareerMatch {
  title: string;
  matchPercentage: number;
  fitReason: string;
  salaryRange?: string;
  growthOutlook?: string;
  primaryDomain?: string;
}

export interface CareerReadinessBreakdown {
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  experienceScore: number;
  portfolioScore: number;
}

export interface SkillItem {
  name: string;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  importanceDesc?: string;
}

export interface RoadmapTask {
  id: string;
  name: string;
  completed: boolean;
  type: 'skill' | 'project' | 'milestone' | 'prep';
  resourceHint?: string;
}

export interface RoadmapStage {
  stepNumber: string;
  stageCode: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  tasks: RoadmapTask[];
}

export interface RecommendedProject {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skillsCovered: string[];
  estimatedHours: string;
}

export interface InterviewTopic {
  id: string;
  topic: string;
  category: 'Technical' | 'Behavioral' | 'Case Study';
  sampleQuestion: string;
  recommendedAnswerStrategy: string;
}

export interface AICareerAnalysisResult {
  id: string;
  timestamp: string;
  studentProfile: StudentProfile;
  careerProfileSummary: string;
  bestCareerMatch: CareerMatch;
  alternativeCareers: CareerMatch[];
  careerReadiness: CareerReadinessBreakdown;
  strongAreas: string[];
  needsDevelopment: string[];
  skillGap: {
    youHave: string[];
    youNeed: string[];
    prioritySkills: string[];
  };
  recommendedSkills: Array<{
    name: string;
    whyNeeded: string;
    estimatedWeeks: string;
    priority: 'Critical' | 'Recommended' | 'Value-Add';
  }>;
  aiRecommendation: string;
  learningRoadmap: RoadmapStage[];
  recommendedProjects: RecommendedProject[];
  interviewPreparation: InterviewTopic[];
  resumeImprovements: string[];
  aiSource: 'openai' | 'intelligent_engine';
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: Array<{
    id: string;
    label: string;
    description: string;
    dominantTrait: string;
    suggestedCareers: string[];
  }>;
}

export interface QuizResult {
  archetype: string;
  tagline: string;
  summary: string;
  coreStrengths: string[];
  topCareerMatches: Array<{
    title: string;
    compatibility: number;
    description: string;
  }>;
  suggestedMajorFit: string;
  recommendedFirstStep: string;
}

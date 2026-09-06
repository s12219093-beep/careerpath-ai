import { AICareerAnalysisResult, StudentProfile, QuizQuestion } from '../types';

export const sampleMISProfile: StudentProfile = {
  major: "Management Information Systems",
  academicLevel: "Senior / Final Year",
  skills: ["Excel", "SQL", "Communication", "Power BI"],
  interests: ["Business", "Technology", "Data"],
  experience: "University Projects & Case Competitions",
  targetIndustry: "Technology",
  preferredRole: "Analytical & Strategic",
  workEnvironment: "Hybrid"
};

export const sampleCSProfile: StudentProfile = {
  major: "Computer Science",
  academicLevel: "Senior / Final Year",
  skills: ["Python", "Java", "Data Structures", "Git"],
  interests: ["Software Engineering", "Cloud Computing", "Algorithms"],
  experience: "1 Internship & Academic Projects",
  targetIndustry: "Technology",
  preferredRole: "Technical & Engineering",
  workEnvironment: "Remote"
};

export const sampleFinanceProfile: StudentProfile = {
  major: "Finance & Economics",
  academicLevel: "Junior",
  skills: ["Financial Modeling", "Excel", "Accounting", "Data Presentation"],
  interests: ["Investment Banking", "Corporate Finance", "Markets"],
  experience: "Student Investment Fund Member",
  targetIndustry: "Financial Services",
  preferredRole: "Analytical & Strategic",
  workEnvironment: "In-Office"
};

export const initialAnalysisResult: AICareerAnalysisResult = {
  id: "analysis-mis-92",
  timestamp: new Date().toISOString(),
  studentProfile: sampleMISProfile,
  careerProfileSummary: "A multidisciplinary student bridge combining technical data literacy, systems logic, and business fluency. Positioned strongly for technology-enabled business optimization and advisory roles.",
  bestCareerMatch: {
    title: "Business Analyst",
    matchPercentage: 92,
    fitReason: "Your combination of analytical thinking, business knowledge, communication skills, and interest in technology makes this role a strong match. You bridge operational stakeholders and engineering execution effectively.",
    salaryRange: "$74,000 - $98,000 / yr",
    growthOutlook: "+14% (Faster than average)",
    primaryDomain: "Business Operations & Systems"
  },
  alternativeCareers: [
    {
      title: "ERP Consultant",
      matchPercentage: 87,
      fitReason: "High synergy with systems architecture, enterprise software configurations, and enterprise process redesign.",
      salaryRange: "$80,000 - $105,000 / yr",
      growthOutlook: "+11% (High Demand)"
    },
    {
      title: "Data Analyst",
      matchPercentage: 81,
      fitReason: "Strong fit with your SQL and Power BI foundation, requiring further expansion into exploratory statistics and data storytelling.",
      salaryRange: "$68,000 - $90,000 / yr",
      growthOutlook: "+23% (Very High Demand)"
    },
    {
      title: "Digital Transformation Specialist",
      matchPercentage: 78,
      fitReason: "Balances change management, process automation, and cloud adoption initiatives across legacy organizations.",
      salaryRange: "$76,000 - $102,000 / yr",
      growthOutlook: "+16% (Expanding Field)"
    }
  ],
  careerReadiness: {
    overallScore: 84,
    technicalScore: 78,
    communicationScore: 86,
    experienceScore: 64,
    portfolioScore: 72
  },
  strongAreas: [
    "Analytical thinking",
    "Business knowledge",
    "Communication & stakeholder briefing",
    "Structured problem solving"
  ],
  needsDevelopment: [
    "Advanced SQL & CTEs",
    "Statistical foundations",
    "Requirements Gathering & User Stories",
    "Interactive Data Visualization"
  ],
  skillGap: {
    youHave: ["SQL", "Excel", "Communication", "Power BI"],
    youNeed: ["Python", "Data Analysis", "Statistics", "Advanced SQL"],
    prioritySkills: ["Python", "Statistics", "Advanced SQL"]
  },
  recommendedSkills: [
    {
      name: "Advanced SQL & CTEs",
      whyNeeded: "Essential for complex relational querying, database optimization, and window function transformations.",
      estimatedWeeks: "3-4 weeks",
      priority: "Critical"
    },
    {
      name: "Applied Business Statistics",
      whyNeeded: "Enables rigorous hypothesis testing, KPI variance modeling, and predictive cohort forecasting.",
      estimatedWeeks: "4-5 weeks",
      priority: "Critical"
    },
    {
      name: "Python for Data Analysis",
      whyNeeded: "Expands analytics capacity beyond Excel/BI into automated data wrangling with pandas.",
      estimatedWeeks: "5-6 weeks",
      priority: "Recommended"
    },
    {
      name: "Requirements Modeling (BPMN / Agile)",
      whyNeeded: "Translates business demands into technical specifications, user stories, and acceptance criteria.",
      estimatedWeeks: "2-3 weeks",
      priority: "Value-Add"
    }
  ],
  aiRecommendation: "Focus on advanced SQL and Power BI first. Then complete one real-world business analysis project and add it to your portfolio.",
  learningRoadmap: [
    {
      stepNumber: "STEP 01",
      stageCode: "foundation",
      title: "Foundation",
      subtitle: "Core Tooling & Business Principles",
      description: "Solidify relational database logic, multi-sheet modeling, and fundamental business process modeling.",
      skills: ["Excel Advanced Functions", "SQL Syntax & Joins", "Business Fundamentals"],
      tasks: [
        { id: "t1-1", name: "Master multi-table relational joins and database normalization", completed: true, type: "skill" },
        { id: "t1-2", name: "Build a dynamic 3-statement Excel financial & operational model", completed: true, type: "project" },
        { id: "t1-3", name: "Understand enterprise SDLC and Agile Scrum ceremony workflows", completed: true, type: "milestone" }
      ]
    },
    {
      stepNumber: "STEP 02",
      stageCode: "build_skills",
      title: "Build Skills",
      subtitle: "Analytical Rigor & Reporting",
      description: "Scale from manual reporting to interactive dashboards and hypothesis-driven statistical validation.",
      skills: ["Power BI DAX", "Data Analysis", "Statistics Foundations", "Advanced SQL"],
      tasks: [
        { id: "t2-1", name: "Build executive dashboard with Power BI DAX calculated measures", completed: true, type: "skill" },
        { id: "t2-2", name: "Write window functions and subqueries for user cohort retention", completed: false, type: "skill", resourceHint: "Focus on ROW_NUMBER(), DENSE_RANK(), and LEAD/LAG" },
        { id: "t2-3", name: "Complete A/B testing statistical significance analysis module", completed: false, type: "skill" }
      ]
    },
    {
      stepNumber: "STEP 03",
      stageCode: "build_experience",
      title: "Build Experience",
      subtitle: "Real-world Evidence & Impact",
      description: "Translate theoretical skills into public case studies, internships, and demonstrable client/university projects.",
      skills: ["End-to-end Case Study", "BPMN Diagramming", "Executive Presentation"],
      tasks: [
        { id: "t3-1", name: "Deliver an end-to-end ERP process optimization case study with documentation", completed: false, type: "project", resourceHint: "Include before/after workflow diagrams and measurable ROI impact" },
        { id: "t3-2", name: "Secure summer internship or university enterprise lab research role", completed: false, type: "milestone" },
        { id: "t3-3", name: "Publish an interactive GitHub/Notion portfolio breakdown", completed: false, type: "project" }
      ]
    },
    {
      stepNumber: "STEP 04",
      stageCode: "job_ready",
      title: "Job Ready",
      subtitle: "Market Positioning & Interviews",
      description: "Tailor applications for top-tier hiring pipelines, mock interviews, and technical screening rounds.",
      skills: ["CV Optimization", "Case Interview Mastery", "Behavioral STAR Stories"],
      tasks: [
        { id: "t4-1", name: "Format CV with metrics-driven bullet points (XYZ Formula: Accomplished [X], measured by [Y], by doing [Z])", completed: false, type: "prep" },
        { id: "t4-2", name: "Conduct 3 mock technical interviews on requirements elicitation & SQL whiteboard", completed: false, type: "prep" },
        { id: "t4-3", name: "Target 25 high-fit entry-level Business Analyst / ERP Analyst programs", completed: false, type: "milestone" }
      ]
    }
  ],
  recommendedProjects: [
    {
      id: "p1",
      title: "Omnichannel Retail Sales & Inventory Dashboard",
      description: "Design a centralized BI analytics model tracking inventory turnover, regional gross margin variances, and stockout bottlenecks across 12 store locations.",
      deliverables: ["Power BI / Tableau Interactive Dashboard", "SQL ETL Pipeline Scripts", "Executive Findings Summary PDF (2 pages)"],
      difficulty: "Intermediate",
      skillsCovered: ["Power BI", "Advanced SQL", "Business Metrics", "Data Storytelling"],
      estimatedHours: "18-24 hours"
    },
    {
      id: "p2",
      title: "Customer Onboarding Bottleneck & User Journey Case Study",
      description: "Map the end-to-end customer sign-up workflow for a SaaS platform using BPMN diagrams. Identify drop-off friction points and formulate prioritized product feature recommendations.",
      deliverables: ["As-Is and To-Be BPMN Diagrams", "Product Requirement Document (PRD)", "User Stories with Gherkin Acceptance Criteria"],
      difficulty: "Intermediate",
      skillsCovered: ["Requirements Gathering", "Process Modeling", "Agile / JIRA", "Stakeholder Communication"],
      estimatedHours: "14-18 hours"
    },
    {
      id: "p3",
      title: "Automated Financial & Operations Forecasting Tool",
      description: "Build a Python-assisted data pipeline that pulls weekly CSV exports, cleans transaction records, and outputs dynamic variance models into Excel.",
      deliverables: ["Python Pandas automation script", "Dynamic Excel dashboard with slicers", "Video walk-through demonstration"],
      difficulty: "Advanced",
      skillsCovered: ["Python", "Excel Automation", "Financial Modeling", "Data Validation"],
      estimatedHours: "20-28 hours"
    }
  ],
  interviewPreparation: [
    {
      id: "i1",
      topic: "Stakeholder Conflict & Prioritization",
      category: "Behavioral",
      sampleQuestion: "Tell me about a time two senior stakeholders had conflicting requirements for a project feature. How did you resolve it?",
      recommendedAnswerStrategy: "Use the STAR framework. Highlight data-driven impact metrics, objective scoring criteria (like RICE or MoSCoW), and how you maintained trust while managing executive expectations."
    },
    {
      id: "i2",
      topic: "Complex SQL Querying & Metric Calculation",
      category: "Technical",
      sampleQuestion: "Given an orders and customers table, how would you write a query to find the top 5% of customers by lifetime spend who have made a purchase in the last 90 days?",
      recommendedAnswerStrategy: "Demonstrate window functions (NTILE or PERCENT_RANK), CTE modularity for readability, and explicit date filter logic. Mention indexing considerations if the table is large."
    },
    {
      id: "i3",
      topic: "Root Cause Analysis of Metric Degradation",
      category: "Case Study",
      sampleQuestion: "Our e-commerce checkout completion rate suddenly dropped 14% over the past weekend. How would you systematically diagnose the problem?",
      recommendedAnswerStrategy: "Start with hypothesis segmentation: technical outage vs user error vs device breakdown (iOS vs Android vs Web), marketing promo changes, payment gateway latency, and regional geographic anomalies."
    },
    {
      id: "i4",
      topic: "Requirements Elicitation from Vague Briefs",
      category: "Technical",
      sampleQuestion: "A department director says: 'We need an AI tool to speed up reporting.' How do you turn this into actionable engineering requirements?",
      recommendedAnswerStrategy: "Focus on discovery questioning: current time allocation, input formats, output recipients, error tolerances, and success criteria. Detail how you draft acceptance criteria."
    }
  ],
  resumeImprovements: [
    "Quantify your university project outcomes (e.g. 'Optimized data ingestion pipeline, reducing manual report generation time by 65%').",
    "Group technical skills into clear categories: 'Data Analysis (SQL, Power BI, Excel)' and 'Methodologies (Agile, BPMN, User Stories)' instead of a flat list.",
    "Add a dedicated 'Key Projects' section with live demo links or public GitHub / Notion portfolio links.",
    "Eliminate generic high school experience or unspecialized club activities to keep the layout within a tight, high-impact 1-page format."
  ],
  aiSource: "intelligent_engine"
};

export const careerQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of work gives you the greatest sense of accomplishment?",
    subtitle: "Select the environment where your natural strengths flourish best.",
    options: [
      {
        id: "1a",
        label: "Deciphering complex datasets and discovering hidden patterns",
        description: "You love diving into spreadsheets, code, or databases to turn chaos into clarity.",
        dominantTrait: "Analytical & Data-Driven",
        suggestedCareers: ["Data Analyst", "Business Analyst", "Quantitative Researcher"]
      },
      {
        id: "1b",
        label: "Designing, building, and engineering software or architectures",
        description: "You get energized creating tangible digital products, apps, and automated systems.",
        dominantTrait: "Technical & Builder",
        suggestedCareers: ["Software Engineer", "Cloud Solutions Architect", "DevOps Engineer"]
      },
      {
        id: "1c",
        label: "Aligning people, facilitating teamwork, and driving business strategy",
        description: "You excel at communicating across disciplines, presenting to leaders, and solving organizational puzzles.",
        dominantTrait: "Strategic & People-Oriented",
        suggestedCareers: ["Product Manager", "Management Consultant", "ERP Consultant"]
      },
      {
        id: "1d",
        label: "Crafting intuitive digital experiences and user-centered workflows",
        description: "You enjoy understanding customer psychology, interface aesthetics, and behavioral design.",
        dominantTrait: "Creative & Experience-Focused",
        suggestedCareers: ["Product Designer (UX/UI)", "Digital Transformation Specialist", "Design Technologist"]
      }
    ]
  },
  {
    id: 2,
    question: "When faced with an ambiguous, unstructured problem, what is your first instinct?",
    subtitle: "How you naturally approach ambiguity reveals your ideal role archetype.",
    options: [
      {
        id: "2a",
        label: "Gather raw data and calculate baseline statistical facts",
        description: "Ground decisions in empirical evidence and measurable metrics before taking any action.",
        dominantTrait: "Analytical",
        suggestedCareers: ["Data Analyst", "Financial Analyst", "Business Intelligence Specialist"]
      },
      {
        id: "2b",
        label: "Interview key stakeholders to understand real pain points and needs",
        description: "Ask probing questions to unearth what the problem actually is beneath the surface.",
        dominantTrait: "Consultative",
        suggestedCareers: ["Business Analyst", "ERP Consultant", "Product Manager"]
      },
      {
        id: "2c",
        label: "Build a rapid prototype or script to test technical feasibility",
        description: "Code a proof-of-concept to see how the system handles the constraint in practice.",
        dominantTrait: "Engineering",
        suggestedCareers: ["Software Engineer", "AI/ML Engineer", "Systems Architect"]
      },
      {
        id: "2d",
        label: "Map out the full lifecycle process flow from start to finish",
        description: "Draft flowchart diagrams to uncover friction bottlenecks and structural inefficiencies.",
        dominantTrait: "Systems & Operations",
        suggestedCareers: ["Digital Transformation Specialist", "Operations Consultant", "Solutions Architect"]
      }
    ]
  },
  {
    id: 3,
    question: "Which work dynamic and daily rhythm appeals to you most?",
    subtitle: "Your energy cycles and collaboration preference define career longevity.",
    options: [
      {
        id: "3a",
        label: "Deep focus blocks solving rigorous logic and technical problems",
        description: "Minimal meetings, uninterrupted concentration, and clear code/query deliverables.",
        dominantTrait: "Deep Focus Technical",
        suggestedCareers: ["Software Engineer", "Data Scientist", "Cybersecurity Analyst"]
      },
      {
        id: "3b",
        label: "Balanced collaboration: 50% analysis and 50% presenting to teams",
        description: "Translating data insights into executive slide decks, roadmaps, and stakeholder decisions.",
        dominantTrait: "Hybrid Analytical Communicator",
        suggestedCareers: ["Business Analyst", "Solutions Consultant", "Data Product Manager"]
      },
      {
        id: "3c",
        label: "Fast-paced advisory across diverse client accounts and industries",
        description: "Solving different client challenges every few months with high variety and rapid learning.",
        dominantTrait: "Consultative Advisor",
        suggestedCareers: ["Management Consultant", "ERP Consultant", "Strategy Associate"]
      },
      {
        id: "3d",
        label: "Iterative experimentation testing new tools and workflows",
        description: "Continuously experimenting with modern technologies, automation, and user workflows.",
        dominantTrait: "Innovation & Transformation",
        suggestedCareers: ["Digital Transformation Specialist", "Growth Product Manager", "AI Solutions Engineer"]
      }
    ]
  },
  {
    id: 4,
    question: "How comfortable are you with quantitative and analytical tasks?",
    subtitle: "Understanding your quantitative threshold helps target the right technical depth.",
    options: [
      {
        id: "4a",
        label: "Very comfortable — I love statistical modeling, formulas, and writing SQL",
        description: "Numbers, regression trends, and relational tables feel completely intuitive.",
        dominantTrait: "High Quantitative",
        suggestedCareers: ["Data Analyst", "Data Scientist", "Quantitative Analyst"]
      },
      {
        id: "4b",
        label: "Comfortable when connected to real business outcomes and KPI metrics",
        description: "I want numbers to explain revenue, operational efficiency, and user conversion.",
        dominantTrait: "Applied Business Analytics",
        suggestedCareers: ["Business Analyst", "Finance Analyst", "Operations Analyst"]
      },
      {
        id: "4c",
        label: "I prefer systems logic and algorithms over statistical calculations",
        description: "I love architectural logic, object-oriented structure, and clean software patterns.",
        dominantTrait: "Algorithmic & Systems",
        suggestedCareers: ["Software Engineer", "Cloud Engineer", "Solutions Architect"]
      },
      {
        id: "4d",
        label: "I lean towards qualitative strategy, communication, and human psychology",
        description: "Persuasion, narrative design, team alignment, and user experience are my superpowers.",
        dominantTrait: "Strategic Qualitative",
        suggestedCareers: ["Product Manager", "Digital Transformation Specialist", "Tech Recruiter / HRBP"]
      }
    ]
  },
  {
    id: 5,
    question: "What kind of long-term professional impact do you wish to create?",
    subtitle: "Your overarching ambition shapes your highest-compatibility career trajectory.",
    options: [
      {
        id: "5a",
        label: "Modernizing legacy enterprises through smart technology adoption",
        description: "Helping traditional industries evolve by implementing cloud ERPs, automations, and modern systems.",
        dominantTrait: "Enterprise Transformation",
        suggestedCareers: ["ERP Consultant", "Digital Transformation Specialist", "IT Project Manager"]
      },
      {
        id: "5b",
        label: "Driving billion-dollar executive decisions through actionable data",
        description: "Providing the mission-critical dashboards and predictive analyses that lead company expansions.",
        dominantTrait: "Strategic Analytics",
        suggestedCareers: ["Business Analyst", "Data Strategist", "Business Intelligence Manager"]
      },
      {
        id: "5c",
        label: "Building scalable digital products used by millions of people",
        description: "Writing resilient, elegant code that powers high-traffic consumer and enterprise platforms.",
        dominantTrait: "Product Engineering",
        suggestedCareers: ["Software Engineer", "Full Stack Developer", "Platform Architect"]
      },
      {
        id: "5d",
        label: "Advising C-suite executives on organizational strategy and market growth",
        description: "Tackling high-stakes strategic mergers, competitive positioning, and operational turnaround.",
        dominantTrait: "Executive Advisory",
        suggestedCareers: ["Management Consultant", "Corporate Strategy Manager", "Chief of Staff"]
      }
    ]
  }
];

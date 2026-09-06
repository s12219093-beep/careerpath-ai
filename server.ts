import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { synthesizeCareerAnalysis, evaluateQuizAnswers } from "./src/utils/careerEngine";
import { StudentProfile } from "./src/types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health & Config endpoint
  app.get("/api/config", (req, res) => {
    const hasOpenAI = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== "" && !process.env.OPENAI_API_KEY.includes("YOUR_OPENAI_API_KEY"));
    res.json({
      status: "ok",
      hasOpenAIKey: hasOpenAI,
      aiProvider: hasOpenAI ? "OpenAI GPT-4o Mini" : "Intelligent Career Engine",
      model: hasOpenAI ? "gpt-4o-mini" : "careerpath-v2-synthesis"
    });
  });

  // AI Career Analysis Endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const profile = req.body as StudentProfile;
      if (!profile || !profile.major) {
        return res.status(400).json({ error: "Major is required for analysis." });
      }

      const apiKey = process.env.OPENAI_API_KEY;
      const isOpenAIConfigured = Boolean(apiKey && apiKey.trim() !== "" && !apiKey.includes("YOUR_OPENAI_API_KEY"));

      if (isOpenAIConfigured) {
        try {
          const systemPrompt = `You are CareerPath AI, an expert university career counselor and EdTech strategist. 
Analyze the student's profile and return a comprehensive, structured JSON response.
Strictly return valid JSON only matching the schema:
{
  "careerProfileSummary": "string",
  "bestCareerMatch": {
    "title": "string",
    "matchPercentage": number,
    "fitReason": "string",
    "salaryRange": "string",
    "growthOutlook": "string",
    "primaryDomain": "string"
  },
  "alternativeCareers": [
    {
      "title": "string",
      "matchPercentage": number,
      "fitReason": "string",
      "salaryRange": "string",
      "growthOutlook": "string"
    }
  ],
  "careerReadiness": {
    "overallScore": number,
    "technicalScore": number,
    "communicationScore": number,
    "experienceScore": number,
    "portfolioScore": number
  },
  "strongAreas": ["string", "string", "string", "string"],
  "needsDevelopment": ["string", "string", "string", "string"],
  "skillGap": {
    "youHave": ["string"],
    "youNeed": ["string"],
    "prioritySkills": ["string", "string", "string"]
  },
  "recommendedSkills": [
    {
      "name": "string",
      "whyNeeded": "string",
      "estimatedWeeks": "string",
      "priority": "Critical" | "Recommended" | "Value-Add"
    }
  ],
  "aiRecommendation": "string",
  "learningRoadmap": [
    {
      "stepNumber": "STEP 01",
      "stageCode": "foundation",
      "title": "Foundation",
      "subtitle": "string",
      "description": "string",
      "skills": ["string"],
      "tasks": [
        { "id": "t1-1", "name": "string", "completed": false, "type": "skill" }
      ]
    },
    {
      "stepNumber": "STEP 02",
      "stageCode": "build_skills",
      "title": "Build Skills",
      "subtitle": "string",
      "description": "string",
      "skills": ["string"],
      "tasks": [
        { "id": "t2-1", "name": "string", "completed": false, "type": "skill" }
      ]
    },
    {
      "stepNumber": "STEP 03",
      "stageCode": "build_experience",
      "title": "Build Experience",
      "subtitle": "string",
      "description": "string",
      "skills": ["string"],
      "tasks": [
        { "id": "t3-1", "name": "string", "completed": false, "type": "project" }
      ]
    },
    {
      "stepNumber": "STEP 04",
      "stageCode": "job_ready",
      "title": "Job Ready",
      "subtitle": "string",
      "description": "string",
      "skills": ["string"],
      "tasks": [
        { "id": "t4-1", "name": "string", "completed": false, "type": "prep" }
      ]
    }
  ],
  "recommendedProjects": [
    {
      "id": "p1",
      "title": "string",
      "description": "string",
      "deliverables": ["string"],
      "difficulty": "Beginner" | "Intermediate" | "Advanced",
      "skillsCovered": ["string"],
      "estimatedHours": "string"
    }
  ],
  "interviewPreparation": [
    {
      "id": "i1",
      "topic": "string",
      "category": "Technical" | "Behavioral" | "Case Study",
      "sampleQuestion": "string",
      "recommendedAnswerStrategy": "string"
    }
  ],
  "resumeImprovements": ["string", "string", "string", "string"]
}`;

          const userPrompt = `Analyze this student profile:
Major: ${profile.major}
Academic Level: ${profile.academicLevel}
Skills: ${profile.skills.join(", ")}
Interests: ${profile.interests.join(", ")}
Experience: ${profile.experience}
Target Industry: ${profile.targetIndustry}
Preferred Role: ${profile.preferredRole}
Work Environment: ${profile.workEnvironment}

Provide precise compatibility percentages and actionable recommendations.`;

          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
              ],
              response_format: { type: "json_object" },
              temperature: 0.5
            })
          });

          if (response.ok) {
            const data = await response.json();
            const content = data.choices[0]?.message?.content;
            if (content) {
              const parsed = JSON.parse(content);
              return res.json({
                ...parsed,
                id: `analysis-${Date.now()}`,
                timestamp: new Date().toISOString(),
                studentProfile: profile,
                aiSource: "openai"
              });
            }
          } else {
            console.warn("OpenAI API call returned non-200 status, falling back to intelligent synthesis engine.");
          }
        } catch (apiErr) {
          console.warn("OpenAI API request failed or timed out, gracefully falling back:", apiErr);
        }
      }

      // High-fidelity fallback / Intelligent Synthesis Engine
      const synthesized = synthesizeCareerAnalysis(profile, "intelligent_engine");
      res.json(synthesized);
    } catch (err: any) {
      console.error("Analysis route error:", err);
      res.status(500).json({ error: "Failed to perform career analysis", details: err?.message });
    }
  });

  // Quiz Evaluation Endpoint
  app.post("/api/quiz-evaluate", (req, res) => {
    try {
      const { selectedOptionIds } = req.body as { selectedOptionIds: string[] };
      const result = evaluateQuizAnswers(selectedOptionIds || []);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to evaluate quiz", details: err?.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CareerPath AI Server running on port ${PORT}`);
  });
}

startServer();

const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// Define the schema using the SDK's built-in Type enum
const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: { 
            type: Type.INTEGER, 
            description: "A score between 0 and 100 indicating how well the candidate's resume and self-description match the job description" 
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions asked during the interview",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical question asked" },
                    intention: { type: Type.STRING, description: "The intention behind the question" },
                    answer: { type: Type.STRING, description: "How to answer the question, what points to cover" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions asked during the interview",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioral question asked" },
                    intention: { type: Type.STRING, description: "The intention behind the question" },
                    answer: { type: Type.STRING, description: "How to answer the question, what points to cover" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "Skill gaps identified in the candidate",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The skill which the candidate is lacking" },
                    severity: { 
                        type: Type.STRING, 
                        enum: ["low", "medium", "high"], 
                        description: "The severity of the skill gap" 
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-wise preparation plan for the candidate",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "The day number" },
                    focus: { type: Type.STRING, description: "The focus area for that day" },
                    task: { 
                        type: Type.ARRAY, 
                        items: { type: Type.STRING },
                        description: "The tasks to be completed" 
                    }
                },
                required: ["day", "focus", "task"]
            }
        }
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `
You are an AI assistant tasked with analyzing a candidate's interview performance. Please analyze the provided resume, self-description, and job description to generate a comprehensive interview report.

Resume: ${resume}
Self-Description: ${selfDescription}
Job Description: ${jobDescription}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportSchema, // Passing the clean SDK schema object
            }
        });

        const reportData = JSON.parse(response.text);
        console.log(reportData);
        return reportData;
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw error;
    }
}

module.exports = generateInterviewReport;
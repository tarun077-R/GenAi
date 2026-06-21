const { GoogleGenAI, Type } = require("@google/genai");
const puppeteer = require("puppeteer")
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
        },title: {
    type: Type.STRING,
    description: "The title of the job for which the interview report is generated"
},
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
   const prompt = `
You are an expert resume writer.

Use ONLY the information provided below.

IMPORTANT RULES:
- Do NOT create fake names.
- Do NOT create fake emails.
- Do NOT create fake phone numbers.
- Do NOT create fake projects.
- Do NOT create fake education details.
- If information is missing, leave the section empty.

Resume Data:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Create a modern ATS-friendly resume webpage using HTML and embedded CSS.

Sections:
1. Professional Summary
2. Technical Skills
3. Projects
4. Education

Return only JSON:

{
  "html":"complete html document"
}
`

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
        return reportData;
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw error;
    }
}

async function generateResumeHtml({
    resume,
    selfDescription,
    jobDescription
}) {

    const htmlSchema = {
        type: Type.OBJECT,
        properties: {
            html: {
                type: Type.STRING
            }
        },
        required: ["html"]
    }

    const prompt = `
Create a professional resume webpage.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Use embedded CSS only.

Return:

{
  "html":"complete html document"
}
`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: htmlSchema
        }
    })

    const result = JSON.parse(response.text)
    return result.html
}
async function generatePdfFromHtml(htmlContent) {

    const browser = await puppeteer.launch({
        headless: true
    })

    const page = await browser.newPage()

    await page.setContent(htmlContent, {
        waitUntil: "networkidle0"
    })

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true
    })

    await browser.close()

    return pdfBuffer
}
module.exports = {
  generateInterviewReport,
  generateResumeHtml,
  generatePdfFromHtml
};
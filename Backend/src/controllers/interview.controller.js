const pdfparse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.services")
const interviewReportModel = require("../models/interviewReport.model")

async function generateINterviewReportController(req,res){

    const resumeContent = await (new pdfparse.PDFParse(Uint8Array.from(req.file.buffer))).getText
    const {selfDescription,jobDescription} = req.body

    const interviewViewReportByAI = await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })
    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewViewReportByAI


    })
    res.status(201).json(
        {
            message:"Interview report generated successfully",
            interviewReport
        }
    )
}
module.exports ={generateINterviewReportController} 
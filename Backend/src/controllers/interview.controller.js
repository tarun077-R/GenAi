const pdfparse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.services")
const {generateResumeHtml,generatePdfFromHtml} = require("../services/ai.services")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req,res){

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
async function getInterviewReportByIdController(req,res){
    const {interviewId}  = req.params
    const interviewReport = await interviewReportModel.findOne({
        _id:interviewId,user:req.user.id
    })
if(!interviewReport){
    return res.status(401).json({
        message:"Interview report not found",
    })
}
res.status(200).json({
    message:"Interview report fetchsd successfully",
    interviewReport
})
}
async function getAllInterviewReportsController(req,res){
     console.log("REQ.USER =>", req.user)
const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestion -skillGaps -preparationPlan")

    console.log("REPORTS =>", interviewReports)

res.status(200).json({
    message:"Interview reports fetched successfully",
    interviewReports
}) 
}
async function generateResumePdfController(req, res) {
  try {
    const { interviewReportId } = req.params;

    const report = await interviewReportModel.findById(interviewReportId);

    if (!report) {
      return res.status(404).json({
        message: "Interview report not found"
      });
    }

    const htmlContent = await generateResumeHtml({
      resume: report.resume,
      selfDescription: report.selfDescription,
      jobDescription: report.jobDescription
    });
    const pdfBuffer = await generatePdfFromHtml(htmlContent);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf"
    });

    return res.send(pdfBuffer);

  } catch (error) {

    return res.status(500).json({
      message: "Failed to generate PDF"
    });
  }
}
module.exports ={generateInterviewReportController,getInterviewReportByIdController,generateResumePdfController,getAllInterviewReportsController} 
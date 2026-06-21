 import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext } from "react"
import { interviewContext } from "../interview.context.jsx"

export const useInterview = () => {
  const context = useContext(interviewContext)
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider")
  }
  const { loading, report, setloading, setreport, reports, setreports } = context

  const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setloading(true)
    let response = null
    try {
      response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
      setreport(response.interviewReport)
      return response.interviewReport
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  const getReportById = async (interviewId) => {
    setloading(true)
    let response = null
    try {
      response = await getInterviewReportById(interviewId)
      setreport(response.interviewReport)
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
    return response?.interviewReport
  }

  const getAllReports = async () => {
    setloading(true)
    let response = null
    try {
      response = await getAllInterviewReports()
      setreports(response.interviewReports)
      return response.interviewReports
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  const getResumePdf = async ({ interviewReportId }) => {
    setloading(true)
    let response = null
    try {
      response = await generateResumePdf({ interviewReportId })
      const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute("download", "resume.pdf")
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      return response
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  return { loading, report, reports, generateReport, getReportById, getAllReports, getResumePdf }
}



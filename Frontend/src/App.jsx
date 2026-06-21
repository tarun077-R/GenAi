import React from 'react'
import {RouterProvider} from "react-router"
import {router} from "./app.router.jsx"
import { AuthProvider } from './features/auth/auth.context.jsx'
import { InterviewProvider } from './features/ai/interview.context.jsx'
const App = () => {
  return (
  
    <AuthProvider>
      <InterviewProvider>
    <RouterProvider router={router}/>
      </InterviewProvider>
    </AuthProvider>
    
  )
}

export default App
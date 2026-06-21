import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/RegisterUser"
import Protectedlayer from "./features/auth/components/Protectionlayer";
import HomePage from "./features/ai/pages/HomePage";
import InterviewReport from "./features/ai/pages/InterviewReport";
export const router = createBrowserRouter([
{
    path:"/login",
    element:<Login/>
},
{
    path:"/register",
    element:<Register/>
},{
    path:"/",
    element:(<Protectedlayer><HomePage/></Protectedlayer>)

},
{
    path:"/interview/:interviewReportId",
    element:<Protectedlayer><InterviewReport/></Protectedlayer>
}
])
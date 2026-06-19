import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/RegisterUser"
import Protectedlayer from "./features/auth/components/Protectionlayer";
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
    element:(<Protectedlayer><h1>HomePage</h1></Protectedlayer>)

}
])
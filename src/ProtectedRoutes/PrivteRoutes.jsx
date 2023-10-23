import jwt_decode from "jwt-decode"
import { Outlet } from "react-router-dom"

import AdminHomePage from "../pages/Admin/AdminHomePage"
import CustomerLoginPage from "../pages/Customer/CustomerLoginPage"
import UserLoginPage from "../pages/User/UserLoginPage"


function PrivateRoutes() {
    const token = localStorage.getItem('token')



    if (token){
        const decode = jwt_decode(token)
        if (decode.user_type === 'admin' ){
            return <AdminHomePage/>
        }
        else if(decode.user_type === 'customer'){
            return <CustomerLoginPage/>
        }
        else if(decode.user_type === 'user'){
            return <UserLoginPage/>
        }
        else{
            console.log(decode.user_type)
            return <Outlet/>
        }
    }
    return <Outlet/> 
}


export default PrivateRoutes

// ('user','customer', 'Admin')
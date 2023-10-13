import jwt_decode from "jwt-decode"
import { Outlet } from "react-router-dom"
// import UserHomePage from "../pages/User/UserHomePage/UserHomePage"
// import Company_HomePage from "../pages/Company/CompanyHomePage"
// import AdminHomePage from "../pages/Admin/AdminHomePage"
import AdminHomePage from "../pages/Admin/AdminHomePage"
// import UnknownHomePage from "../pages/UnknownUser/UnknownHomePage"

function PrivateRoutes() {
    const token = localStorage.getItem('token')

    // if (token){
    //     const decode = jwt_decode(token)
    //     if (decode.role === 'user'){
    //         return <UserHomePage/>
    //     } else if (decode.role === 'company'){
    //         return <Company_HomePage/>
    //     } else if (decode.role === 'admin' && decode.is_admin){
    //         return <Dashboard/>
    //     } else{
    //         return <UnknownHomePage/>
    //     }
    // }

    if (token){
        const decode = jwt_decode(token)
        if (decode.user_type === 'admin' ){
            return <AdminHomePage/>


        } else{
            console.log(decode.user_type)
            return <Outlet/>
        }
    }
    return <Outlet/> 
}


export default PrivateRoutes

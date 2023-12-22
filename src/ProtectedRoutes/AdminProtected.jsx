import jwtDecode from "jwt-decode";
import { Outlet } from "react-router-dom";
// import company home page 
// import user home page
// import Dashboard from "../components/admin/pages/dashboard";
// import UserHomePage from "../pages/User/UserHomePage";
// import CustomerHomePage from "../pages/Customer/CustomerHomePage";
import { useNavigate } from "react-router-dom";

function AdminProtected() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    console.log(token,'daxo')

    if (token) {
        const decode = jwtDecode(token)
        console.log(decode)
        if (decode.user_type == 'admin'){
            return <Outlet/>
        }else if (decode.user_type == 'user'){
            navigate('/user')
            return 
        }else if (decode.user_type == 'customer'){
            navigate('/customer')
            return 
        }
        else{
            console.log(decode.user_type)
        }
    }
}

export default AdminProtected
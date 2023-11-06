import axios from "axios";
// import {UserUrl, CompanyUrl, AdminUrl} from '../constants/constants'
import {Auth_url, User_url, Customer_url, Admin_url} from '../constants/constants'

// setting for Request time out
const createAxioxClient = (baseURL)=>{
    const client = axios.create({
        baseURL,
        timeout: 8000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!"
    })
    return client
}

const attatToken = (req, tokenName) =>{
    let authToken = localStorage.getItem(tokenName.access)
    if (authToken){
        req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req
}

const loginAxiosInstant = createAxioxClient(Auth_url)
loginAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attatToken(req, 'token')
    return modifiedReq
})

const userAxiosInstant = createAxioxClient(User_url)
userAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attatToken(req, 'token')
    return modifiedReq
})

const CustomerAxiosInstant = createAxioxClient(Customer_url)
CustomerAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attatToken(req, 'token')
    return modifiedReq
})


const adminAxiosInstant = createAxioxClient(Admin_url)
adminAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attatToken(req, 'token')
    return modifiedReq
})

export {loginAxiosInstant, userAxiosInstant, CustomerAxiosInstant, adminAxiosInstant}
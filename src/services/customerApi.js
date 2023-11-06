import { loginAxiosInstant } from "../utils/axiosUtils";
// ---------------------------------------Post Methoda-------------------------------//
const customerSignin = (values) => {
  return loginAxiosInstant
    .post("token/", values, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};


const UsersListing = (id,search) =>{
  return CompanyAxiosInstant.get(`userslisting/${id}/?search=${search}`,{
    withCredentials:true
  }).catch((error) => {
    throw error;
  });
}


export {
  customerSignin, UsersListing
}
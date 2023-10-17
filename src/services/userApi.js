import { loginAxiosInstant } from "../utils/axiosUtils";
// ---------------------------------------Post Methoda-------------------------------//
const userSignin = (values) => {
  return loginAxiosInstant
    .post("token/", values, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};

// User Google signup and signIn
const UserGoogleSignup = (value) => {

  const values = {
    email: value.email,
    password: value.id,

  };

  return loginAxiosInstant
    .post("googleauth/", values, {
      withCredentials: true,
    })
    .catch((error) => {

      throw error;
    });
};




// User Token refresh
const TokenRefresh = (value) => {
  return userAxiosInstant
    .post("token/refresh/", value, {
      withCredentials: true,
    })
    .catch((error) => error.response);
};

export {
  userSignin,
  UserGoogleSignup,

  TokenRefresh,
}
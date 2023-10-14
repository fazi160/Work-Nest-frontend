import React from 'react'
import PrivateRoutes from '../ProtectedRoutes/PrivteRoutes'
import { Routes, Route } from 'react-router-dom'
import UserProtected from '../ProtectedRoutes/UserProtected'
import UserHomePage from '../pages/User/UserHomePage'
import UserLoginPage from '../pages/User/UserLoginPage'

function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes/>}>
            {/* <Route path='/signup' element={<SignUpPage/>}/> */}
            <Route path='/login' element={<UserLoginPage/>}/>
        </Route>

        <Route element={<UserProtected/>}>
            <Route path='/' element={<UserHomePage/>}/>

        </Route>
      </Routes>
    </div>
  )
}

export default UserRoutes

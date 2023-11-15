import React from 'react'
import PrivateRoutes from '../ProtectedRoutes/PrivteRoutes'
import { Routes, Route } from 'react-router-dom'
import UserProtected from '../ProtectedRoutes/UserProtected'
import UserHomePage from '../pages/User/UserHomePage'
import UserLoginPage from '../pages/User/UserLoginPage'
import UserSignupPage from '../pages/User/UserSignupPage'
import UserChatPage from '../pages/User/UserChatPage'
import ZegoVideoCall from '../components/ZegoVideoCall'


function UserRoutes() {
  return (
    <div>
      <Routes>
        
        <Route element={<PrivateRoutes/>}>
            <Route path='/signup' element={<UserSignupPage/>}/>
            <Route path='/login' element={<UserLoginPage/>}/>
        </Route>

        <Route element={<UserProtected/>}>
            <Route path='/' element={<UserHomePage/>}/>
            <Route path='/chat' element={<UserChatPage/>}/>
            <Route path='/videocall' element={<ZegoVideoCall/>}/>

        </Route>
      </Routes>
    </div>
  )
}

export default UserRoutes

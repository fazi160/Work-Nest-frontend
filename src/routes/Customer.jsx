import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from '../ProtectedRoutes/PrivteRoutes'
import CustomerProtected from '../ProtectedRoutes/CustomerProtected'
import CustomerHomePage from '../pages/Customer/CustomerHomePage'
import CustomerLoginPage from '../pages/Customer/CustomerLoginPage'

function CustomerRoutes() {
  return (
    <Routes>
        <Route element={<PrivateRoutes/>}>
            {/* <Route path='/signup' element={<CompanyRegister/>} /> */}
            <Route path='/login' element={<CustomerLoginPage/>} />
        </Route>

        <Route element={<CustomerProtected/>}>
            <Route path='/' element= {<CustomerHomePage/>} />

        </Route>
    </Routes>
  )
}

export default CustomerRoutes

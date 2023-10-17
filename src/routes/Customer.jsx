import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from '../ProtectedRoutes/PrivteRoutes'
import CustomerProtected from '../ProtectedRoutes/CustomerProtected'
import CustomerHomePage from '../pages/Customer/CustomerHomePage'
import CustomerLoginPage from '../pages/Customer/CustomerLoginPage'
import CustomerSignuPage from '../pages/Customer/CustomerSignuPage'

function CustomerRoutes() {
  return (
    <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path='/signup' element={<CustomerSignuPage/>} />
            <Route path='/login' element={<CustomerLoginPage/>} />
        </Route>

        <Route element={<CustomerProtected/>}>
            <Route path='/' element= {<CustomerHomePage/>} />

        </Route>
    </Routes>
  )
}

export default CustomerRoutes

import React from 'react'
import UserNavbar from '../../components/User/pages/homepage/UserNavbar'
import Footer from '../../components/User/pages/homepage/Footer'
import Aboutes from '../../components/User/Aboutes'


function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserNavbar />
      <div className="flex-grow">
        <Aboutes />
      </div>
      <Footer />
    </div>
  )
}

export default AboutPage

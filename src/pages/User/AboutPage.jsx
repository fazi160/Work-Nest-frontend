import React from 'react'
import About from '../../components/User/pages/about'
import UserNavbar from '../../components/User/pages/homepage/UserNavbar'
import Footer from '../../components/User/pages/homepage/Footer'

function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserNavbar />
      <div className="flex-grow">
        <About />
      </div>
      <Footer />
    </div>
  )
}

export default AboutPage

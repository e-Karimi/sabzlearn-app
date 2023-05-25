import React from 'react'
import Topbar from './../../Components/Topbar/Topbar'
import Navbar from './../../Components/Navbar/Navbar'
import Landing from './../../Components/Landing/Landing'
import Courses from './../../Components/Courses/Courses'
import LastArticles from './../../Components/LastArticles/LastArticles'
import Footer from './../../Components/Footer/Footer'
import './Index.css'

export default function Index() {
  return (
    <>
      <div className='bg-container'>
        <Topbar/>
        <Navbar mainPage={true} />
        <Landing />
      </div>

      <Courses />
      <LastArticles />
      <Footer />
    </>
  )
}

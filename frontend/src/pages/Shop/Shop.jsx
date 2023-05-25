import React, { useState, useEffect } from 'react'
import Header from './../../Components/Header/Header'
import Footer from './../../Components/Footer/Footer'
import Course from './../../Components/Course/Course'
import Breadcrumb from './../../Components/Breadcrumb/Breadcrumb'
import { SlArrowDown } from "react-icons/sl";
import './Shop.css'

export default function Shop() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then(res => res.json())
      .then(data => {
        setCourses(data)
      })
  }, [])


  return (
    <>
      <Header />
      <div className='shop fa-num'>
        <div className="content-container">
          <div className="category-info-hedear">
            <Breadcrumb links={[
              { id: 1, title: 'خانه', to: '/' },
              { id: 2, title: `فروشگاه` },
            ]} />
          </div>
          <h1>
            <span className='arrow-icon'> <SlArrowDown /></span>
            آموزش برنامه نویسی فرانت اند
          </h1>
          <div className='shop-courses-container'>
            {
              courses.filter(course => course.categoryID === 'برنامه نویسی فرانت‌اند').map(course =>
                <Course key={course._id} {...course} />
              )
            }
          </div>
          <h1>
            <span className='arrow-icon'> <SlArrowDown /></span>
            آموزش برنامه نویسی بک اند
          </h1>
          <div className='shop-courses-container'>
            {
              courses.filter(course => course.categoryID === 'برنامه نویسی بک‌اند').map(course =>
                <Course key={course._id} {...course} />
              )
            }
          </div>
          <h1>
            <span className='arrow-icon'> <SlArrowDown /></span>
            آموزش  پایتون
          </h1>
          <div className='shop-courses-container'>
            {
              courses.filter(course => course.categoryID === 'پایتون').map(course =>
                <Course key={course._id} {...course} />
              )
            }
          </div>
          <h1>
            <span className='arrow-icon'> <SlArrowDown /></span>
            آموزش امنیت
          </h1>
          <div className='shop-courses-container'>
            {
              courses.filter(course => course.categoryID === 'امنیت').map(course =>
                <Course key={course._id} {...course} />
              )
            }
          </div>
          <h1>
            <span className='arrow-icon'> <SlArrowDown /></span>
            آموزش مهارت های نرم
          </h1>
          <div className='shop-courses-container'>
            {
              courses.filter(course => course.categoryID === 'مهارت های نرم').map(course =>
                <Course key={course._id} {...course} />
              )
            }
          </div>
        </div>
      </div >
      <Footer />
    </>
  )
}

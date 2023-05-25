import React, { useState, useEffect } from 'react'
import './Courses.css'
import { fontend, python, security, softSkills } from './data'
import CourseButton from './../CourseButton/CourseButton'
import Course from './../Course/Course'


export default function Courses() {
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
      <div className='content-container'>
        <div className='course-container'>
          <CourseButton categoryIcons={fontend} href="/category-info/front-end/1" />
          <CourseButton categoryIcons={python} href="/category-info/back-end/1" />
          <CourseButton categoryIcons={security} href="/category-info/security/1" />
          <CourseButton categoryIcons={softSkills} href="/category-info/soft-skill/1" />
        </div>
        <div className='course-container-desktop'>
          {
            courses.slice(0,16).map(course =>
              <Course key={course._id} {...course} />
            )
          }
        </div>
      </div >


    </>
  )
}



import React from 'react'
import './CourseInfoBox.css'

export default function CourseInfoBox({title,subTitle,icon}) {
  return (
    <div className='Course-info-box fa-num'>
      <div className="title-box">
        <span className='icon-box'>{icon}</span>
        <span>{title} </span>
      </div>
      <span className="sub-title"> {subTitle}</span>
    </div>
  )
}

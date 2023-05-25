import React from 'react'
import { Link } from 'react-router-dom'
import './CourseButton.css'

export default function CourseButton({ categoryIcons ,href}) {

  return (
    <>
      <Link to={href}>
        <button className="button">
          <div className="button__content">
            {
              categoryIcons.icons.map((iconObj, index) =>
                <span key={index + 1} className={`icon icon${index + 1} btn-bg`}
                  style={{ color: `${iconObj.color}` }}
                >
                  {iconObj.icon}
                </span>
              )
            }
            <h2 className="button_text"> {categoryIcons.title}</h2>
          </div>
        </button>
      </Link>
    </>
  )
}

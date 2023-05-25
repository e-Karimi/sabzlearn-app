import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import AlertBox from './../../../Components/AlertBox/AlertBox'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { cartContext } from './../../../contexts/CartContext'
import './UserCourses.css'

export default function UserCourses() {
  const [courses, setCourse] = useState([])
  const [clasifiedCourses, setClasifiedCourses] = useState([])
  const [activeStatus, setActiveStatus] = useState('all')
  const cartContextData = useContext(cartContext)

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem('user'))

    fetch(`http://localhost:4000/v1/users/courses`, {
      headers: {
        Authorization: `Bearer ${localData.token}`
      }
    }).then(res => res.json())
      .then(data => {
        setCourse(data)
        setClasifiedCourses(data)
      })
  }, [])

  const classifingCoursesHandler = (e) => {

    setActiveStatus(e.target.dataset.status)

    switch (e.target.dataset.status) {
      case 'all':
        setClasifiedCourses(courses)
        break;
      case 'free':
        let freeCourses = [...courses].filter(course => !course.price)
        setClasifiedCourses(freeCourses)
        break;
      case 'paid':
        let paidCourses = [...courses].filter(course => course.price)
        setClasifiedCourses(paidCourses)
        break;
      default:
        setClasifiedCourses(courses)
    }
  }

  return (
    <div className='bought-courses'>
      {
        cartContextData.isRegistered &&
        <div className="checkout-message">
          <AlertBox
            message="دوره با موفقیت به حساب کاربری شما اضافه شد"
            icon={<MdOutlineErrorOutline />}
            face="🥰"
          />
        </div>
      }
      <div className='header'>
        <ul>
          <li
            data-status="all"
            onClick={(e) => classifingCoursesHandler(e)}
            className={activeStatus === 'all' ? 'active' : ''}>
            همه دوره ها
          </li>
          <li
            data-status="free"
            onClick={(e) => classifingCoursesHandler(e)}
            className={activeStatus === 'free' ? 'active' : ''}>
            دوره های رایگان
          </li>
          <li
            data-status="paid"
            onClick={(e) => classifingCoursesHandler(e)}
            className={activeStatus === 'paid' ? 'active' : ''}>
            دوره های  پولی
          </li>
        </ul>
      </div>

      {clasifiedCourses.length === 0 ?
        <AlertBox
          message="دوره ای  جهت نمایش برای این فیلتر وجود ندارد"
          icon={<MdOutlineErrorOutline />}
          face="😊"
        />
        :
        <div className="flex-container">
          {clasifiedCourses.map(course =>
            <div key={course._id} className="course">
              <div className="img-wrapper">
                <Link to={`/course-info/${course.course.shortName}/1`}>
                  <img src={`./../../imgs/courses/${course.course.cover}`} alt="" />
                </Link>
              </div>
              <div className="course-body">
                <h3 className="course-name">
                  <Link to={`/course-info/${course.course.shortName}/1`}>
                    {course.course.name}
                  </Link>
                </h3>
                <div className="course-details">
                  <div className='course-price'>
                    {course.course.price === 0 ?
                      <>
                        <span>قیمت : </span>
                        <span>رایگان</span>
                      </>
                      :
                      <span>
                        <span>قیمت : </span>{" "}
                        {course.course.price.toLocaleString('en-US')}{" "}
                        <small>تومان</small>
                      </span>
                    }
                  </div>
                  <div className="course-status">
                    <span>وضعیت : </span>
                    <span className='completed'>تکمیل شده</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </div>
  )
}

import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
//icons
import { AiOutlineUser } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { GiGraduateCap } from 'react-icons/gi'
import { BsFileEarmarkText } from 'react-icons/bs'
import { SlArrowDown } from "react-icons/sl";
import { GrFacebookOption } from "react-icons/gr";
import { BsTwitter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiLinkedinFill } from "react-icons/ri";
//components
import Header from './../../Components/Header/Header'
import Breadcrumb from './../../Components/Breadcrumb/Breadcrumb'
import CourseInfoBox from './../../Components/CourseInfoBox/CourseInfoBox'
import CourseAccordion from './../../Components/CourseAccordion/CourseAccordion'
import RelatedCourse from './../../Components/RelatedCourse/RelatedCourse'
import Comment from './../../Components/Comment/Comment'
import Footer from './../../Components/Footer/Footer'
import { cartContext } from '../../contexts/CartContext'
import './CourseInfo.css'


export default function CourseInfo() {
  const [courseData, setCourseData] = useState([])
  const [comments, setComments] = useState([])
  const [sessions, setSessions] = useState([])
  const [teacher, setTeacher] = useState({})
  const [category, setCategory] = useState({})
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [courseHour, setCourseHour] = useState(0)
  const [courseMinutes, setCourseMinutes] = useState(0)
  const { courseName, page } = useParams()
  const [relatedCourses, setRelatedCourses] = useState([])
  const [score, setScore] = useState(null)
  const cartContextData = useContext(cartContext)
  let totalMinutes = 0;


  useEffect(() => {
    getMainCourse()
    getRelatedCourses()

  }, [courseName])

  function getMainCourse() {
    let localData = JSON.parse(localStorage.getItem('user'))

    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localData === null ? null : localData.token}`
      }
    })
      .then(res => res.json())
      .then(courseData => {
        setCourseData(courseData)
        setComments(courseData.comments)
        setSessions(courseData.sessions)
        setTeacher(courseData.creator)
        setCategory(courseData.categoryID)
        setIsEnrolled(courseData.isUserRegisteredToThisCourse)

        //* calculate hours and minutes for each course *//
        courseData.sessions.map(session => {
          totalMinutes += Number(session.time.slice(0, 2))
          setCourseHour(Math.floor(totalMinutes / 60))
          setCourseMinutes(totalMinutes - (Math.floor(totalMinutes / 60) * 60))
        })

        //*get a course Score Average
        fetch(`http://localhost:4000/v1/courses`)
        .then(res => res.json())
        .then(courses => {
          let mainCourse = courses.find(course => course._id === courseData._id)
          mainCourse && setScore(mainCourse.courseAverageScore)
        })
        
       

      })

  }

  function getRelatedCourses() {
    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
      .then(response => response.json())
      .then(data => {
        setRelatedCourses(data)
      })
  }

  function enrolCourse() {

    let isExistProductInCart = cartContextData.userCart.some(product => product.name === courseData.name)

    if (isExistProductInCart) {
      cartContextData.setCurrentProductName(courseData.name)
      cartContextData.setISAlreadyExist(true)
      setTimeout(() => cartContextData.setISAlreadyExist(false), 3000)
      return false;

    } else {

      let product = [...cartContextData.products].find(product => product._id === courseData._id)

      let NewProduct = {
        _id: crypto.randomUUID(),
        courseId: product._id,
        name: product.name,
        cover: product.cover,
        price: product.price,
        discount: product.discount || 0,
        shortName: product.shortName,
        number: 1,
      }

      cartContextData.setUserCart(prevUserCart => [...prevUserCart, NewProduct])

      cartContextData.setCurrentProductName(courseData.name)
      cartContextData.setISAddedToCArt(true)
      setTimeout(() => cartContextData.setISAddedToCArt(false), 3000)

      saveUserCartInLS(NewProduct)
    }

  }

  function saveUserCartInLS(NewProduct) {
    let userCartData;

    if (localStorage.getItem('userCartData') === null) {
      userCartData = []
    } else {
      userCartData = JSON.parse(localStorage.getItem('userCartData'))
    }

    userCartData.push(NewProduct)

    localStorage.setItem('userCartData', JSON.stringify(userCartData))

  }



  return (
    <>
      <Header />
      <div className='course-info fa-num'>
        {/*----------- course-info-header --------*/}
        <div className='course-info-header'>
          <div className='content-container'>
            <div className='course-info-title-wrapper'>
              <div className='title'>{courseData.name} </div>

              <Breadcrumb links={[
                { id: 1, title: 'خانه', to: '/' },
                { id: 2, title: `آموزش ${category.title}` },
              ]} />
            </div>
            <div className="course-info-first-section">
              <div className='course-info-video'>
                <video controls poster={`./../../imgs/courses/${courseData.cover}`}>
                  <source src="./../../video/course.mp4" type="video/mp4" />
                </video>
              </div>

              <div className='course-info-box'>
                {courseData.discount ?
                  <h1 className="course-price">
                    <span className='first-price'>{courseData.price && courseData.price.toLocaleString('en-US')}
                      <span className='m-right'>تومان</span>
                    </span>
                    <span>
                      {courseData.price &&
                        (courseData.price - (courseData.price * courseData.discount / 100)).toLocaleString('en-US')
                      }
                      <span className='m-right'>تومان</span>
                    </span>
                  </h1>
                  :
                  <h1 className="course-price">
                    <span >{courseData.price && courseData.price.toLocaleString('en-US')}
                      <span className='m-right'>تومان</span>
                    </span>
                  </h1>
                }
                <p className='notify'>پس از خرید، بلافاصله به محتوای دوره دسترسی خواهید داشت و میتوانید دوره را مشاهده و یا دانلود کنید.</p>
                <ul className='benefit'>
                  <li>  پــروژه مــحور بودن دوره هــــا</li>
                  <li>  پشتیبـــانی دائــــمی محصولات</li>
                  <li>  تضمین کیــفیت کلیـه محصولات</li>
                </ul>
                <div className="btn-wrapper">
                  {
                    courseData.isUserRegisteredToThisCourse ? (
                      <>
                        <button className='bought-course'> شما دانشجوی این دوره اید</button>
                        <button className='show-lessons'>
                          <a href="#course-topics">  دیدن ویدئو ها </a>
                        </button>
                      </>
                    ) : (
                      <>
                        <button className='buy-course' onClick={enrolCourse}>
                          <Link to="/cart"> خرید دوره</Link>
                        </button>
                        <button className='show-lessons'>
                          <a href="#course-topics">  مشاهده دروس</a>
                        </button>
                      </>
                    )
                  }

                </div>

                <div className="course-info-details">
                  <div className="course-info-rating">
                    <div>
                      <span>{comments.length}</span>{" "}
                      <span>دیدگاه کاربر</span>
                    </div>
                    <div className='star-wrapper'>
                      {score &&
                        Array(5 - score).fill(0).map((item, index) =>
                          <img key={index + 1} src="./../../imgs/svgs/star.svg" alt="rating" className="course-info_star" />
                        )
                      }
                      {score &&
                        Array(score).fill(0).map((item, index) =>
                          <img key={index + 1} src="./../../imgs/svgs/star_fill.svg" alt="rating" className="course-info_star" />
                        )
                      }
                    </div>
                  </div>

                  <ul className="social-wrapper">
                    <li><a href=""></a><GrFacebookOption /></li>
                    <li><a href=""></a><BsTwitter /></li>
                    <li><a href=""></a><MdEmail /></li>
                    <li><a href=""></a><RiLinkedinFill /></li>
                  </ul>
                </div>

              </div>
            </div>

            <div className='course-info-data'>
              <CourseInfoBox title="مدرس : " subTitle={teacher.name} icon={<AiOutlineUser />} />
              <CourseInfoBox title="وضعیت دوره" subTitle={courseData.isComplete ? 'تکمیل شده' : 'در حال برگزاری'} icon={<BiTimeFive />} />
              <CourseInfoBox title="تعداد درس:" subTitle={sessions.length} icon={<BsFileEarmarkText />} />
              <CourseInfoBox title="دانشجو: " subTitle={courseData.courseStudentsCount} icon={<GiGraduateCap />} />
            </div>

            <p className='course-about'>{courseData.description}  </p>

            <div className='arrow-down'>
              <a href="#course-topics">  <span><SlArrowDown /></span></a>
            </div>
          </div>
        </div>
        {/*------------- course-info-body---------- */}
        <div className='course-info-body' id="course-topics">
          <div className='content-container'>
            <div className='course-info-body-title-wrapper'>
              <span >مباحث این دوره</span>
              <div className='time-course'>
                <span>{sessions.length} درس</span>
                <span>{courseMinutes} : {courseHour}</span>
              </div>
            </div>

            <CourseAccordion sessions={sessions} courseName={courseName} isEnrolled={isEnrolled} />

            {comments.lenght !== 0 &&
              <Comment
                comments={comments}
                courseTitle={`${courseData.name}`}
                courseName={courseName}
              />
            }

            <RelatedCourse relatedCourses={relatedCourses} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}


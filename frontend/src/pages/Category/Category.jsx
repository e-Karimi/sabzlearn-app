import React, { useState, useEffect } from 'react'
import { AiOutlineInsertRowAbove } from 'react-icons/ai'
import { BsListColumns } from 'react-icons/bs'
import Header from './../../Components/Header/Header'
import Breadcrumb from './../../Components/Breadcrumb/Breadcrumb'
import Course from './../../Components/Course/Course'
import CoulmnTypeCourse from './../../Components/CoulmnTypeCourse/CoulmnTypeCourse'
import Footer from './../../Components/Footer/Footer'
import Pagination from './../../Components/Pagination/Pagination'
import AlertBox from '../../Components/AlertBox/AlertBox'
import { RiErrorWarningLine } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import './Category.css'

export default function Category() {
  const [courses, setCourses] = useState([])
  const [categorizedCourses, setCategorizedCourses] = useState([])
  const [paginatedCourses, setPaginatedCourses] = useState([])
  const [persianCategoryName, setPersianCategoryName] = useState('')
  const [sortType, setSortType] = useState('default')
  const [isChangedSort, setIsChangedSort] = useState(false)
  const [displayType, setDisplayType] = useState('row')
  const { categoryName } = useParams()


  useEffect(() => {
    getCourses()
    getPersianCategoryName(categoryName)
  }, [categoryName])


  async function getCourses() {
    await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then(res => res.json())
      .then(data => {
        setCourses(data)
        setCategorizedCourses(data)
      })
  }

  const getPersianCategoryName = (categoryName) => {
    switch (categoryName) {
      case 'front-end':
        setPersianCategoryName(' برنامه نویسی فرانت اند')
        break;
      case 'back-end':
        setPersianCategoryName('  برنامه نویسی بک اند')
        break;
      case 'python':
        setPersianCategoryName(' پایتون')
        break;
      case 'security':
        setPersianCategoryName(' امنیت')
        break;
      case 'soft-skill':
        setPersianCategoryName(' مهارت های نرم')
        break;
    }
  }

  const sortTypeHandler = (e) => {

    setSortType(e.target.value)
    setIsChangedSort(prev => !prev)

    switch (e.target.value) {
      case 'default': {
        setCategorizedCourses(courses)
        break;
      }
      case 'free': {
        let freeCourses = courses.filter(course => course.price === 0)
        setCategorizedCourses(freeCourses)
        break;
      }
      case 'charge': {
        let PaidCourses = courses.filter(course => course.price !== 0)
        setCategorizedCourses(PaidCourses)
        break;
      }
      case 'last': {
        setCategorizedCourses(courses)
      }
        break;
      case 'first': {
        let firstCourses = [...courses].reverse()
        setCategorizedCourses(firstCourses)
        break;
      }
      case 'cheapest': {
        let cheapestCourses = [...courses].sort((courseA, courseB) => courseA.price - courseB.price)
        setCategorizedCourses(cheapestCourses)
        break;
      }
      case 'theMostExpensive': {
        let mostExpensiveCourses = [...courses].sort((courseA, courseB) => courseB.price - courseA.price)
        setCategorizedCourses(mostExpensiveCourses)
        break;
      }
      default:
        setCategorizedCourses(courses)
    }
  }


  return (
    <>
      <Header />
      <div className='category-info fa-num'>
        <div className='content-container'>
          <div className="category-info-hedear">
            <Breadcrumb links={[
              { id: 1, title: 'خانه', to: '/' },
              { id: 2, title: `آموزش ${persianCategoryName}` },
            ]} />

            <div className="category-sort">
              <div className={`row-sort ${displayType === 'row' && 'display-active'}`} onClick={() => setDisplayType('row')}>
                <span><AiOutlineInsertRowAbove /></span>
              </div>
              <div className={`column-sort ${displayType === 'column' && 'display-active'}`} onClick={() => setDisplayType('column')}>
                <span><BsListColumns /></span>
              </div>
              <div className="category-sort-selection-box">
                <select value={sortType} onChange={e => sortTypeHandler(e)} name="" id="" className='category-sort-select'>
                  <option value='default'>  مرتب سازی پیش فرض  </option>
                  <option value='free'>مرتب سازی دوره های رایگان</option>
                  <option value='charge' >مرتب سازی دوره های پولی </option>
                  <option value='last' >مرتب سازی بر اساس آخرین</option>
                  <option value='first' >مرتب سازی بر اساس اولین</option>
                  <option value='cheapest' >مرتب سازی بر اساس ارزان ترین</option>
                  <option value='theMostExpensive' >مرتب سازی بر اساس گران ترین</option>
                </select>
              </div>
            </div>
          </div>

          {
            paginatedCourses.length === 0 ?
              (
                <div className="category-info-body-alert">
                  <AlertBox icon={<RiErrorWarningLine />}
                    message="هیچ دوره ای برای این دسته بندی وجود ندارد"
                    face="🙃"
                  />
                </div>
              )
              : (
                displayType === 'row' ?

                  <div className="category-info-body">
                    {
                      paginatedCourses.map(course =>
                        <Course key={course._id} {...course} persianCategoryName={persianCategoryName} />
                      )
                    }
                  </div>

                  :
                  <div className="category-info-body-column-sort">
                    {
                      paginatedCourses.map(course =>
                        <CoulmnTypeCourse key={course._id} {...course} />
                      )
                    }
                  </div>

              )

          }


          {
            courses.length !== 0 &&
            <Pagination
              items={categorizedCourses}
              itemsCountPerPage={4}
              setPaginatedItems={setPaginatedCourses}
              path={`/category-info/${categoryName}/`}
              isChangedSort={isChangedSort}
            />
          }


        </div>
      </div>
      <Footer />
    </>

  )
}

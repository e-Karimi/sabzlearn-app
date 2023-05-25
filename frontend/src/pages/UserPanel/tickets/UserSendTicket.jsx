import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineErrorOutline } from 'react-icons/md'
import AlertBox from './../../../Components/AlertBox/AlertBox'
import './UserSendTicket.css'

export default function UserSendTicket() {
  const [departments, setDepartments] = useState([])
  const [subDepartments, setSubDepartments] = useState([])
  const [userCourses, setUserCourses] = useState([])
  const [departmentID, setDepartmentID] = useState('')
  const [subDepartmentID, setSubDepartmentID] = useState('')
  const [courseID, setCourseID] = useState('')
  const [ticketTitle, setTicketTitle] = useState('')
  const [ticketPriority, setTicketPriority] = useState('2')
  const [isCoursesSupport, setIsCoursesSupport] = useState(false)
  const [ticketContent, setTicketContent] = useState('')
  const [attachedFile, setAttachedFile] = useState({})
  const [isShowAlert, setIsShowAlert] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    getDepartments()
  }, [])

  function getDepartments() {
    fetch('http://localhost:4000/v1/tickets/departments')
      .then(res => res.json())
      .then(data => {
        // console.log('Departments :',data);
        setDepartments(data)
        setSubDepartments([])
      })
  }

  function getSubDepartmentArray(departmentId) {
    if (departmentId !== '-1') {
      fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentId}`)
        .then(res => res.json())
        .then(data => {
          // console.log('SubDepartments :',data);
          setSubDepartments(data)
          setDepartmentID(departmentId)
        })
    } else {
      setSubDepartments([])
    }
  }

  function getUserCourses() {
    let localData = JSON.parse(localStorage.getItem('user'))

    fetch('http://localhost:4000/v1/users/courses/', {
      headers: {
        Authorization: `Bearer ${localData.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserCourses(data)
        console.log('UserCourses',data);
      })
  }

  function getSubDepartmentID(subDepartmentId) {

    setSubDepartmentID(subDepartmentId)

    if (subDepartmentId === '63b688c5516a30a651e98156') {
      setIsCoursesSupport(true)
      getUserCourses()
    } else {
      setIsCoursesSupport(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (departmentID && subDepartmentID && ticketTitle && ticketPriority && ticketContent !== '') {

      let ticketInfos = {
        departmentID: departmentID,
        departmentSubID: subDepartmentID,
        title: ticketTitle,
        priority: ticketPriority,
        body: ticketContent,
        course: courseID.length ? courseID : undefined,
      }

      let localData = JSON.parse(localStorage.getItem('user'))

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localData.token}`
        },
        body: JSON.stringify(ticketInfos)
      }

      fetch(`http://localhost:4000/v1/tickets`, options)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          navigate('/my-account/tickets')
        })

    } else {
      setIsShowAlert(true)
      setTimeout(() => setIsShowAlert(false), 3000)
    }
  }


  return (
    <div className='send-ticket fa-num'>
      <div className="tickets-header">
        <h1> ارسال تیکت جدید</h1>
        <div>
          <Link to="/my-account/tickets" className='tickets-btn'>  همه تیکت ها</Link>
        </div>
      </div>

      <form action="#" id="send-ticket-form" onSubmit={e => submitHandler(e)}>
        <div className="form-group-container">
          <div className='form-group'>
            <label htmlFor="department">دپارتمان را انتخاب کنید: <span className='color'>*</span></label>
            <select type="text" id="department" onChange={(e) => getSubDepartmentArray(e.target.value)}>
              <option value="-1">لطفا یک مورد را انتخاب کنید</option>
              {
                departments.map(department =>
                  <option key={department._id} value={department._id}>{department.title}</option>
                )
              }

            </select>
          </div>
          <div className='form-group'>
            <label htmlFor="subDepartment"> نوع تیکت را انتخاب کنید: <span className='color'>*</span></label>
            <select type="text" id="subDepartment" onChange={e => getSubDepartmentID(e.target.value)} >
              <option value="-1">
                {subDepartments.length === 0 ? 'ابتدا دپارتمان را انتخاب کنید' : 'نوع تیکت را انتخاب کنید'}
              </option>

              {
                subDepartments.map(subDepartment =>
                  <option key={subDepartment._id} value={subDepartment._id}>{subDepartment.title}</option>
                )
              }

            </select>
          </div>
        </div>
        <div className="form-group-container">
          <div className='form-group'>
            <label htmlFor="ticket"> عنوان تیکت را وارد کنید: <span className='color'>*</span></label>
            <input type="text" id="ticket" value={ticketTitle} onChange={e => setTicketTitle(e.target.value)} />
          </div>
          <div className='form-group'>
            <label htmlFor="priority"> اولویت تیکت را انتخاب کنید: </label>
            <select type="text" id="priority" value={ticketPriority} onChange={(e) => setTicketPriority(e.target.value)} >
              <option value="3">کم</option>
              <option value="2">متوسط</option>
              <option value="1">زیاد</option>
            </select>
          </div>
        </div>
        {
          isCoursesSupport &&
          <div className="form-group-container">
            <div className='form-group'>
              <label htmlFor="cellphone"> محصول را انتخاب کنید : <span className='color'>*</span></label>
              <select type="text" id="cellphone" onChange={e => setCourseID(e.target.value)} >
                <option value="">لطفا یک مورد را انتخاب کنید</option>
                {
                  userCourses.map(course =>
                    <option key={course.course._id} value={course.course._id}>{course.course.name}</option>
                  )
                }
              </select>
            </div>
          </div>
        }


        <div className='form-group'>
          <label htmlFor="content">محتوای تیکت را وارد نمایید:  <span className='color'>*</span></label>
          <textarea id="content" value={ticketContent} onChange={e => setTicketContent(e.target.value)}></textarea>
        </div>
        <div className='form-group'>
          <p>حداکثر اندازه: 6 مگابایت </p>
          <p>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</p>
          <input type="file" id="attach-file" onChange={e => setAttachedFile(e.target.files[0])} />
        </div>

        <button type="submit">  ارسال تیکت</button>
      </form>

      {
        isShowAlert &&
        <AlertBox
          message="لطفا تمام فیلدهای ستاره دار را پر کنید"
          icon={<MdOutlineErrorOutline />}
          face="🙂"
        />
      }
    </div>
  )
}

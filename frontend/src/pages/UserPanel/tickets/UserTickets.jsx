import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsTicketPerforated } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import AlertBox from './../../../Components/AlertBox/AlertBox'
import { MdOutlineErrorOutline } from 'react-icons/md'
import StatusBox from './../../../Components/StatusBox/StatusBox'
import './UserTickets.css'


export default function UserTickets() {
  const [tickets, setTickets] = useState([])
  const [displayedTickets, setDisplayedTickets] = useState([])
  const [userCourses, setUserCourses] = useState([])
  const [title, setTitle] = useState('نمایش همه تیکت ها')


  useEffect(() => {
    getUserCourses()
    getAllTickets()
  }, [])

  function getUserCourses() {
    fetch('http://localhost:4000/v1/users/courses/', {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserCourses(data)
      })
  }

  function getAllTickets() {
    fetch(`http://localhost:4000/v1/tickets/user`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
      .then(res => res.json())
      .then(TicketsData => {
        setTickets(TicketsData)
        setDisplayedTickets(TicketsData)

      })
  }

  function getTargetCourse(courseID) {
    let targetCourse = userCourses.find(course => course.course._id === courseID)
    return targetCourse.course.name;
  }

  function getShortName(courseID) {
    let targetCourse = userCourses && userCourses.find(course => course.course._id === courseID)
    return targetCourse.course.shortName;
  }

  const showAllTickets = () => {
    setDisplayedTickets(tickets)
    setTitle('همه تیکت ها')
  }
  const showUnAnsweredTickets = () => {
    setDisplayedTickets(tickets.filter(ticket => ticket.answer === 0))
    setTitle('  تیکت های در انتظار پاسخ')
  }
  const showAnsweredTickets = () => {
    setDisplayedTickets(tickets.filter(ticket => ticket.answer === 1))
    setTitle('  تیکت های پاسخ داده شده')
  }


  return (
    <div className="tickets fa-num">
      <div className="tickets-header">
        <h1> تیکت ها</h1>
        <div>
          <Link to="/my-account/send-ticket" className='send-ticket-btn'>ارسال تیکت جدید</Link>
        </div>
      </div>
      <div className="ticket-body">
        <div className='ticket-btn-wraper'>
          <button className="ticket-btn all" onClick={showAllTickets}>
            <span>   <BsTicketPerforated /></span>
            <span className='text'>همه</span>
            <span>{tickets.length}</span>
          </button>
          <button className="ticket-btn open" onClick={showUnAnsweredTickets}>
            <span>   <BsTicketPerforated /></span>
            <span className='text'>  در انتظار پاسخ</span>
            <span>{tickets.filter(ticket => ticket.answer === 0).length}</span>
          </button>
          <button className="ticket-btn close" onClick={showAnsweredTickets}>
            <span>   <BsTicketPerforated /></span>
            <span className='text'>پاسخ  داده شده</span>
            <span>{tickets.filter(ticket => ticket.answer === 1).length}</span>
          </button>
        </div>

        <h2 className='title-page'>  نمایش <span> {title}</span> </h2>
        <div className="mini-border"></div>

        {displayedTickets.length !== 0 ?

          <div className="flex-container">
            {
              displayedTickets.map(ticket =>
                <div key={ticket._id} className="ticket-box">
                  <div className="ticket-item ticket-title fa-num">
                    <span>
                      <Link to={`answer/${ticket._id}`}>{ticket.title}</Link>
                    </span>
                    <small> {ticket.departmentSubID}  </small>
                  </div>
                  <div className="ticket-item user-data">
                    <span className='username'>{ticket.user}</span>
                    <span className='message-count fa-num'>1</span>
                    <span className='comment-icon'><BiCommentDetail /></span>
                  </div>
                  {
                    ticket.departmentSubID === "پشتیبانی دوره‌ها" &&

                    <div className="ticket-item course-name fa-num">
                      <Link to={`/course-info/${getShortName(ticket.course)}/1`}>
                        {getTargetCourse(ticket.course)}
                      </Link>
                    </div>
                  }

                  <div className="ticket-item ticket-status">
                    <StatusBox answer={ticket.answer}>
                        <span>
                          {ticket.answer === 0 ? ' در انتظار پاسخ' : 'پاسخ داده شده'}
                        </span>
                    </StatusBox>
                  </div>

                  <div className="ticket-item ticket-date">
                    <span > {ticket.createdAt.slice(11, 19)}</span>{"  "}
                    <span > {ticket.createdAt.slice(0, 10)}</span>

                  </div>
                </div>
              )
            }
          </div>
          :
          <>
            <div className="space"></div>
            <AlertBox
              message="موردی یافت نشد"
              icon={<MdOutlineErrorOutline />}
              face="🧐"
            />

          </>
        }
      </div>
    </div >
  )
}

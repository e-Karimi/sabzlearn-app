import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { RiHomeHeartLine } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import { BsFillPlayBtnFill } from 'react-icons/bs'
import { IoIosArrowRoundForward, IoIosArrowRoundBack, IoIosBookmarks } from 'react-icons/io'
import Header from './../../Components/Header/Header'
import Footer from './../../Components/Footer/Footer'
import CourseAccordion from './../../Components/CourseAccordion/CourseAccordion'
import AuthContext from './../../contexts/AuthContext'
import './Session.css'

export default function Session() {
    const { courseName, sessionID } = useParams()
    const authContextData = useContext(AuthContext)
    const navigate = useNavigate()
    const [session, setSession] = useState({})
    const [sessions, setSessions] = useState([])
    const [isEnrolled, setIsEnrolled] = useState(false)
    //*show prev & next session*//
    const [isExistPrevSession, setIsExistPrevSession] = useState(false)
    const [isExistNextSession, setIsExistNextSession] = useState(false)
    const [nextHref, setNextHref] = useState('')
    const [prevHref, setPrevHref] = useState('')

    let localData = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses/${courseName}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localData === null ? null : localData.token}`
            }
        })
            .then(res => res.json())
            .then(courseData => {
                setIsEnrolled(courseData.isUserRegisteredToThisCourse)
            })
    }, [])


    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses/${courseName}/${sessionID}`, {
            headers: {
                Authorization: `Bearer ${localData === null ? null : localData.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setSession(data.session)
                setSessions(data.sessions)

                //* 1- get prev and next session Obj
                let currentSessionID = data.session._id
                let currentSessionIndex = data.sessions.findIndex(session => session._id === currentSessionID)

                let prevSession = data.sessions[currentSessionIndex - 1]   //undefined or {...}
                let nextSession = data.sessions[currentSessionIndex + 1]

                //* 2- show prev and next buttons on screen
                prevSession ? setIsExistPrevSession(true) : setIsExistPrevSession(false)
                nextSession ? setIsExistNextSession(true) : setIsExistNextSession(false)

                //* 3- set href for the next and prev links 
                if ((data.session.free === 1) || isEnrolled) {

                    prevSession ? setPrevHref(`/courses/${courseName}/${prevSession._id}`) :
                        setPrevHref(`/courses/${courseName}/${currentSessionID}`)

                    nextSession ? setNextHref(`/courses/${courseName}/${nextSession._id}`) :
                        setNextHref(`/courses/${courseName}/${currentSessionID}`)

                    return false;

                } else {

                    if (!authContextData.isLoggedIn) {
                        navigate('/my-account')
                        return false;
                    } else {
                        navigate(`/courses/${courseName}/session-redirect`)
                    }

                }
            })
    }, [sessionID])


    return (
        <>
            <Header />
            <div className="session fa-num">
                <div className="sidebar-session">
                    <div className="sidebar-session-header">
                        <span className='book'><IoIosBookmarks /></span>
                        <span>لیست درس ها</span>
                    </div>
                    <div className="sidebar-session-body">
                        <CourseAccordion sessions={sessions} courseName={courseName} isEnrolled={isEnrolled} />
                    </div>
                </div>

                <div className="main-session">
                    <div className="main-session-header">
                        <Link to={`/course-info/${courseName}/1`}>
                            <span className="right">
                                <span className="right-icon"><IoIosArrowForward /></span>
                                <span className="right-icon ms-2"><RiHomeHeartLine /></span>
                                <span className='text'>برگشت به صفحه اصلی دوره</span>
                            </span>
                        </Link>
                        <div className="left">
                            <span className="left-icon"><BsFillPlayBtnFill /></span>
                            <span className='text'> {session.title} </span>
                        </div>
                    </div>
                    <div className="main-session-body">
                        <div className="session-video">
                            <video
                                controls
                                poster="./../../imgs/bg/green-bg.png"
                                src={`http://localhost:4000/courses/covers/${session.video}`}
                            >
                            </video>
                        </div>
                        <button className='downlod-btn'>دانلود ویدئو</button>
                    </div>
                    <div className="other-session">
                        {
                            isExistPrevSession &&
                            <Link to={prevHref} className="previous">
                                <span>قبلی</span>
                                <span className='direction-icon'><IoIosArrowRoundBack /></span>
                            </Link>
                        }
                        {
                            isExistNextSession &&
                            <Link to={nextHref} className="next">
                                <span>بعدی</span>
                                <span className='direction-icon'><IoIosArrowRoundForward /></span>
                            </Link>
                        }


                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

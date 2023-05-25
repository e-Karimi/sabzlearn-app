import React  from 'react'
import { Link } from 'react-router-dom'
import WithToggle from './../HOCs/WithToggle'
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { RiLock2Fill } from "react-icons/ri";
import './CourseAccordion.css'

function CourseAccordion({ sessions, isEnrolled, courseName, toggleShow, isShowSubMenu }) {

    return (
        <div className='course-accordion fa-num'>
            <div className='course-accordion-item'>
                <div className='course-accordion-header'>
                    <span className='course-accordion-title'>
                        سرفصل ها
                    </span>
                    <span className='toggle-icon' onClick={toggleShow}>
                        {!isShowSubMenu ? <AiOutlineMinus /> : <AiOutlinePlus />}
                    </span>
                </div>

                {!isShowSubMenu  && sessions.length !== 0 &&
                    sessions.map((session, index) =>
                        (isEnrolled || session.free) ? (
                            <Link to={`/courses/${courseName}/${session._id}`} key={session._id}>
                                <div className='course-accordion-body'>
                                    <div className="right">
                                        <span className='number'>{index + 1}</span>
                                        <span className='play'><BsFillPlayBtnFill/></span>
                                        <span className='lesson-title'> {session.title}</span>
                                    </div>
                                    <div className="left">
                                        <span className="time-lesson">{session.time}</span>
                                    </div>
                                </div>
                            </Link>
                        ) : (

                            <div className='course-accordion-body'  key={session._id}>
                                <div className="right">
                                    <div className='number'>{index + 1}</div>
                                    <span className='lesson-title'> {session.title}</span>
                                </div>
                                <div className="left">
                                    <span className="time-lesson">{session.time}</span>
                                    <span><RiLock2Fill/></span>
                                </div>
                            </div>

                        )

                    )
                }
            </div>
        </div>

    )
}

export default WithToggle(CourseAccordion)
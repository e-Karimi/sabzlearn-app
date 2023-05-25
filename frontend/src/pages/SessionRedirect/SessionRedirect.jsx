import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from './../../Components/Header/Header'
import Footer from './../../Components/Footer/Footer'
import './SessionRedirect.css'

export default function SessionRedirect() {
    const { courseName } = useParams()
    const [courseTitle, setCourseTitle] = useState('')

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/courses/${courseName}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localData === null ? null : localData.token}`
            }
        })
            .then(res => res.json())
            .then(courseData => {
                setCourseTitle(courseData.name)
            })
    }, [])


    return (
        <>
            <Header />
            <div className='redirect-session fa-num'>
                <div className='content-container'>
                    <h1>لطفاً ابتدا در این دوره  ثبت نام کنید</h1>
                    <h3> ✔ {" "} {courseTitle} </h3>
                    <Link to={`/course-info/${courseName}/1`}>مشاهده دوره</Link>
                </div>
            </div>
            <Footer />
        </>

    )
}

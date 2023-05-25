import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import './Contact.css'

export default function Contact() {
    return (
        <>
            <Header />
            <div className="contact">
                <div className="content-container fa-num">
                    <h2>سلام خدمت شما کاربر گرامی، </h2>
                    <p>
                        برای ارتباط با مدیریت و یا پشتیبانی عمومی و فنی. میتوانید از طریق وارد شدن به <Link to="/my-account" className='word-link'>اکانت کاربری</Link > بخش <Link to="/my-account/tickets" className='word-link'>  تیکت های پشتیبانی</Link> و انتخاب دپارتمان مورد نظر اقدام کنید.
                    </p>
                    <h3>ساعات کاری:</h3>
                    <p>شنبه تا پنجشنبه / از ساعت ۷ صبح تا ۱۰ شب</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

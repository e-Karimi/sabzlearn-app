import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { MdOutlineMailOutline, MdCall } from 'react-icons/md'



export default function Footer() {
    return (
            <footer>
                <div className='content-container'>
                    <div className="footer-container">
                        <div className='footer-about'>
                            <h4> ضمانت سبز لرن برای کلیه محصولات آموزشی</h4>
                            <p>وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم! و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس در اون رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه! این به این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای پشتیبانی دوره های رایگان شون هم هزینه دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته باشند</p>
                        </div>
                        <div className="footer-info">
                            <div className="footer-link-1 item1">
                                <Link to="/shop" className='flex-link'>
                                    <span>فروشگاه</span>
                                    <span className='lable popular'>محبوب</span>
                                </Link>
                                <Link to="/contact">
                                    <span>ارتباط با ما</span>
                                </Link>
                                <Link to="/about" >
                                    <span>درباره ما</span>
                                </Link>
                            </div>

                            <div className="footer-link-2 item2">
                                <Link to="/blog/1">
                                    <span>مقالات</span>
                                </Link>
                                <Link to="/privacy-policy" >
                                    <span>قوانین و مقررات</span>
                                </Link>
                                <Link to="/course-info/react-expert/1" className='flex-link'>
                                    <span>آموزش ریکت</span>
                                    <span className='lable new'>جدید</span>
                                </Link>
                            </div>

                            <div className="visiting-hour item3 fa-num">
                                <h4>ساعات کاری:</h4>
                                <p>شنبه تا چهارشنبه ساعت  8 صبح تا 18 عصر </p>
                                <p> پنج شنبه‌ها ساعت 8 صبح تا 12 ظهر</p>
                            </div>

                            <div className="contact-us item4">
                                <h4> ارتباط با ما:</h4>
                                <div className='contact-item'>
                                    <span className='icon'> <MdOutlineMailOutline /></span>
                                    <span>sabzlearn@gmail.com </span>
                                </div>
                                <div className='contact-item fa-num'>
                                    <span className='icon'> <MdCall /></span>
                                    <span> 09334008385</span>
                                </div>
                            </div>

                            <div className="enamad item5">
                                <img src="./../../imgs/footer/enamad-two-star.png" />
                            </div>


                        </div>
                        <div className="footer-copyright fa-num">
                            <p>طراحی شده با💚 توسط <span>انسیه کریمی</span> </p>
                        </div>
                    </div>
                </div>
            </footer>
    )
}

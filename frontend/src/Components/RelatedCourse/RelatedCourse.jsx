import React from 'react'
import Course from './../Course/Course'
//---- Swiper---//
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
//-------------//
import { categoriesData } from './../../data'
import './RelatedCourse.css'


export default function RelatedCourse({ relatedCourses }) {

    /* ---that's why I had't APi for categoryName 😐----*/
    function getPersianCategory(categoryID) {
        const persianCategory = categoriesData.find(category => category.id === categoryID).name
        return persianCategory;
    }

    return (
        <div className='content-container'>
            <div className='related-course'>
                <div className='section-title'>
                    <h3>محصولات مرتبط   </h3>
                </div>
                <div className='related-course-slider'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={true}
                        breakpoints={{
                            425: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            560: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {relatedCourses.length !== 0 &&
                            relatedCourses.map(course =>
                                <SwiperSlide key={course._id}>
                                    <Course {...course}  categoryID={getPersianCategory(course.categoryID)}/>
                                </SwiperSlide>
                            )
                        }


                    </Swiper>
                </div>

            </div>
        </div>
    )
}

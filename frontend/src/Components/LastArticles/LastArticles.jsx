import React, { useState, useEffect } from 'react'
import ArticleBox from './../ArticleBox/ArticleBox'
//---- Swiper---//
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
//-------------//
import { categoriesData } from './../../data'
import './LastArticles.css'

export default function LastArticles() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/articles')
            .then(res => res.json())
            .then(data => {
                setArticles(data)
                data.forEach(article => getPersianCategory(article.categoryID))
            })
    }, [])

    /* ---that's why I had't APi for categoryName 😐----*/
    function getPersianCategory(categoryID) {
        const persianCategory = categoriesData.find(category => category.id === categoryID).name
        return persianCategory
    }

    return (
        <div className='content-container'>
            <div className='last-articles fa-num'>
                <div className='section-title'>
                    <h3>آخرین مقالات سایت</h3>
                </div>

                <div className='article-slider'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 2,
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
                        {
                            articles.map(article =>
                                <SwiperSlide key={article._id}>
                                    <ArticleBox {...article}
                                        category={getPersianCategory(article.categoryID)}
                                    />
                                </SwiperSlide>
                            )
                        }


                    </Swiper>
                </div>

            </div>
        </div>
    )
}

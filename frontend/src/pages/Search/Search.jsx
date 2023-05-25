import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from './../../Components/Header/Header'
import Footer from './../../Components/Footer/Footer'
import Breadcrumb from './../../Components/Breadcrumb/Breadcrumb'
import Course from './../../Components/Course/Course'
import AlertBox from '../../Components/AlertBox/AlertBox'
import ArticleSearchBox from './../../Components/ArticleSearchBox/ArticleSearchBox'
import { categoriesData } from './../../data'
import { MdOutlineErrorOutline } from 'react-icons/md'
import './Search.css'

export default function Search() {
    const [coursesResult, setCoursesResult] = useState([])
    const [articlesResult, setArticlesResult] = useState([])
    const { searchValue } = useParams()

    useEffect(() => {
        fetch(`http://localhost:4000/v1/search/${searchValue}`)
            .then(res => res.json())
            .then(data => {
                setCoursesResult(data.allResultCourses)
                setArticlesResult(data.allResultArticles)
            })
    }, [searchValue])


    function getPersianCategory(categoryID) {
        const persianCategory = categoriesData.find(category => category.id === categoryID).name
        return persianCategory
    }


    return (
        <>
            <Header />
            <div className="search fa-num">
                <div className='content-container'>
                    <div className="search-hedear">
                        <Breadcrumb links={[
                            { id: 1, title: 'خانه', to: '/' },
                            { id: 2, title: ` نتیجه جستجو برای ${searchValue}  ` },
                        ]} />
                    </div>
                    <div className="search-result">
                        <h3 className='search-title'>دوره ها</h3>

                        {coursesResult.length === 0 ?

                            <div className="result-not-find">
                                <AlertBox
                                    icon={<MdOutlineErrorOutline />}
                                    message="دوره ای برای جستجوی شما یافت نشد"
                                    face=""
                                />
                            </div>
                            :
                            <div className="courses-result">
                                {
                                    coursesResult.map(course =>
                                        <Course key={course._id} {...course} categoryID={getPersianCategory(course.categoryID)} />
                                    )
                                }
                            </div>
                        }

                        <h3 className='search-title'>مقاله ها</h3>

                        {articlesResult.length === 0 ?

                            <div className="result-not-find">
                                <AlertBox
                                    icon={<MdOutlineErrorOutline />}
                                    message="مقاله ای برای جستجوی شما یافت نشد"
                                    face=""
                                />
                            </div>
                            :
                            <div className="articles-result">
                                {
                                    articlesResult.map(article =>
                                        <ArticleSearchBox key={article._id} {...article}
                                            category={getPersianCategory(article.categoryID)} />
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

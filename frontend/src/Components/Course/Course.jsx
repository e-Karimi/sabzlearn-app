import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SpinnerCircle from './../SpinnerCircle/SpinnerCircle'
import './Course.css'

export default function Course({ name, price, cover, shortName, discount, persianCategoryName, categoryID }) {
    const [isImgLoaded, setIsImgLoaded] = useState(false)
    const [imgNotFound, setImgNotFound] = useState(false)

    const imgLoaded = (e) => {

        setIsImgLoaded(true)

        if (e.target.src.includes('blank-img')) {
            setImgNotFound(true)
        }

    }

    const imgNotFindOut = (e) => {
        setImgNotFound(true)

        e.target.src = "./../../imgs/courses/blank-img-70.png"
        e.target.style.width = '120px'
        e.target.style.height = '120px'
    }


    return (
        <div className='course-box'>
            {
                discount && <div className='off fa-num'> {discount}%</div>
            }
            <div className={`img-container ${imgNotFound && 'img-stuff-style'}`}>
                <Link to={`/course-info/${shortName}/1`}>
                    <img src={`./../../imgs/courses/${cover}`}
                        alt="Course img"
                        onLoad={(e) => imgLoaded(e)}
                        onError={(e) => imgNotFindOut(e)}
                    />
                </Link>

                {
                    !isImgLoaded && <SpinnerCircle />

                }

            </div>
            <div className='category-wrapper'>
                <span className='category'>{categoryID || persianCategoryName}</span>
            </div>
            <h2> <Link to={`/course-info/${shortName}/1`}>{name}</Link> </h2>

            <div className='desc'>
                <div className='price'>
                    {price === 0 && <span className='free'>رایگان</span>}
                    {(price !== 0 && !discount) &&
                        <div>
                            <span className='fa-num-bold'> {price && price.toLocaleString('en-US')}{" "}</span>
                            <span className='currency'>تومان</span>
                        </div>
                    }
                    {(price !== 0 && discount) &&
                        <>
                            <div className='lin-through'>
                                <span className='fa-num-bold'> {price && price.toLocaleString('en-US')}{" "}</span>
                                <span className='currency'>تومان</span>
                            </div>
                            <div>
                                <span className='fa-num-bold'>
                                    {(price - ((price * discount) / 100)).toLocaleString('en-US')}{" "}
                                </span>
                                <span className='currency'>تومان</span>
                            </div>
                        </>
                    }
                </div>

                <div className='student'>
                    <span className='number-student fa-num' >102</span>
                    <span>دانشجو</span>
                </div>
            </div>
        </div>
    )
}



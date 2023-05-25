import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SpinnerCircle from './../SpinnerCircle/SpinnerCircle'
import './CoulmnTypeCourse.css'

export default function CoulmnTypeCourse({ name, price, cover, shortName, discount }) {
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
        <div className='coulmn-course-box'>
            {
                discount && <div className='off fa-num'> {discount}%</div>
            }

            <div className={`img-wrapper ${imgNotFound && 'img-stuff-style'}`}>
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

            <div className="course-body fa-num-bold">
                <h3 className="course-name">
                <Link to={`/course-info/${shortName}/1`}> {name}</Link>
                </h3>
                <div className="course-details">
                    <div className='price'>
                        {price === 0 && <span className='free'>رایگان</span>}
                        {(price !== 0 && !discount) &&
                            <div>
                                <span> {price && price.toLocaleString('en-US')}{" "}</span>
                                <span className='currency'>تومان</span>
                            </div>
                        }
                        {(price !== 0 && discount) &&
                            <>
                                <div className='lin-through'>
                                    <span> {price && price.toLocaleString('en-US')}{" "}</span>
                                    <span className='currency'>تومان</span>
                                </div>
                                <div className='new-price'>
                                    <span> {(price - ((price * discount) / 100)).toLocaleString('en-US')}{" "}</span>
                                    <span className='currency'>تومان</span>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

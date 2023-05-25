import React from 'react'
import { Link } from 'react-router-dom'
import { RxDotFilled } from 'react-icons/rx'
import './ArticleSearchBox.css'

export default function ArticleSearchBox({ title, cover, category, shortName }) {
    return (
        <div className='article-search-box'>
            <div className="img-wrapper">
                <Link to={`/article-info/${shortName}`}>
                    <img src={`./../${cover}`} />
                </Link>
            </div>
            <div className="desc">
                <div className='title fa-num'>
                    <Link to={`/article-info/${shortName}`}>{title}</Link>
                </div>
                <span className='category'>
                    <span className='dot-icon'> <RxDotFilled /></span>
                   <span> {category}</span>
                </span>
            </div>
        </div>
    )
}

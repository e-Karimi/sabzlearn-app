import React from 'react'
import { Link } from 'react-router-dom'
import './ArticleBox.css'

export default function ArticleBox({ title, cover, category, shortName }) {
  return (
    <div className='article-box'>
      <div className="img-wrapper">
        <Link to={`/article-info/${shortName}`}>
          <img src={`./../${cover}`} />
        </Link>
      </div>
      <div className='category'>{category}</div>
      <div className='article-box-title'>
        <Link to={`/article-info/${shortName}`}>{title}</Link>
      </div>
    </div>
  )
}

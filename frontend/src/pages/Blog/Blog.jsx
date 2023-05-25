import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Breadcrumb from './../../Components/Breadcrumb/Breadcrumb'
import Pagination from './../../Components/Pagination/Pagination'
import './Blog.css'

export default function Blog() {
  const [articles, setArticles] = useState([])
  const [paginatedArticles, setPaginatedArticles] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then(response => response.json())
      .then(data => {
        setArticles(data)
      })

  }, [])


  return (
    <>
      <Header />
      <div className="blog">
        <div className="content-container">
          <div className="blog-container fa-num">
              <Breadcrumb links={[
                { id: 1, title: 'خانه', to: '/' },
                { id: 2, title: 'مقاله ها' },
              ]} />
      
            {
              paginatedArticles.map(article =>
                <div key={article._id} className='blog-box'>
                  <div className="blog-img">
                    <Link to={`/article-info/${article.shortName}`}>
                      <img src={`./../${article.cover}`} />
                    </Link>
                  </div>
                  <div className="blog-body">
                    <div className='blog-body-title'>
                      <Link to={`/article-info/${article.shortName}`}>{article.title}</Link>
                    </div>
                    <p className='desc'>{article.description}</p>
                  </div>
                </div>
              )
            }
          </div>

          {
            articles.length !== 0 &&
            <Pagination
              items={articles}
              itemsCountPerPage={4}
              setPaginatedItems={setPaginatedArticles}
              path={'/blog/'}
            />
          } 

        </div>
      </div>
      <Footer />
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './../../Components/Header/Header'
import Footer from './../../Components/Footer/Footer'
// import CommentBasic from './../../Components/CommentBasic/CommentBasic'
import './ArticleInfo.css'

export default function ArticleInfo() {
  const [articleData, setArticleData] = useState([])
  const [articleCategory, setArticleCategory] = useState([])
  const [author, setAuthor] = useState({})
  const [createdAt, setCreatedAt] = useState('')
  const { articleName } = useParams()


  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articleName}`)
      .then(res => res.json())
      .then(data => {
        setArticleData(data)
        setArticleCategory(data.categoryID)
        setAuthor(data.creator)
        setCreatedAt(data.createdAt)
      })
  }, [])

  return (
    <>
      <Header />
      <div className="article-info">
        <div className='content-container'>
          <div className='article-content-container fa-num'>

            <div className="article-info-header">

              <div className='img-wrapper'>
                <img src={`./../../${articleData.cover}`} alt="" />
              </div>

              <div className="article-header-content">
                <span className="category-article">{articleCategory.title} </span>
                <h1 className="article-title">{articleData.title}</h1>
              </div>
              <div className="mini-border"></div>
              <div className="article-details">
                <div>
                  <span>تاریخ : </span>
                  <span>{createdAt.slice(0,10)}</span>
                </div>
                <div>
                  <span>نویسنده : </span>
                  <span>{author.name}</span>
                </div>
              </div>

            </div>

            <div className="article-info-body">
              <div className="article-body-desc">
                <p>{articleData.description}</p>
              </div>
              <div className="content-summary">
                <p className="content-summary-title">آنچه در این مقاله خواهید خواند</p>
                <ul className="content-summary-list">
                  <li className="content-summary-item">
                    <a href="#scapy-lib">1- کتابخانه scapy </a>
                  </li>
                  <li className="content-summary-item">
                    <a href="#requests-lib">2- کتابخانه requests </a>
                  </li>
                  <li className="content-summary-item">
                    <a href="#Cryptography-lib">3- کتابخانه Cryptography </a>
                  </li>
                  <li className="content-summary-item">
                    <a href="#python-nmap-lib">4- کتابخانه python-nmap </a>
                  </li>
                </ul>
              </div>

              <div className="article-body-content">
                <div className="content-box">
                  <h2 id="scapy-lib"> 1- کتابخانه scapy </h2>
                  <p className="">
                    یکی از بهترین کتابخانه های که پایتون دارد و در شبکه کاربرد زیادی دارد و میشه باهاش کارهای بامزه ای انجام داد اسکپی است.
                    با استفاده از این کتابخانه شما میتوانید پکت های دلخواه را تولید کنید و در سطح شبکه ارسال کنید. در واقع شما میتوانید برنامه ای بنویسید که از طریق آن شبکه را اسنیف کنید یا حتی میتوانید شبکه را اسکن کنید همچنین میتوانید حمله هایی را در بستر شبکه پیاده سازی کنید. (اسنیف به معنای شنود ارتباطات شبکه است)

                    لازم به ذکر است که از این کتابخانه برای تست نفوذ شبکه های وایرلس و حتی voip هم استفاده میشود.
                  </p>
                </div>
                <div className="content-box">
                  <h2 id="requests-lib">2- کتابخانه requests</h2>
                  <p className="">
                    هدف از ساخت کتابخانه ریکوِست در پایتون ایجاد استانداردهایی برای ارسال و دریافت است.که وب سایت geeksforgeeks نیز به ان اشاره کرده است.  (درخواست‌های مبتنی بر HTTPهای نوشته شده برایAPI).

                    در این کتابخانه می‌توان به کمک برنامه، بر روی به‌کارگیری داده‌ها و خدمات ارائه شده توسط یک سیستم مبتنی بر وب تمرکز کرد و دیگر درگیر سایر جنبه‌ها و پیچیدگی‌های برنامه‌نویسی مرتبط با سرویس وب نشد.
                  </p>
                </div>
                <div className="img-box">
                  <img src="./../imgs/articles/python/بهترین-کتابخانه-های-پایتون-برای-هک.jpg" alt="" />
                </div>
                <div className="content-box">
                  <h2 id="Cryptography-lib">3- کتابخانه Cryptography</h2>
                  <p className="">
                    رمزنگاری کتابخانه ای است که دستور العمل ها و دستورات اولیه را برای توسعه دهندگان پایتون برای رمزنگاری ارائه می دهد. این کتابخانه شامل رمزگذاری، تولید یک عدد تصادفی، هش کردن(hashing algorithm)، رمزگذاری، و امضا برای رمزهای بلوکی و جریانی است.

                    این کتابخانه یک رابط برنامه نویسی برنامه (API) سطح بالا را برای الگوریتم های رمزنگاری قوی مانند امضای دیجیتال و بلوک های ساختمانی رمزنگاری سطح پایین ارائه می دهد که با در نظر گرفتن عملکرد توسعه یافته اند.

                    هک اخلاقی از این توانایی برای رمزگذاری و رمزگشایی داده های حساس به اشتراک گذاشته شده در اینترنت استفاده می کند. به طور کلی، رمزنگاری ستون فقرات یک اینترنت امن است.
                  </p>
                </div>
                <div className="content-box">
                  <h2 id="python-nmap-lib">4-  کتابخانه python-nmap</h2>
                  <p className="">
                    یکی از کتابخانه های پایتون برای شبکه nmap است که بسیار جالب و کاربردی واقع میشود.
                    Python-nmap یک کتابخانه پایتون است که از برنامه نویسان با اسکنر پورت Nmap پشتیبانی می کند .Nmap یک ابزار مدیریت شبکه و ممیزی امنیتی است که معمولاً برای کشف سرویس‌ها و میزبان‌های موجود در شبکه استفاده می‌شود.

                    با این حال، ما می‌توانیم از آن برای بررسی یک میزبان نیز استفاده کنیم. کتابخانه Python-nmap به عنوان یک پوشش پایتون برای ابزار Nmap در نظر گرفته می‌شود که به برنامه‌نویس اجازه می‌دهد تا به راحتی به ویژگی‌ها و توانایی Nmap در پایتون دسترسی داشته باشد، از آن استفاده کند و دستکاری کند.
                  </p>
                </div>
              </div>
            </div>
            { /* ----comments didn't exist in articleData----- */}
            {/* <CommentBasic /> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

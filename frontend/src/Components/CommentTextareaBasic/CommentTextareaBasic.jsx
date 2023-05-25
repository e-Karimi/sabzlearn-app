import React from 'react'
import { Link } from 'react-router-dom'
import './CommentTextareaBasic.css'

export default function CommentTextareaBasic() {
  return (
    <div className='basic-comment-section'> 
      <h3>دیدگاهتان را بنویسید </h3>
      <div className="basic-comment-info">
        به عنوان <span >سما</span> وارد شده اید <Link to="" className="word-link">حساب کاربری</Link> خود را ویرایش کنید .
        {"  "} <Link to="" className="word-link"> بیرون رفتن ؟  </Link>
      </div>
      <h4>دیدگاه *  </h4>
      <form action="#" className='basic-comment-form'>
        <div>
        <textarea name="" id="" ></textarea>
        </div>
        <input type="submit"  value="فرستادن دیدگاه" className='submit-btn'/>
      </form>
    </div>
  )
}

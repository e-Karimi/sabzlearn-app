import React from 'react'
import {Link} from 'react-router-dom'
import './CommentWarning.css'

export default function CommentWarning() {
  return (
    <div className="comment-warning">
    <p  className='title'>دیدگاهتان را بنویسید </p>
    <p className='body'>
          برای نوشتن دیدگاه باید وارد<Link to="/login" className="word-link">حساب کاربری </Link> شوید.
    </p>
</div>
  )
}

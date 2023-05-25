import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiErrorWarningLine } from 'react-icons/ri'
import CommentTextarea from './../CommentTextarea/CommentTextarea'
import CommentWarning from './../CommentWarning/CommentWarning'
import Pagination from './../Pagination/Pagination'
import AuthContext from './../../contexts/AuthContext'

import './Comment.css'

export default function Comment({ comments, courseTitle, courseName }) {
    const authContextData = useContext(AuthContext)
    const [paginatedComments, setPaginatedComments] = useState([])



    return (
        <>
            {comments.length === 0 ? (
                <div className="comment-header">
                    <h3 className="info-message">
                        <span className='info-icon'><RiErrorWarningLine /></span>
                        هنوز کامنتی برای این دوره ثبت نشده
                    </h3>
                </div>
            ) : (
                <>
                    <div className='comment-section fa-num'>
                        <div className="comment-header">
                            <h3 className="comment-header-title"><span>{comments.length}</span>   دیدگاه برای
                                <span> {courseTitle}</span>
                            </h3>
                        </div>
                        {
                            paginatedComments.map(comment =>
                                <div key={comment._id} className="comment-item ">
                                    <div className="comment-question">
                                        <div className="comment-question-header">
                                            <span className="comment-question-name"> {comment.creator.name}</span>
                                            <div className='comment-owner'> {comment.creator.role === 'ADMIN' ? 'مدیر' : 'خریدار محصول'}</div>
                                            <span> {comment.createdAt.slice(0, 10)}</span>
                                        </div>
                                        <div className="comment-question-body">
                                            <p> {comment.body}  </p>
                                        </div>
                                        {/*------------show  comment-answer-btn-------- */}
                                        {
                                            authContextData.isLoggedIn ? (
                                                <div className="comment-question-answer-btn">
                                                    <button >پاسخ به این نظر  </button>
                                                </div>
                                            ) : (
                                                <div className="comment-question-login-btn">
                                                    <Link to="/login">برای پاسخ دادن وارد شوید</Link>
                                                </div>
                                            )
                                        }

                                        {/*------------show  comment-answer-------- */}
                                        {
                                            comment.answerContent &&
                                            <div className="comment-answer">
                                                <div className="comment-item ">
                                                    <div className="comment-question">
                                                        <div className="comment-question-header">
                                                            <span className="comment-question-name">
                                                                {comment.answerContent.creator.name}
                                                            </span>
                                                            <div className='comment-owner'>
                                                                {comment.answerContent.creator.role === 'ADMIN' ? 'مدیر' : 'خریدار محصول'}
                                                            </div>
                                                            <span> {comment.answerContent.createdAt.slice(0, 10)}</span>
                                                        </div>
                                                        <div className="comment-question-body">
                                                            <p> {comment.answerContent.body}</p>
                                                        </div>
                                                        <span className="comment-question-answer-btn">
                                                            {
                                                                authContextData.isLoggedIn ? (
                                                                    <button>پاسخ به این نظر </button>
                                                                ) : (
                                                                    <Link to="/login">برای پاسخ دادن وارد شوید</Link>
                                                                )
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        }

                    </div>

                    <Pagination
                        items={comments}
                        itemsCountPerPage={3}
                        setPaginatedItems={setPaginatedComments}
                        path={`/course-info/${courseName}/comment-page-`}
                    />
                </>
            )
            }


            {
                authContextData.isLoggedIn ? (<CommentTextarea />) : (<CommentWarning />)

            }

        </>


    )
}

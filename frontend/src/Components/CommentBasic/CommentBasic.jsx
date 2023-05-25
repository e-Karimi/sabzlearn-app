import React from 'react'
import { Link } from 'react-router-dom'
import CommentTextareaBasic from './../CommentTextareaBasic/CommentTextareaBasic'
import CommentWarning from './../CommentWarning/CommentWarning'
import './CommentBasic.css'

export default function CommentBasic() {
    return (
        <div className='comment-section fa-num'>
            <div className="comment-header">
                {/* <h3 className="caution">   هنوز کامنتی برای این مقاله ثبت نشده</h3> */}
                <h3 className="comment-header-title">
                    <span>{2}</span>  دیدگاه برای
                    <span className='subject-title'>  10 کتابخانه پایتون برای هک و امنیت</span>
                </h3>
            </div>
            <div className="comment-item ">
                <div className="comment-question">
                    <div className="comment-question-header">
                        <span className="comment-question-name"> sama</span>
                        <span> - 2023/03/15</span>
                        <div className='comment-status'>دیدگاه شما در انتظار تایید است </div>
                    </div>
                    <div className="comment-question-body">
                        <p>    سلام و خسته نباشید به استاد عزیز.
                            تو این rtk query رو هم آموزش میدید؟
                        </p>
                    </div>
                    <span className="comment-question-answer-btn">
                        <Link to="/login">برای پاسخ دادن وارد شوید</Link>
                        {/* <Link to="">پاسخ به این نظر </Link> */}
                    </span>
                    <CommentTextareaBasic />
                    {/*show  comment-answer */}
                    <div className="comment-answer">
                        <div className="comment-item ">
                            <div className="comment-question">
                                <div className="comment-question-header">
                                    <span className="comment-question-name"> محمد امین سعیدی راد</span>
                                    <span> - 2023/03/15</span>
                                </div>
                                <div className="comment-question-body">
                                    <p>
                                        سلام عزیز.
                                        پکیج Redux-Saga در قالب آپدیت به دوره اضافه میشه.
                                    </p>
                                </div>
                                <span className="comment-question-answer-btn">
                                    <Link to="">برای پاسخ دادن وارد شوید</Link>
                                    {/* <Link to="">پاسخ به این نظر </Link> */}
                                </span>
                                {/* <CommentTextareaBasic/> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="CommentTextarea-frame">
                <CommentTextareaBasic />
                {/* <CommentWarning /> */}

            </div>
        </div>
    )
}

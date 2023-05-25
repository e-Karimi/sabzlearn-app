import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AllertBox from '../AlertBox/AlertBox'
import { RiErrorWarningLine } from 'react-icons/ri'
import './CommentTextarea.css'

export default function CommentTextarea() {
    const [commentBody, setCommentBody] = useState('')
    const [commentScore, setCommentScore] = useState('-1')
    const [isValidCommentText, setIsValidCommentText] = useState(true)
    const [isValidCommentScore, setIsValidCommentScore] = useState(true)
    const [isCommentRegistered, setIsCommentRegistered] = useState(false)
    const { courseName } = useParams()

    const submitComment = (e) => {
        e.preventDefault()
        let localdata = JSON.parse(localStorage.getItem('user'))

        if (commentScore === '-1' && commentBody) {
            setIsValidCommentScore(false)
            setTimeout(() => setIsValidCommentScore(true), 3000)
            return;
        }
        if (commentBody === '') {
            setIsValidCommentText(false)
            setTimeout(() => setIsValidCommentText(true), 3000)
            return;
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localdata.token}`
            },
            body: JSON.stringify({
                body: commentBody,
                courseShortName: courseName,
                score: commentScore,
            })

        }

        fetch(`http://localhost:4000/v1/comments`, options)
            .then(res => res.json())
            .then(result => {
                console.log('CommentTextarea => result :', result);
                if (result) {
                    setIsCommentRegistered(true)
                    setTimeout(() => setIsCommentRegistered(false), 3000)
                }
            })
    }

    return (
        <>
            <div className="CommentTextarea-section">
                {/* ------------------alert -----------------*/}
                {
                    !isValidCommentText &&
                    <AllertBox
                        icon={<RiErrorWarningLine />}
                        message="لطفا دیدگاه خود را وارد کنید "
                        face="🤨"
                    />
                }
                {
                    !isValidCommentScore &&
                    <AllertBox
                        icon={<RiErrorWarningLine />}
                        message="لطفا برای دوره یک امتیاز وارد کنید "
                        face="🤓"
                    />
                }
                {
                    isCommentRegistered &&
                    <AllertBox
                        icon={<RiErrorWarningLine />}
                        message="دیدگاه شما پس از تایید نمایش داده می شود"
                        face="🧐"
                    />
                }

                <div className="CommentTextarea-frame">
                    <div className="comment-respond ">
                        <h3 className="comment-respond-title">
                            <span>  دیدگاه خود را بنویسید   </span>

                            {/* <span> پاسخ به  sama</span>
                       <small><a href="#">لغو پاسخ</a></small> */}
                        </h3>
                        <form action="#" onSubmit={(e) => submitComment(e)}
                            id="comment-respond-form"
                            className='comment-respond-form'
                        >
                            <div className="comment-respond-rating">
                                <label htmlFor="rating" className="">امتیاز شما *</label>
                                <select name="rating" id="rating" value={commentScore}
                                    onChange={e => setCommentScore(e.target.value)}>
                                    <option value="-1" >  رای دهید</option>
                                    <option value="5">عالی</option>
                                    <option value="4"> خوب</option>
                                    <option value="3">متوسط</option>
                                    <option value="2">ضعیف</option>
                                    <option value="1">بد</option>
                                </select>
                            </div>
                            <div className="comment-respond-body">
                                <label htmlFor="respond-body" >دیدگاه شما *</label>
                                <textarea name="respond-body" id="respond-body"
                                    value={commentBody} onChange={e => setCommentBody(e.target.value)}></textarea>
                            </div>
                            <input type="submit" name="submit" className='submit' value="ثبت نظر" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


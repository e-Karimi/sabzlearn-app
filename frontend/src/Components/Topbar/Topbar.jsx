import React, { useEffect, useState,memo } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineTwitter, AiFillYoutube } from 'react-icons/ai'
import { RiTelegramFill, RiInstagramLine } from 'react-icons/ri'
import './Topbar.css'

 function Topbar() {
    const [topbarLinks, setTopbarLinks] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/menus/topbar')
            .then(res => res.json())
            .then(data => {
                setTopbarLinks(data)
            })
    }, [])

    const getRandomLinks = (arr, randomCount) => {
        let shuffleArr = [...arr].sort(() => 0.5 - Math.random())
        return shuffleArr.slice(0, randomCount)
    }

    return (

        <div className="top-bar">
            <div className='content-container'>
                <div className='flex-container'>
                    <div className='right fa-num'>
                        <ul>
                            {
                                getRandomLinks(topbarLinks, 4).map(topbarLink =>
                                    <li key={topbarLink._id}>
                                        <Link to={topbarLink.href}>
                                            {topbarLink.title}
                                        </Link>
                                    </li>

                                )
                            }
                        </ul>
                    </div>
                    <div className='left'>
                        <div className='social-wrapper'>
                            <span className='email-text'>sabzLearn@gmail.com</span>
                            <span> <AiFillYoutube /></span>
                            <span> <AiOutlineTwitter /></span>
                            <span><RiInstagramLine /></span>
                            <span> <RiTelegramFill /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default memo(Topbar)
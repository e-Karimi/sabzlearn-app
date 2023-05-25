import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";
import { SlArrowDown } from "react-icons/sl";
import Typewriter from 'typewriter-effect';
import './Landing.css'

export default function Landing() {
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()

    const goToSearchPage = () => {
        navigate(`/search/${searchValue}`)
    }

    const searchWithEnter = (e) => {
        if (e.which === 13) {
            goToSearchPage(searchValue)
        }
    }

    const goDown = () => {
     
        if (screen.availWidth >= 1024) {
            window.scrollTo(0, 510)
        }
        else {
            window.scrollTo(0, 400)
        }
    }

    return (
        <div className='landing'>
            <h1 className='landing-title'>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter.typeString('با آکادمی سبز لرن برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن')
                            .pauseFor(2500)
                            .deleteAll()
                            .start();
                    }}

                    options={{
                        autoStart: true,
                        loop: true,
                    }}
                />
            </h1>

            <div className='serch-box fa-num'>
                <input type='text' placeholder='جستجو...'
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onKeyDown={(e) => searchWithEnter(e)}
                />
                <button type="submit" onClick={goToSearchPage} >
                    <BiSearch className="search-icon" />
                </button>
            </div>
            <div onClick={goDown}>
                <span className='arrow-down' >
                    <SlArrowDown />
                </span>
            </div>
        </div>
    )
}

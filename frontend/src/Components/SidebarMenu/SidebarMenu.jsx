import React, { useContext, useEffect, useState, useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import { BiSearch } from "react-icons/bi";
import { sidebarMenuContext } from './../../contexts/sidebarMenuContext'
import SidebarMenuItem from './../SidebarMenuItem/SidebarMenuItem'
import useOutsideClick from './../../hooks/useOutsideClick';
import './SidebarMenu.css'

export default function SidebarMenu() {
    const menuContextData = useContext(sidebarMenuContext)
    const [menus, setMenus] = useState([])
    const menuRef = useRef(null)
    const menuContainerRef = useRef(null)
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()

    const hideMenu = () => menuContextData.setIsShowSidebarMenu(false)
    useOutsideClick(menuContainerRef, menuRef, hideMenu)

    useEffect(() => {
        fetch('http://localhost:4000/v1/menus')
            .then(res => res.json())
            .then(data => {
                setMenus(data)
            })
    }, [])

    const goToSearchPage = () => {
        navigate(`/search/${searchValue}`)
        menuContextData.setIsShowSidebarMenu(false)
    }

    const searchWithEnter = (e) => {
        if (e.which === 13) {
            goToSearchPage(searchValue)
        }
    }



    return (
        <>
            {menuContextData.isShowSidebarMenu &&
                <div className="mobile-menu-container" ref={menuContainerRef}>
                    <div className="mobile-menu" ref={menuRef}>
                        <div className='content-container'>
                            <div className='serch-box fa-num'>
                                <input type='text' placeholder='جستجو...'
                                    value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                    onKeyDown={e => searchWithEnter(e)}
                                />
                                <button type="submit" onClick={goToSearchPage}>
                                    <BiSearch className="search-icon" />
                                </button>
                            </div>

                            <div className='menu_accordion-container fa-num'>
                                {
                                    menus.map(menu =>
                                        <SidebarMenuItem key={menu._id} {...menu} />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

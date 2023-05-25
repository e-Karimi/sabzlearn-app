import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import WithToggle from '../HOCs/WithToggle';
import { sidebarMenuContext } from './../../contexts/sidebarMenuContext'
import './SidebarMenuItem.css'

function SidebarMenuItem({ title, href, submenus, isShowSubMenu, toggleShow }) {
    const menuContextData = useContext(sidebarMenuContext)

    const hideSidebarManu = () => {
        setTimeout(() => menuContextData.setIsShowSidebarMenu(false), 300)
    }


    return (
        <>
            <div className={`menu_accordion-item ${isShowSubMenu && 'item-active'}`}>
                <div className='menu_accordion-header fa-num' >
                    <Link to={`${href}/1`} onClick={hideSidebarManu}>  {title} </Link>

                    {submenus.length !== 0 &&
                        <span className="arrow-wrapper" onClick={toggleShow}>
                            {
                                isShowSubMenu ? <SlArrowUp className='arrow' /> :
                                    <SlArrowDown className='arrow' />
                            }
                        </span>
                    }

                </div>

                <div className='menu_accordion-body'>
                    {submenus.length !== 0 &&
                        submenus.map(submenu =>
                            <div key={submenu._id} className='menu_accordion-link'>
                                <Link to={`${submenu.href}/1`} onClick={hideSidebarManu}>  {submenu.title} </Link>
                            </div>
                        )
                    }
                </div>
            </div >
        </>
    )
}

export default WithToggle(SidebarMenuItem)
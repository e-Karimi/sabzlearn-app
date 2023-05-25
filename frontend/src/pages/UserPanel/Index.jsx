import React, { useContext, useEffect, useState } from 'react'
import Header from './../../Components/Header/Header'
import Footer from './../../Components/Footer/Footer'
import { Outlet, NavLink, useParams } from 'react-router-dom'
import { RiUserHeartLine } from 'react-icons/ri'
import AuthContext from './../../contexts/AuthContext'
import './Index.css'

export default function Index() {
    const authContextData = useContext(AuthContext)
    const [subTitle, setSubTitle] = useState()
    const param = useParams()
    const paramValue = Object.values(param)[0]
  

    useEffect(() => {
        switch (paramValue) {
            case 'orders':
                setSubTitle('لیست سفارش ها ')
                break;
            case 'bought':
                setSubTitle('دوره های خریداری شده')
                break;
            case 'edit-account':
                setSubTitle('جزئیات حساب کاربری')
                break;
            case 'tickets':
                setSubTitle('تیکت های پشتیبانی')
                break;
            case 'wallet':
                setSubTitle(' کیف پول من')
                break;
            default:
                setSubTitle('پیشخوان')
                break;
        }

    }, [param])

    const goDown = () => {
        if (screen.availWidth < 768) {
            window.scrollTo(0, 550)
        }
    }

    return (
        <>
            <Header />
            <div className="userpanel">
                <div className="userpanel-header">
                    <div className="userpanel-header-container">
                        <h1>حساب کاربری من</h1>
                        <span>{subTitle}</span>
                    </div>
                </div>
                <div className="content-container">
                    <div className="userpanel-body">
                        <div className="userpanel-sidebar">
                            <ul>
                                <li className='sidebar-username'>
                                    <span className='sidebar-icon'><RiUserHeartLine /></span>
                                    <span> {authContextData.userInfos.name} </span>
                                </li>
                                <li className='sidebar-item' onClick={goDown}>
                                    <NavLink to="/my-account/">پیشخوان</NavLink>
                                </li>
                                <li className='sidebar-item' onClick={goDown}>
                                    <NavLink to="orders/1">لیست سفارش ها  </NavLink>
                                </li>
                                <li className='sidebar-item' onClick={goDown}>
                                    <NavLink to="wallet">   کیف پول من</NavLink>
                                </li>
                                <li className='sidebar-item' onClick={goDown}>
                                    <NavLink to="edit-account">جزئیات حساب کاربری</NavLink>
                                </li>
                                <li className='sidebar-item' onClick={goDown}>
                                    <NavLink to="bought">دوره های خریداری شده</NavLink>
                                </li>
                                <li className='sidebar-item' onClick={goDown}>
                                    <NavLink to="tickets">تیکت های پشتیبانی</NavLink>
                                </li>
                                <li className='sidebar-item' onClick={goDown}>
                                    <NavLink to="log-out">خروج از سیستم</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="userpanel-main">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

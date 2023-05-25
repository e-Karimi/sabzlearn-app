import React, { useContext } from 'react'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import AuthContext from './../../../contexts/AuthContext'
import './LogOut.css'

export default function LogOut() {
    const authContextData = useContext(AuthContext)
    const navigate = useNavigate()

    const userLogOut = () => {
        authContextData.logOut()
        navigate('/')

    }

    return (
        <div className='log-out-section'>

            <div className="message-logout">
                <span className='logout-icon'><MdOutlineErrorOutline /></span>
                <span> آیا از خروج خود مطمئنید؟ 🙃</span>
            </div>
            <div className="confirm-logout" onClick={userLogOut}>
                <span>تایید و خروج از حساب کاربری</span>
            </div>

        </div>
    )
}

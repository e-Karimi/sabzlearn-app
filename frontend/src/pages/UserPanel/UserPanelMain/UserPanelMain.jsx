import React ,{useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './../../../contexts/AuthContext'
import './UserPanelMain.css'

export default function UserPanelMain() {
  const authContextData = useContext(AuthContext)

  return (
    <div className='userpanel-main-container'>
      <h2>
        <span className='username'>{authContextData.userInfos.name}</span> عزیز خوش آمدی <span className='smile'>:)</span>
      </h2>
      <p className='sentence'> 
        از طریق پیشخوان حساب کاربری‌تان، می‌توانید <Link to="orders/1" className='work-color'>سفارش‌های</Link>
         اخیرتان را مشاهده و جزییات <Link to="edit-account" className='work-color'>حساب کاربری</Link> و 
         <Link to="edit-account" className='work-color'>کلمه عبور</Link> خود را ویرایش کنید.
      </p>

    </div>
  )
}

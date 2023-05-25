import React, { useEffect, useState, useContext } from 'react'
import AuthContext from './../../../contexts/AuthContext'
import AlertBox from './../../../Components/AlertBox/AlertBox';
import { MdOutlineErrorOutline } from 'react-icons/md'
import './EditAccount.css'

export default function EditAccount() {
  const authContextData = useContext(AuthContext)
  const [name, setName] = useState(authContextData.userInfos.name)
  const [userName, setUserName] = useState(authContextData.userInfos.username)
  const [email, setEmail] = useState(authContextData.userInfos.email)
  const [cellphone, setCellphone] = useState(authContextData.userInfos.phone)
  const [password, setPassword] = useState('')
  const [isWellDon, setIsWellDon] = useState(false)
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  

  const editUserAccount = (e) => {
    e.preventDefault()
    setIsSubmit(true)

    if (name && userName && email && cellphone && password !== '') {
  
      let newInfos = {
        name,
        username: userName,
        email,
        phone: cellphone,
        password,
      }

      fetch('http://localhost:4000/v1/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        },
        body: JSON.stringify(newInfos)
      }).then(res => {
        if (res.ok) {
          setIsWellDon(true)
          setTimeout(() => setIsWellDon(false), 3000)
          setTimeout(() => setIsSubmit(false), 3000)
        }
      })
    }else{
      setIsShowAlert(true)
      setTimeout(() => setIsShowAlert(false), 1000)
    }

   
  }

  return (
    <div className='edit-account'>
      <form action="#" onSubmit={(e) => editUserAccount(e)}>
        <div className="form-group-container">
          <div className='form-group'>
            <label htmlFor="name">نام و نام خانوادگی *</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className='form-group'>
            <label htmlFor="username">نام نمایشی *</label>
            <input type="text" id="username" value={userName} onChange={e => setUserName(e.target.value)} />
            <p> اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.</p>
          </div>
        </div>
        <div className="form-group-container">
          <div className='form-group'>
            <label htmlFor="email">آدرس ایمیل *</label>
            <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='form-group fa-num'>
            <label htmlFor="cellphone ">شماره موبایل *</label>
            <input type="text" id="cellphone" value={cellphone} onChange={e => setCellphone(e.target.value)} />
          </div>
        </div>
        <div className="change-password">
          <h2>تغییر گذرواژه</h2>
          <div className="form-group-container">
            <div className='form-group'>
              <input type="password" id="new-password" value={password}  onChange={e => setPassword(e.target.value)} />
              <p>گذرواژه  </p>
            </div>
            {/* <div className='form-group'>
              <input type="password" id="repeat-new-password" value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)} />
              <p>تکرار گذرواژه جدید</p>
              <p>گذرواژه جدید (در صورتی که قصد تغییر ندارید خالی بگذارید)</p>
            </div> */}
          </div>
        </div>

        <button type="submit">ذخیره تغییرات</button>
      </form>

      {isSubmit && isWellDon && 
        <AlertBox
          message="تغییرات با موفقیت انجام شد"
          icon={<MdOutlineErrorOutline />}
          face="🙂"
        />
      }
      { isSubmit && isShowAlert &&
        <AlertBox
          message="تمامی فیلدها را پر کنید"
          icon={<MdOutlineErrorOutline />}
          face="🧐"
        />
      }
  
    </div>
  )
}

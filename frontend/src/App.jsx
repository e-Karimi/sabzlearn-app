import React, { useState, useEffect } from 'react'
import SidebarMenu from './Components/SidebarMenu/SidebarMenu'
import CartPopup from './Components/CartPopup/CartPopup'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import AuthContext from './contexts/AuthContext'
import SidebarMenuProvider from './contexts/sidebarMenuContext'
import CartProvider from './contexts/CartContext'
import './App.css'


export default function App() {
  const router = useRoutes(routes)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState({})

  const login = (token, userInfos) => {
    setIsLoggedIn(true)
    setUserInfos(userInfos)
    setToken(token)
    localStorage.setItem('user', JSON.stringify({ token: token }))
  }

  const logOut = () => {
    setIsLoggedIn(false)
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  }

  const authContextValue = {
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    userInfos,
    setUserInfos,
    login,
    logOut,
  }

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem('user'))

    if (localData) {
      fetch('http://localhost:4000/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${localData.token}`
        }
      }).then(res => res.json())
        .then(userData => {
          // console.log('App.js = > userData :', userData);
          setIsLoggedIn(true)
          setUserInfos(userData)
        })
    } else {
      setIsLoggedIn(false)
      setUserInfos({})
    }
  }, [token])



  return (
    <CartProvider>
      <SidebarMenuProvider>
        <AuthContext.Provider value={authContextValue}>
          {router}
          <SidebarMenu />
          <CartPopup />
        </AuthContext.Provider>
      </SidebarMenuProvider>
    </CartProvider>
  )
}

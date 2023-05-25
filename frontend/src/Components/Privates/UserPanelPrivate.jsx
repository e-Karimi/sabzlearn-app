import React from 'react'
import { Navigate } from 'react-router-dom'

export default function UserPanelPrivate({ children }) {
    let localData = JSON.parse(localStorage.getItem('user'))

    return (
        <>
            {localData ? <>{children}</> : <Navigate to='/login' />}
        </>
    )
}

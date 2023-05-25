import React from 'react'
import './AlertBox.css'

export default function AlertBox({ icon, message, face }) {
    return (
        <div className="alert-box-wrapper">
            <div className="alert-box">
                <span className="alert-box-icon">{icon}</span>
                <span className='alert-message'>{message}</span>
                <span>{face}</span>
            </div>
         </div>
    )
}

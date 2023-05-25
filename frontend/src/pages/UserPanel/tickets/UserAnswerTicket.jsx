import React from 'react'
import {useParams} from 'react-router-dom'
import './UserAnswerTicket.css'

export default function UserAnswerTicket() {
const {ticketID} = useParams()


  return (
    <div className='answer-ticket'>
         <p>   !🤩 UserAnswerTicket page hasn't designed yet </p>
    </div>
  )
}

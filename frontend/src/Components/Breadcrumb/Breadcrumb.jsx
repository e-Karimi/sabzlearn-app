import React from 'react'
import { Link } from 'react-router-dom'
import {RxSlash} from 'react-icons/rx'
import './Breadcrumb.css'

export default function Breadcrumb({ links }) {
    return (
        <>
            <section className="breadcrumb">
                <div className='content-container'>
                    <div className='breadcrumb-list'>
                    {
                            links.slice(0,1).map(link =>
                                <Link to={link.to} key={link.id} className='breadcrumb-link'>
                                    {link.title}

                                    {
                                        link.id !== links.length && <i><RxSlash/></i>
                        
                                    }
                                </Link>
                            )
                        }
                        {
                            links.slice(1).map(link =>
                                <span  key={link.id} className='breadcrumb-link'>
                                    {link.title}

                                    {
                                        link.id !== links.length && <i><RxSlash/></i>
                        
                                    }
                                </span>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

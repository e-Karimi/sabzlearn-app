import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from './../../../contexts/AuthContext'
import './OrderDetails.css'

export default function OrderDetails() {
  const { orderID } = useParams()
  const [orderDetails, setOrderDetails] = useState({})
  const authContextData = useContext(AuthContext)


  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem('user'))

    fetch(`http://localhost:4000/v1/orders/${orderID}`, {
      headers: {
        Authorization: `Bearer ${localData.token}`
      }
    }).then(res => res.json())
      .then(data => {
        setOrderDetails(data[0])
      })
  }, [orderID])


  return (
    <>
      {
        orderDetails._id &&

        <section className='order-details'>
          <p className='summary'>سفارش
            <span className='mark hashtag'><span>{orderDetails._id.slice(-6)}</span> <span>#</span> </span>
            در تاریخ <span className='mark dirction fa-num'>{orderDetails.createdAt.slice(0, 10)}</span> ثبت شده است
            و در حال حاضر در وضعیت <span className='mark'>تکمیل شده</span> می‌باشد.</p>

          <h2>مشخصات سفارش</h2>
          <table id="order-details-table" className='fa-num'>
            <thead>
              <tr>
                <th>محصول</th>
                <th>مجموع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='title-product'> <span>{orderDetails.course.name} </span> × <span>1</span></td>
                <td>
                  <span>
                    {orderDetails.price === 0 ? orderDetails.price :
                      orderDetails.price.toLocaleString('en-US')}
                  </span>
                  <small>تومان</small>
                </td>
              </tr>
              <tr>
                <td>جمع كل سبد خريد:</td>
                <td>
                  <span>
                    {orderDetails.price === 0 ? orderDetails.price :
                      orderDetails.price.toLocaleString('en-US')}
                  </span>
                  <small>تومان</small>
                </td>
              </tr>
              {orderDetails.price !== 0 &&
                <tr>
                  <td>روش پرداخت:</td>
                  <td>درگاه پرداخت آیدی پی</td>
                </tr>
              }
            </tbody>
          </table>

          <section className="customer-details">
            <h2>آدرس صورتحساب</h2>
            <address>
              <p>{authContextData.userInfos.name} </p>
              <p className='fa-num'>{authContextData.userInfos.phone}</p>
              <p>{authContextData.userInfos.email}</p>

            </address>
          </section>

        </section>
      }
    </>

  )
}

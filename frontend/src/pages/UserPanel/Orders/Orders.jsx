import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Pagination from './../../../Components/Pagination/Pagination'
import './Orders.css'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [paginatedOrders, setPaginatedOrders] = useState([])


  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem('user'))

    fetch(`http://localhost:4000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${localData.token}`
      }
    }).then(res => res.json())
      .then(data => {
        setOrders(data)
      })

  }, [])

  return (
    <div className='order'>
      <table id="order">
        <thead>
          <tr>
            <th>سفارش</th>
            <th>تاریخ</th>
            <th>وضعیت</th>
            <th>مجموع</th>
            <th className='actions'>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.length !== 0 &&
            paginatedOrders.map((order) =>
              <tr key={order._id}>
                <td className='hashtag'>
                  <span>{order._id.slice(-6)}</span>
                  <span >#</span>
                </td>
                <td className='fa-num'>{order.updatedAt.slice(0, 10)}</td>
                <td>تکمیل شده</td>
                <td>
                  <span className='fa-num'>
                    {order.course.price === 0 ? order.course.price :
                      order.course.price.toLocaleString("en-US")}
                  </span>
                  <small>تومان</small>
                </td>
                <td className='show-order-details'>
                  <Link to={`view-order/${order._id}`}>نمایش</Link>
                </td>
              </tr>

            )
          }
        </tbody>
      </table>
      {
        orders.length !== 0 &&
        <Pagination
          items={orders}
          itemsCountPerPage={2}
          setPaginatedItems={setPaginatedOrders}
          path={`/my-account/orders/`}
          isSmallType={true}
        />
      }

    </div>
  )
}

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BsFillBagDashFill } from 'react-icons/bs'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { BsBagHeart } from 'react-icons/bs'
import { cartContext } from './../../contexts/CartContext'
import AlertBox from './../../Components/AlertBox/AlertBox'
import './Cart.css'

export default function Cart() {
  const cartContextData = useContext(cartContext)

  const removeItemFromCart = (productID) => {
    let updatedUserCart = cartContextData.userCart.filter(product => product._id !== productID)
    cartContextData.setUserCart(updatedUserCart)

    removeItemFromCartInLS(productID)
  }

  function removeItemFromCartInLS(productID) {
    let userCartData = JSON.parse(localStorage.getItem('userCartData'))
    let updatedUserCart = userCartData.filter(product => product._id !== productID)

    localStorage.setItem('userCartData', JSON.stringify(updatedUserCart))
  }


  return (
    <div className='cart'>
      <div className='cart-container fa-num'>
        {
          cartContextData.isAlreadyExist &&
          <AlertBox
            icon={<MdOutlineErrorOutline />}
            message={`  "${cartContextData.currentProductName}"  قبلا به سبد خرید شما اضافه شده`}
            face="😎"
          />
        }
        {
          cartContextData.isAddedToCArt &&
          <AlertBox
            icon={<MdOutlineErrorOutline />}
            message={` "${cartContextData.currentProductName}"  به سبد خرید اضافه شد`}
            face="😊"
          />
        }
        <div className='cart-header-container'>
          <div className="cart-header">
            <span className='cart-icon'><BsBagHeart /></span>
            <h1>
              <Link to="/cart">سبد خرید</Link>
            </h1>
          </div>
          <div className='cart-header-desktop'>
            <span className='cart-icon'><BsBagHeart /></span>
            <div className="step">
              <div className='step-num active-step'>1</div>
              <h2>
                <Link to="/cart">سبد خرید</Link>
              </h2>
              <span className='arrow-left'><RiArrowLeftSLine /></span>
            </div>
            <div className="step">
              <div className='step-num'>2</div>
              <h2>
                <Link to="/checkout">جزئیات پرداخت</Link>
              </h2>
              <span className='arrow-left'><RiArrowLeftSLine /></span>
            </div>
            <div className="step">
              <div className='step-num'>3</div>
              <h2>
                <Link to="">اتمام عملیات خرید  </Link>
              </h2>
            </div>
          </div>
        </div>

        <div className='cart-body'>
          {
            cartContextData.userCart.length === 0 ?
              <div className="empty-cart">
                <p >سبد خرید شما در حال حاضر خالی است.</p>
                <span>
                  <Link to="/shop" > بازگشت به فروشگاه </Link>
                </span>
              </div>
              :
              <div className="cart-body-container">
                <table id="cart-table">
                  <thead>
                    <tr>
                      <th className='product-name'>محصول</th>
                      <th>تعداد</th>
                      <th className='hide-in-mobile'>	قیمت</th>
                      <th className='hide-in-mobile'>جمع جزء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartContextData.userCart.map(product =>
                        <tr key={product._id}>
                          <td className='product-name '>
                            <div className='cart-item'>
                              <div className='cart-item-stuff'>
                                <span onClick={() => removeItemFromCart(product._id)}>
                                  <BsFillBagDashFill className="remove-item" />
                                </span>
                                <img src={`./imgs/courses/${product.cover}`} />
                              </div>
                              <div className="cart-item-text">
                                <Link to={`/course-info/${product.shortName}/1`} >
                                  <span className='title-item'>{product.name} </span>
                                </Link>
                                <div className='hide-in-desktop'>
                                  <span className='price-mobile'>
                                    {product.price === 0 ? product.price : product.price.toLocaleString('en-US')}{" "}
                                    <span>تومان</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='hide-in-mobile'>
                            <span className='price'>
                              {product.price === 0 ? product.price : product.price.toLocaleString('en-US')}
                            </span>
                            <span>تومان</span>
                          </td>
                          <td>{product.number}</td>
                          <td className='hide-in-mobile'>
                            <span className='price'>
                              {product.price === 0 ? product.price : product.price.toLocaleString('en-US')}
                            </span>
                            <span>تومان</span>
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>

                <div className="back-to-shop">
                  <Link to="/shop" > بازگشت به فروشگاه </Link>
                </div>

                <div className="cart-body-end">

                  <div className="">
                    <div className="total-price-cart">
                      <h3>   مجموع :</h3>
                      <div className="total-price">
                        <span>
                          {cartContextData.totalPrice === 0 ? 0 : cartContextData.totalPrice.toLocaleString('en-US')}
                        </span>{" "}
                        <span>تومان</span>
                      </div>
                    </div>
                    <Link to="/checkout" className="payment"> نهایی کردن سفارش</Link>
                  </div>

                  <div className="discount">
                    <input type="text" className='input-discount' placeholder='کد تخفیف' />
                    <button className="apply-discount"> اعمال کد تخفیف</button>
                  </div>

                </div>
              </div>
          }

        </div>
      </div>
    </div>
  )
}

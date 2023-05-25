import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { cartContext } from './../../contexts/CartContext'
import useOutsideClick from './../../hooks/useOutsideClick';
import './CartPopup.css'

export default function CartPopup() {
    const cartContextData = useContext(cartContext)
    const cartPopupContainerRef = useRef(null)
    const cartPopupRef = useRef(null)

    const hideCartPopup = () => cartContextData.setIShowCartPopup(false)
    useOutsideClick(cartPopupContainerRef, cartPopupRef, hideCartPopup)


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
        <>
            {cartContextData.isShowCartPopup &&
                <div className="cart-popup-container-ref" ref={cartPopupContainerRef}>
                    <div className='cart-popup' ref={cartPopupRef}>
                        <div className='cart-popup-container'>
                            <div className='cart-popup-header'>
                                <h1>سبد خرید</h1>
                                <div className="mini-border"></div>
                                <span className='cart-popup-close-btn' onClick={() => cartContextData.setIShowCartPopup(false)}>
                                    <IoMdClose />
                                </span>
                            </div>
                            {
                                cartContextData.userCart.length === 0 ?
                                    <div className="empty-cart">
                                        <p >سبد خرید شما در حال حاضر خالی است.</p>
                                        <span onClick={() => cartContextData.setIShowCartPopup(false)}>
                                            <Link to="/shop" > بازگشت به فروشگاه </Link>
                                        </span>
                                    </div>
                                    :
                                    <div className='cart-popup-body'>
                                        <div className="cart-popup-body-container">
                                            <ul>
                                                {
                                                    cartContextData.userCart.map(product =>
                                                        <li key={product._id} className='cart-popup-item'>
                                                            <Link to={`/course-info/${product.shortName}/1`} className='cart-popup-item-info'>
                                                                <img src={`./../../imgs/courses/${product.cover}`} />
                                                                <span className='title-item fa-num'>
                                                                    {product.name}
                                                                </span>
                                                                <span className='delete-item'
                                                                    onClick={() => removeItemFromCart(product._id)}
                                                                >
                                                                    <AiOutlineCloseCircle />
                                                                </span>
                                                            </Link>
                                                            <div className='price-cart-popup-item fa-num'>
                                                                <span>1  × </span>
                                                                <span className='price fa-num'>
                                                                    {product.price === 0 ? product.price : product.price.toLocaleString('en-US')}
                                                                </span>
                                                                <span>تومان</span>
                                                            </div>
                                                        </li>

                                                    )
                                                }

                                            </ul>
                                            <div className="total-price-cart-popup fa-num">
                                                <h3>جمع کل سبد خرید :</h3>
                                                <div className="total-price">
                                                    <span>
                                                        {cartContextData.totalPrice === 0 ? 0 : cartContextData.totalPrice.toLocaleString('en-US')}
                                                    </span>{" "}
                                                    <span>تومان</span>
                                                </div>
                                            </div>
                                            <div className="cart-popup-btns">
                                                <button className="show-cart" onClick={hideCartPopup} >
                                                    <Link to="/cart"> مشاهده سبد خرید</Link>
                                                </button>
                                                <button className="payment" onClick={hideCartPopup}>
                                                    <Link to="/checkout"> تسویه  حساب</Link>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            }
        </>

    )
}

import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { BsBagHeart } from 'react-icons/bs'
import { cartContext } from './../../contexts/CartContext'
import AuthContext from './../../contexts/AuthContext'
import AlertBox from './../../Components/AlertBox/AlertBox'
import './Checkout.css'

export default function Checkout() {
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [checkedValue, setCheckedValue] = useState(false)
    const [disagree, setDisagree] = useState(false)
    const [sumDiscount, setSumDiscount] = useState(0)
    const navigate = useNavigate()
    const cartContextData = useContext(cartContext)
    const authContextData = useContext(AuthContext)
    let sum = 0;


    useEffect(() => {
        setName(authContextData.userInfos.name)
        setUserName(authContextData.userInfos.username)
        setEmail(authContextData.userInfos.email)
        setCellphone(authContextData.userInfos.phone)
        calculateAllDiscount()
    }, [])

    //* ---------register Order------------*//
    function registerOrder() {

        if (!checkedValue) {
            setDisagree(true)
            setTimeout(() => setDisagree(false), 1000)
            return false;
        }

        cartContextData.userCart.map(item => {
            registerHandler(item.courseId, item.price, item.discount)
        })
    }

    function registerHandler(courseId, coursePrice, discount) {
        fetch(`http://localhost:4000/v1/courses/${courseId}/register`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price: coursePrice - (coursePrice * discount / 100) })
        })
            .then(res => res.json())
            .then(data => {
                cartContextData.setIsRegistered(true)
                cartContextData.setUserCart([])
                SetUserCartInLS()
            })

    }

    //Set useCArtData  as empty array in LS
    function SetUserCartInLS() {
        let userCartData = JSON.parse(localStorage.getItem('userCartData'))
        userCartData = []
        localStorage.setItem('userCartData', JSON.stringify(userCartData))

        setTimeout(() => navigate('/my-account/bought'), 1000)
        setTimeout(() => cartContextData.setIsRegistered(false), 5000)
    }

    //* ---------calculate All Discount------------*//
    const calculateAllDiscount = () => {
        cartContextData.userCart.map(item => {
            sum += (item.price * item.discount / 100)
            return sum;
        })

        setSumDiscount(sum)
    }


    return (
        <div className='checkout'>
            <div className='content-container'>
                <div className='checkout-container'>
                    <div className='cart-header-container'>
                        <div className="cart-header">
                            <span className='cart-icon'><BsBagHeart /></span>
                            <h1>
                                <Link to="/cart"> جزئیات پرداخت</Link>
                            </h1>
                        </div>
                        <div className='cart-header-desktop fa-num'>
                            <span className='cart-icon'><BsBagHeart /></span>
                            <div className="step">
                                <div className='step-num'>1</div>
                                <h2>
                                    <Link to="/cart">سبد خرید</Link>
                                </h2>
                                <span className='arrow-left'><RiArrowLeftSLine /></span>
                            </div>
                            <div className="step">
                                <div className='step-num active-step'>2</div>
                                <h2>
                                    <Link to="/chekout">جزئیات پرداخت</Link>
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
                    <div className='checkout-body-container'>
                        <div className='checkout-userData'>
                            <form>
                                <div className="form-group-container">
                                    <div className='form-group'>
                                        <label htmlFor="name">نام و نام خانوادگی *</label>
                                        <input type="text" id="name" defaultValue={name} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="username">نام نمایشی *</label>
                                        <input type="text" id="username" defaultValue={userName} />
                                    </div>
                                </div>
                                <div className="form-group-container">
                                    <div className='form-group'>
                                        <label htmlFor="email">آدرس ایمیل *</label>
                                        <input type="text" id="email" defaultValue={email} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="cellphone fa-num">شماره موبایل *</label>
                                        <input type="text" id="cellphone" defaultValue={cellphone} />
                                    </div>
                                </div>
                            </form>

                            <div className="checkout-discount fa-num">
                                <p>اگر کد تخفیف دارید، لطفا در زیر بنویسید.</p>
                                <div className="discount-wrapper">
                                    <input type="text" className='input-discount' placeholder='کد تخفیف' />
                                    <button className="apply-discount"> اعمال کد تخفیف</button>
                                </div>
                            </div>
                        </div>
                        <div className='checkout-cartData fa-num'>
                            <table id="checkout-table">
                                <tbody>
                                    {
                                        cartContextData.userCart.map(product =>
                                            <tr key={product._id}>
                                                <td className='product-title'>
                                                    <span className='title-item'>{product.name} </span>
                                                </td>
                                                <td className='price'>
                                                    <span>
                                                        {product.price === 0 ? product.price : product.price.toLocaleString('en-US')}
                                                    </span>{" "}
                                                    <span className='currency'>تومان</span>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    <tr>
                                        <td>جمع جزء</td>
                                        <td className='price'>
                                            <span>
                                                {cartContextData.totalPrice === 0 ? cartContextData.totalPrice :
                                                    cartContextData.totalPrice.toLocaleString('en-US')}
                                            </span>{" "}
                                            <span className='currency'>تومان</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>با تخفیف</td>
                                        <td className='price'>
                                            <span >
                                                {sumDiscount === 0 ? sumDiscount :
                                                    <span className='discount-color'>{sumDiscount.toLocaleString('en-US')}</span>}
                                            </span>{" "}
                                            <span className='currency'>تومان</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>مجموع</td>
                                        <td className='price'>
                                            <span>
                                                {cartContextData.totalPrice === 0 ? cartContextData.totalPrice :
                                                    (cartContextData.totalPrice - sumDiscount).toLocaleString('en-US')}

                                            </span>{" "}
                                            <span className='currency'>تومان</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='payment-way'>
                                <input type="checkbox" defaultChecked />
                                <h3>پرداخت امن زرین پال</h3>
                            </div>
                            <p>پرداخت امن به وسیله کلیه کارت های عضو شتاب</p>
                            <div className='accept-rule'>
                                <input type="checkbox" checked={checkedValue} onChange={() => setCheckedValue(prev => !prev)} />
                                <span> من شرایط و مقررات سایت را خوانده ام و آن را می پذیرم. *</span>
                            </div>
                            {disagree &&
                                <AlertBox
                                    message="لطفا با قوانین سایت موافقت کنید"
                                    icon={<MdOutlineErrorOutline />}
                                    face=""
                                />
                            }
                            <div onClick={registerOrder}>
                                <Link to="" className='register-order'>ثبت سفارش</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { createContext, useState, useEffect } from "react";

export const cartContext = createContext()

const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [userCart, setUserCart] = useState([])
    const [productCount, setProductCount] = useState(0)
    const [isShowCartPopup, setIShowCartPopup] = useState(false)
    const [isAlreadyExist, setISAlreadyExist] = useState(false)
    const [isAddedToCArt, setISAddedToCArt] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [currentProductName, setCurrentProductName] = useState('')


    useEffect(() => {
        //*Get all products
        fetch(`http://localhost:4000/v1/courses`)
            .then(res => res.json())
            .then(data => setProducts(data))

        //*Get userCart From localStorage
        let userCartData = JSON.parse(localStorage.getItem('userCartData'))
        setUserCart(userCartData)
    }, [])
    
    useEffect(() => {
        //*Calculate total price in userCart
        const sumPrice = userCart.reduce((previous, current) => {
            return (previous + current.price)
        }, 0)

        setTotalPrice(sumPrice)

    }, [userCart])

    const contextValue = {
        products,
        setProducts,
        userCart,
        setUserCart,
        productCount,
        setProductCount,
        isShowCartPopup,
        setIShowCartPopup,
        isAlreadyExist,
        setISAlreadyExist,
        totalPrice,
        setTotalPrice,
        isAddedToCArt,
        setISAddedToCArt,
        currentProductName,
        setCurrentProductName,
        isRegistered,
        setIsRegistered
    }

    return (
        <cartContext.Provider value={contextValue}>
            {children}
        </cartContext.Provider>
    )
}


export default CartProvider;
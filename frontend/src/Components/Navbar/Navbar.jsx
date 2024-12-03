import React, { useContext, useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { RiUserHeartLine } from "react-icons/ri";
import { CgShoppingBag } from "react-icons/cg";
import { Link } from "react-router-dom";
import AuthContext from "./../../contexts/AuthContext";
import { cartContext } from "./../../contexts/CartContext";
import { sidebarMenuContext } from "./../../contexts/sidebarMenuContext";
import "./Navbar.css";

export default function Navbar({ mainPage }) {
  const authContextData = useContext(AuthContext);
  const cartContextData = useContext(cartContext);
  const sidebarContextData = useContext(sidebarMenuContext);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/menus")
      .then((res) => res.json())
      .then((data) => {
        setMenus(data);
      });
  }, []);

  return (
    <nav className={`main-nav ${mainPage && "transparent-bg"}`}>
      {/*------------- mobile----------- */}
      <div className="main-nav-mobile fa-num">
        <div className="flex-container">
          <div id="hamburger" onClick={() => sidebarContextData.setIsShowSidebarMenu(true)}>
            <div className="line" id="one"></div>
            <div className="line" id="two"></div>
            <div className="line" id="three"></div>
          </div>
          <Link to="/">
            <img src="./../../imgs/logo/Logo.png" className="logo" />
          </Link>

          <div className="left-navbar">
            <Link to={`${authContextData.isLoggedIn ? "/my-account" : "/login"}`}>
              <span className="user">
                <RiUserHeartLine />
              </span>
            </Link>

            <div className="bag-icon" onClick={() => cartContextData.setIShowCartPopup(true)}>
              <span>
                {" "}
                <CgShoppingBag />
              </span>
              {cartContextData?.userCart?.length !== 0 && (
                <div className="product-count">{cartContextData.userCart.length}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/*--------------- desktop------------ */}
      <div className="content-container">
        <div className="main-nav-desktop fa-num">
          <div className="flex-container">
            <div className="right">
              <Link to="/">
                <img src="./../../imgs/logo/Logo.png" className="logo" />
              </Link>
              <ul className="desk-menu-links">
                {menus.map((menu) => (
                  <li key={menu._id}>
                    <Link to={`${menu.href}/1`}> {menu.title} </Link>

                    {menu.submenus?.length !== 0 && (
                      <>
                        <span className="arrow">
                          {" "}
                          <SlArrowDown />
                        </span>
                        <ul className="desktop-dropdown-menu">
                          {menu.submenus.map((submenu) => (
                            <li key={submenu._id} className="desktop-dropdown-menu-item">
                              <Link to={`${submenu.href}/1`}>{submenu.title}</Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="left">
              {!authContextData.isLoggedIn ? (
                <div className="user-login">
                  <Link to="/login">ورود / عضویت</Link>
                </div>
              ) : (
                <Link to="/my-account" className="user-info">
                  <span> {authContextData.userInfos.username}</span>
                  <span className="user-enroll">
                    {" "}
                    <RiUserHeartLine />
                  </span>
                </Link>
              )}
              <Link to="/cart">
                <span className="bag-icon">
                  <span>
                    <CgShoppingBag />
                  </span>
                  {cartContextData.userCart.length !== 0 && (
                    <span className="product-count">{cartContextData.userCart.length}</span>
                  )}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

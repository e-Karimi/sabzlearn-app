import React from "react";
import Index from './pages/Index/Index'
import CourseInfo from './pages/CourseInfo/CourseInfo'
import ArticleInfo from './pages/ArticleInfo/ArticleInfo'
import Category from './pages/Category/Category'
import Cart from './pages/Cart/Cart'
import LoginRegister from './pages/LoginRegister/LoginRegister'
import Search from './pages/Search/Search'
import Session from './pages/Session/Session'
import SessionRedirect from './pages/SessionRedirect/SessionRedirect'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Blog from './pages/Blog/Blog'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import Shop from './pages/Shop/Shop'
import Checkout from './pages/Checkout/Checkout'
//UserPanel 
import UserPanel from './pages/UserPanel/Index'
import UserPanelMain from './pages/UserPanel/UserPanelMain/UserPanelMain'
import Orders from './pages/UserPanel/Orders/Orders'
import OrderDetails from './pages/UserPanel/OrderDetails/OrderDetails'
import UserCourses from './pages/UserPanel/UserCourses/UserCourses'
import EditAccount from './pages/UserPanel/EditAccount/EditAccount'
import UserTickets from './pages/UserPanel/tickets/UserTickets'
import UserSendTicket from './pages/UserPanel/tickets/UserSendTicket'
import UserAnswerTicket from './pages/UserPanel/tickets/UserAnswerTicket'
import Wallet from './pages/UserPanel/Wallet/Wallet'
import LogOut from './pages/UserPanel/LogOut/LogOut'
//Private
import UserPanelPrivate from './Components/Privates/UserPanelPrivate'



const routes = [
    { path: '/', element: <Index /> },
    { path: '/course-info/:courseName/:page', element: <CourseInfo /> },
    { path: '/article-info/:articleName', element: <ArticleInfo /> },
    { path: '/category-info/:categoryName/:page', element: <Category /> },
    { path: '/cart', element: <Cart /> },
    { path: '/Search/:searchValue', element: <Search /> },
    { path: '/courses/:courseName/:sessionID', element: <Session /> },
    { path: '/courses/:courseName/session-redirect', element: <SessionRedirect /> },
    { path: '/login', element: <LoginRegister /> },
    { path: '/contact', element: <Contact /> },
    { path: '/contact', element: <Contact /> },
    { path: '/about', element: <About /> },
    { path: '/blog/:page', element: <Blog /> },
    { path: '/privacy-policy', element: <PrivacyPolicy /> },
    { path: '/shop', element: <Shop /> },
    { path: '/checkout', element: <Checkout /> },

    {
        path: '/my-account/*',
        element: <UserPanelPrivate><UserPanel /></UserPanelPrivate>,
        children: [
            { path: '', element:<UserPanelMain/>},
            { path: 'orders/:page', element:<Orders/>},
            { path: 'orders/:page/view-order/:orderID', element:<OrderDetails/>},
            { path: 'bought', element:<UserCourses/>},
            { path: 'edit-account', element:<EditAccount/>},
            { path: 'tickets', element:<UserTickets/>},
            { path: 'send-ticket', element:<UserSendTicket/>},
            { path: 'tickets/answer/:ticketID', element: <UserAnswerTicket /> },
            { path: 'wallet', element:<Wallet/>},
            { path: 'log-out', element:<LogOut/>},
         
        ]
    },
 


]


export default routes;
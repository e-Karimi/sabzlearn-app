import React, { useContext, useState } from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Input from '../../Components/Form/Input'
import Button from '../../Components/Form/Button'
import { requiredValidator, minValidator, maxValidator, phoneValidator, emailValidator } from './../../validators/rules'
import useForm from './../../hooks/useForm'
import AuthContext from '../../contexts/AuthContext'
import AlertBox from '../../Components/AlertBox/AlertBox';
import { MdOutlineErrorOutline } from 'react-icons/md'
import { TiKey } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";
import './LoginRegister.css'

export default function LoginRegister() {
    const [isShowAlert, setIsShowAlert] = useState(false)
    const [isGoogleRecaptchVerify, setIsGoogleRecaptchVerify] = useState(false)
    const [loginFormState, loginDispatchHandler] = useForm({
        identifier: { value: '', isValid: false },
        loginPassword: { value: '', isValid: false },

    }, false)
    const [enrollFormState, enrollDispatchHandler] = useForm({
        enrollphone: { value: '', isValid: false },
        enrollUsername: { value: '', isValid: false },
        enrollName: { value: '', isValid: false },
        enrollEmail: { value: '', isValid: false },
        enrollPassword: { value: '', isValid: false },
        ConfirmEnrollPassword: { value: '', isValid: false },
    }, false)

    const authContextData = useContext(AuthContext)
    const navigate = useNavigate()
    

    const loginUser = (e) => {
        e.preventDefault()

        const userData = {
            identifier: loginFormState.inputs.identifier.value,
            password: loginFormState.inputs.loginPassword.value,
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }

        fetch('http://localhost:4000/v1/auth/login', options)
            .then(res => {
                if (!res.ok) {
                    return res.text().then(text => {
                        throw new Error(text)
                    })
                } else {
                    return res.json()
                }
            }).then(data => {
                authContextData.login(data.accessToken, {})

                setIsShowAlert(true)
                
                setTimeout(() => {
                    setIsShowAlert(false)
                    navigate('/my-account')
                }, 1000)

            }).catch(error => {
                console.log("Oops!", error);
                setIsShowAlert(true)
                setTimeout(() => setIsShowAlert(false), 2000)
            })
    }

    const recaptchaHandler = () => {
        setIsGoogleRecaptchVerify(true)
    }

    const enrollUser = (e) => {
        e.preventDefault()

        const newUserInfos = {
            name: enrollFormState.inputs.enrollName.value,
            username: enrollFormState.inputs.enrollUsername.value,
            email: enrollFormState.inputs.enrollEmail.value,
            phone: enrollFormState.inputs.enrollphone.value,
            password: enrollFormState.inputs.enrollPassword.value,
            confirmPassword: enrollFormState.inputs.ConfirmEnrollPassword.value,
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserInfos)
        }

        fetch('http://localhost:4000/v1/auth/register', options)
            .then(res => res.json())
            .then(data => {
                authContextData.login(data.accessToken, data.user)

                setIsShowAlert(true)

                setTimeout(() => {
                    setIsShowAlert(false)
                    navigate('/my-account')
                }, 3000)
            })
    }



    return (
        <>
            <Header />
            <div className="my-account">
                <h1 className="title">حساب کاربری من</h1>
                <div className="content-container">
                     {/* ------------------alert -----------------*/}
                        {isShowAlert &&
                            <AlertBox
                                icon={authContextData.isLoggedIn ? <TiKey /> : <MdOutlineErrorOutline />}
                                message={authContextData.isLoggedIn ? "با موفقیت وارد شدید" : "ایمیل یا پسورد اشتباه می باشد"}
                                face={authContextData.isLoggedIn ? "😊" : "😑"}
                            />
                        }

                    <div className="flex-container">
                        {/* ------------------login -----------------*/}
                        <div className="login">
                            <h3>ورود</h3>
                            <form action="#" className="login-form" id="login">
                                <div className="form-item">
                                    <p><label htmlFor="identifier">  ایمیل یا نام کاربری   *</label></p>
                                    <Input type="text"
                                        inputId="identifier"
                                        validations={[requiredValidator(), minValidator(8), maxValidator(30)]}
                                        loginDispatchHandler={loginDispatchHandler}
                                        formId="login"
                                    />
                                </div>
                                <div className="form-item">
                                    <p><label htmlFor="loginPassword">  گذرواژه * </label></p>
                                    <Input type="password"
                                        inputId="loginPassword"
                                        validations={[requiredValidator(), minValidator(8), maxValidator(18)]}
                                        loginDispatchHandler={loginDispatchHandler}
                                        formId="login"
                                    />
                                </div>
                                <div className="recaptcha-container">
                                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={recaptchaHandler} />
                                </div>

                                <Button type='submit'
                                    onClick={loginUser}
                                    className={` submit-btn ${loginFormState.isFormValid &&  isGoogleRecaptchVerify ?
                                        'button-bg-success' : 'button-bg-error'}`}
                                    disabled={!loginFormState.isFormValid || !isGoogleRecaptchVerify}
                                >
                                    ورود
                                </Button>
                            </form>
                        </div>
                        {/* ------------------register -----------------*/}
                        <div className="register">
                            <h3>عضویت</h3>
                            <form action="#" className="register-form" id="enroll">
                                <div className="form-item">
                                    <p><label htmlFor="enrollName">  نام    *</label></p>
                                    <Input type="text"
                                        inputId="enrollName"
                                        validations={[requiredValidator(), minValidator(8), maxValidator(18)]}
                                        enrollDispatchHandler={enrollDispatchHandler}
                                        formId="enroll"
                                    />
                                </div>

                                <div className="form-item">
                                    <p><label htmlFor="enrollUsername">  نام کاربری   *</label></p>
                                    <Input type="text"
                                        inputId="enrollUsername"
                                        validations={[requiredValidator(), minValidator(8), maxValidator(18)]}
                                        enrollDispatchHandler={enrollDispatchHandler}
                                        formId="enroll"
                                    />
                                </div>
                                <div className="form-item">
                                    <p><label htmlFor="enrollphone">  شماره موبایل *</label></p>
                                    <Input type="text"
                                        inputId="enrollphone"
                                        validations={[requiredValidator(), minValidator(8), maxValidator(11), phoneValidator()]}
                                        enrollDispatchHandler={enrollDispatchHandler}
                                        formId="enroll"
                                    />
                                </div>

                                <div className="form-item">
                                    <p><label htmlFor="enrollEmail"> آدرس ایمیل   *</label></p>
                                    <Input type="email"
                                        inputId="enrollEmail"
                                        validations={[requiredValidator(), minValidator(8), maxValidator(30), emailValidator()]}
                                        enrollDispatchHandler={enrollDispatchHandler}
                                        formId="enroll"
                                    />
                                </div>

                                <div className="form-item">
                                    <p><label htmlFor="enrollPassword">  گذرواژه * </label></p>
                                    <Input type="password"
                                        inputId="enrollPassword"
                                        validations={[requiredValidator(), minValidator(8), maxValidator(18)]}
                                        enrollDispatchHandler={enrollDispatchHandler}
                                        formId="enroll"
                                    />
                                </div>
                                <div className="form-item">
                                    <p><label htmlFor="ConfirmEnrollPassword">  تایید گذرواژه* </label></p>
                                    <Input type="password"
                                        inputId="ConfirmEnrollPassword"
                                        validations={[requiredValidator(), minValidator(8), maxValidator(18)]}
                                        enrollDispatchHandler={enrollDispatchHandler}
                                        formId="enroll"
                                    />
                                </div>

                                <Button type='submit'
                                    onClick={enrollUser}
                                    className={` submit-btn ${enrollFormState.isFormValid ? 'button-bg-success' : 'button-bg-error'}`}
                                    disabled={!enrollFormState.isFormValid}
                                > عضویت</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

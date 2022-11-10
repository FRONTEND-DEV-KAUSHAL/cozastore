import { Form, Formik, useFormik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotAction, loginAction, signinAction, signupAction } from '../../redux/action/Auth.Action';

function Auth(props) {
    const [user, setUser] = useState('login');
    const [forgot, setForgot] = useState(false);

    const dispatch = useDispatch();
    let setSchema, setInitvalue;
    if (user === 'login' && forgot === false) {
        setSchema = {
            email: yup.string().required("Please Enter Email Address").email("Enter Valid Email"),
            password: yup.string().required("Password is Wrong")
        }

        setInitvalue = {
            email: '',
            password: ''
        }
    } else if (user === 'signup' && forgot === false) {
        setSchema = {
            name: yup.string().required("Please Enter Your Name"),
            email: yup.string().email("Enter Valid Email").required("Please Enter Email Address"),
            password: yup.string().required("Password is Wrong")
        }

        setInitvalue = {
            name: '',
            email: '',
            password: ''
        }
    } else {
        setSchema = {
            email: yup.string().email("Enter Valid Email").required("Please Enter Email Address"),
        }

        setInitvalue = {
            email: '',
        }
    }
    let schema = yup.object().shape(setSchema);

    const handleSignup = (values) => {
        dispatch(signupAction(values));
    }
    const handleLogin = (values) => {
        console.log(values);
        dispatch(signinAction(values));
        localStorage.setItem("cozastore","123")
    }
    const handleForgot = (values) => {
        dispatch(forgotAction(values));
    }
    const formik = useFormik({
        initialValues: setInitvalue,
        validationSchema: schema,
        enableReinitialize: true,
        onSubmit: values => {
            if (user === 'login' && forgot === false) {
                handleLogin(values);
            } else if (user === 'signup' && forgot === false) {
                handleSignup(values);
            } else {
                handleForgot(values);
            }

        },
    });


    const { handleChange, handleBlur, handleSubmit, errors, touched } = formik;
    return (
        <div>
            <div>
                <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{ backgroundImage: 'url("assets/images/bg-01.jpg")' }}>
                    <h2 className="ltext-105 cl0 txt-center">
                        Contact
                    </h2>
                </section>
                {/* Content page */}
                <section className="bg0 p-t-104 p-b-116">
                    <div className="container">
                        <div className="flex-w flex-tr">
                            <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                                <Formik values={formik}>
                                    <Form onSubmit={handleSubmit}>
                                        {
                                            forgot ?
                                                <h4 className="mtext-105 cl2 txt-center p-b-30">
                                                    Forgot Password
                                                </h4> :
                                                user === 'login' && forgot === false ?
                                                    <h4 className="mtext-105 cl2 txt-center p-b-30">
                                                        Login
                                                    </h4> :
                                                    <h4 className="mtext-105 cl2 txt-center p-b-30">
                                                        Sign Up
                                                    </h4>

                                        }
                                        {
                                            forgot ?
                                                null
                                                :
                                                user === 'login' && forgot === false ?
                                                    null
                                                    :
                                                    <>
                                                        <div className="bor8 m-b-20 how-pos4-parent">
                                                            <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                                                type="text"
                                                                name="name"
                                                                placeholder="Your Name ..."
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </div>
                                                        <p style={{ textAlign: 'center', color: 'red' }}>{errors.name && touched.name ? errors.name : null}</p>
                                                    </>
                                        }

                                        {
                                            forgot ?
                                                <div className="bor8 m-b-20 how-pos4-parent">
                                                    <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                                        type="text"
                                                        name="email"
                                                        placeholder="Your Email Address"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <p>{errors.email && touched.email ? <p style={{ textAlign: 'center', color: 'red' }}>{errors.email}</p> : ''}</p>
                                                </div>
                                                :
                                                user === 'login' ?
                                                    <div className="bor8 m-b-20 how-pos4-parent">
                                                        <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                                            type="text"
                                                            name="email"
                                                            placeholder="Your Email Address"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {errors.email && touched.email ? <p style={{ textAlign: 'center', color: 'red' }}>{errors.email}</p> : ''}
                                                    </div>
                                                    :
                                                    <div className="bor8 m-b-20 how-pos4-parent">
                                                        <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                                            type="text"
                                                            name="email"
                                                            placeholder="Your Email Address"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />

                                                        <p>{errors.email && touched.email ? <p style={{ textAlign: 'center', color: 'red' }}>{errors.email}</p> : null}</p>
                                                    </div>
                                        }

                                        <div className="bor8 m-b-30">

                                            {
                                                forgot ?
                                                    null
                                                    :
                                                    user === 'login' && forgot === false ?
                                                        <>
                                                            <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                                                type="password"
                                                                name="password"
                                                                placeholder="Your Password"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            <p>{errors.password && touched.password ? <p style={{ textAlign: 'center', color: 'red' }}>{errors.password}</p> : null}</p>

                                                        </>

                                                        :
                                                        <>
                                                            <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                                                type="password"
                                                                name="password"
                                                                placeholder="Your Password"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />

                                                            <p>{errors.password && touched.password ? <p style={{ textAlign: 'center', color: 'red' }}>{errors.password}</p> : null}</p>
                                                        </>
                                            }
                                        </div>
                                        <div className='m-b-30'>
                                            {
                                                forgot ?
                                                    <>
                                                        <a href='javascript:void(0)' onClick={() => { setUser('signup'); setForgot(false) ;}}>New On Cozastore? Signup</a>
                                                        <a href='#' className='p-lr-15' onClick={() => { setForgot(false); setUser('login') }}>Already Have An Account?</a>
                                                    </>
                                                    :
                                                    user === 'login' && forgot === false ?
                                                           <>
                                                            <a href='javascript:void(0)' onClick={() => { setForgot(true) }}>Forgot Password?</a>
                                                            <a href='#' className='p-lr-15' onClick={() => { setForgot(false); setUser('signup') }}>New On Cozastore? Signup</a>
                                                        </>
                                                        :
                                                        <>
                                                            <a href='javascript:void(0)' onClick={() => { setUser('login') }}>Already Have An Account?</a>
                                                        </>
                                            }
                                        </div>
                                       {
                                        forgot ? 
                                            <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" type='submit' onClick={() => handleForgot()}>
                                                Send 
                                            </button>
                                        :
                                        user === 'login' ? 
                                            <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" type='submit' onClick={() => handleLogin()}>
                                                login
                                            </button>
                                       :
                                            <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" type='submit' onclick={() => handleSignup()}>
                                                Sign up
                                            </button>
                                        }
                                    </Form>
                                </Formik>
                            </div>
                            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">
                                <div className="flex-w w-full p-b-42">
                                    <span className="fs-18 cl5 txt-center size-211">
                                        <span className="lnr lnr-map-marker" />
                                    </span>
                                    <div className="size-212 p-t-2">
                                        <span className="mtext-110 cl2">
                                            Address
                                        </span>
                                        <p className="stext-115 cl6 size-213 p-t-18">
                                            Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-w w-full p-b-42">
                                    <span className="fs-18 cl5 txt-center size-211">
                                        <span className="lnr lnr-phone-handset" />
                                    </span>
                                    <div className="size-212 p-t-2">
                                        <span className="mtext-110 cl2">
                                            Lets Talk
                                        </span>
                                        <p className="stext-115 cl1 size-213 p-t-18">
                                            +1 800 1236879
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-w w-full">
                                    <span className="fs-18 cl5 txt-center size-211">
                                        <span className="lnr lnr-envelope" />
                                    </span>
                                    <div className="size-212 p-t-2">
                                        <span className="mtext-110 cl2">
                                            Sale Support
                                        </span>
                                        <p className="stext-115 cl1 size-213 p-t-18">
                                            contact@example.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Map */}
                <div className="map">
                    <div className="size-303" id="google_map" data-map-x="40.691446" data-map-y="-73.886787" data-pin="assets/images/icons/pin.png" data-scrollwhell={0} data-draggable={1} data-zoom={11} />
                </div>
            </div>


        </div>
    );
}

export default Auth;
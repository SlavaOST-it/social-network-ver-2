import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';

import s from "./Login.module.scss"

import {PATH} from "../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {loginTC} from "../../bll/reducers/auth-reducer";
import bgLogin from "../../assets/img/bgLogin.jpg"


export const Login = () => {
    const dispatch = useAppDispatch()

    const loggedIn = useAppSelector(state => state.auth.loggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },

        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email field is required"),
            password: Yup.string().required("Password field is required").min(8, 'Password length less than 8 characters'),
        }),

        onSubmit: values => {
            dispatch(loginTC({email: values.email, password: values.password, rememberMe: values.rememberMe}))
            formik.resetForm()
        }
    })


    if (loggedIn) {
        return <Navigate to={PATH.profile}/>
    }

    return (
        <div className={s.loginPage}>

            <h2>Добро пожаловать</h2>
            <p>Описание соц сети</p>

            <div className={s.loginBlock}>

                <form onSubmit={formik.handleSubmit} className={s.loginBlock}>
                    <h3>Вход на сайт</h3>

                    <div className={s.inputBlock}>
                        <input
                            className={s.input}
                            id={"email"}
                            placeholder={"E-mail"}
                            {...formik.getFieldProps('email')}
                        />

                        {/*{formik.touched.email && formik.errors.email &&*/}
                        {/*    <div style={{color: 'red'}}>{formik.errors.email}</div>}*/}

                        <input
                            className={s.input}
                            id={"password"}
                            placeholder={"Password"}
                            type="password"
                            {...formik.getFieldProps('password')}
                        />

                        {/*{formik.touched.password && formik.errors.password &&*/}
                        {/*    <div style={{color: 'red'}}>{formik.errors.password}</div>}*/}

                        <input
                            className={s.checkbox}
                            id={"rememberMe"}
                            name="rememberMe"
                            type="checkbox"
                            onChange={formik.handleChange}
                            checked={formik.values.rememberMe}
                        /> Запомнить меня

                        <div>
                            <button
                                type={'submit'}
                                className={s.btn_login}
                                disabled={formik.isSubmitting}
                            >Login
                            </button>
                        </div>
                    </div>
                </form>

                <div className={s.imgBlock}>
                    <img src={bgLogin} alt={'bg'}/>
                </div>
            </div>


        </div>
    );
};

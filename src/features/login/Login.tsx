import React from 'react';
import {Navigate} from 'react-router-dom';

import s from "./Login.module.scss"
import devCircleLogo from "../../assets/img/icons/devLogo.jpg"


import {loginTC} from "../../bll/reducers/auth-reducer";
import {Checkbox, FormGroup} from "@mui/material";
import {FormControlLabel, TextField} from '@material-ui/core';

import {PATH} from "../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";

import {useFormik} from "formik";
import * as Yup from 'yup';


export const Login = () => {
    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector(state => state.auth.loggedIn)
    const captchaImg = useAppSelector(state => state.auth.captchaURL)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ""
        },

        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Поле Email обязательно"),
            password: Yup.string().required("Поле Password обязательно"),
            // captcha: Yup.string().required("Поле Captcha обязательно"),
        }),

        onSubmit: (values) => {
            dispatch(loginTC({
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe,
                captcha: values.captcha
            }))
            formik.resetForm()
        }
    })

    if (loggedIn) {
        return <Navigate to={PATH.profile}/>
    }

    return (
        <div className={s.loginPage}>

            <div className={s.greetings}>
                <h2>Добро пожаловать</h2>
                <img src={devCircleLogo} alt={'bg'}/>
            </div>

            <div className={s.loginBlock}>
                <form onSubmit={formik.handleSubmit} className={s.login}>

                    <h3>Вход</h3>

                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}

                        <TextField
                            label="Password"
                            margin="normal"
                            type={"password"}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <div className={s.checkbox}>
                            <FormControlLabel
                                control={<Checkbox name={'rememberMe'}
                                                   onChange={formik.handleChange}
                                                   value={formik.values.rememberMe}/>}
                                label="Запомнить меня"/>
                        </div>

                        {captchaImg &&
                            <>
                                <img src={captchaImg} alt={"captcha"}/>
                                <TextField
                                    label="Captcha"
                                    margin="normal"
                                    {...formik.getFieldProps('captcha')}
                                />
                                {formik.touched.captcha && formik.errors.captcha &&
                                    <div style={{color: 'red'}}>{formik.errors.captcha}</div>}
                            </>
                        }

                        <button
                            type={'submit'}
                            className={s.btn_login}
                            disabled={formik.isSubmitting}
                        >
                            Войти
                        </button>
                    </FormGroup>

                </form>

                <div className={s.description}>
                    <p>Для тестирования социальной сети <br/>
                        воспользуйтесь тестовым аккаунтом.</p>
                    <p><b>Email: free@samuraijs.com</b></p>

                    <p><b>Password: free</b></p>
                </div>

            </div>
        </div>
    );
};

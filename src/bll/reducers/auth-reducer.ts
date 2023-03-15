import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {authAPI} from "../../api/authAPI";
import {securityAPI} from "../../api/securityAPI";
import {initializeAppTC, setAppErrorAC, setAppStatusAC} from "./app-reducer";

import {AppThunkType} from "../store/store";
import {AuthPageType} from "./reducersTypes/authReducer-types";
import {LoginRequestType} from "../../api/apiConfig/typesAPI/authAPI-types";

import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AppStatus, ResultCode} from "../../common/types/commonTypes";


const initialState: AuthPageType = {
    loggedIn: false,
    captchaURL: null
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loggedInAC(state, action: PayloadAction<{ loggedIn: boolean }>) {
            state.loggedIn = action.payload.loggedIn
        },

        setCaptchaUrlAC(state, action: PayloadAction<{ captchaURL: string | null }>) {
            state.captchaURL = action.payload.captchaURL
        }
    }
})

export const authReducer = slice.reducer
export const {loggedInAC, setCaptchaUrlAC} = slice.actions


// ===== ThunkCreators ===== //

export const loginTC = (data: LoginRequestType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(initializeAppTC())
            dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
        } else {
            if (res.data.resultCode === ResultCode.CAPTCHA) {
                dispatch(getCaptchaUrlTC())
            }
            dispatch(setAppErrorAC({error: res.data.messages.length ? res.data.messages[0] : "Some error"}))
            dispatch(setAppStatusAC({status: AppStatus.FAILED}))
        }
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
    }
}


export const getCaptchaUrlTC = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    const res = await securityAPI.getCaptchaURL()
    const captchaURL = res.data.url
    dispatch(setCaptchaUrlAC({captchaURL}))
}


export const logOutTC = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(loggedInAC({loggedIn: false}))
            dispatch(setCaptchaUrlAC({captchaURL: null}))
            dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
        }
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
    }
}

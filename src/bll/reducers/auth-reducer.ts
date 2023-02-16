import {AuthPageType} from "./reducersTypes/authReducer-types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkType} from "../store/store";
import {initializeAppTC, setAppStatusAC, setInitializedAC} from "./app-reducer";
import {AppStatus} from "../../common/types/commonTypes";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {authAPI} from "../../api/authAPI";
import {LoginRequestType} from "../../api/apiConfig/typesAPI/authAPI-types";

const initialState: AuthPageType = {
    email: null,
    password: null,
    rememberMe: false,
    loggedIn: false,
    errorLogin: null
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        // setAuthDataAC(state, action: PayloadAction<{ email: string | null, password: string | null }>) {
        //     state.email = action.payload.email
        //     state.password = action.payload.password
        // },

        loggedInAC(state, action: PayloadAction<{ loggedIn: boolean }>) {
            state.loggedIn = action.payload.loggedIn
        },

        setErrorLoginAC(state, action: PayloadAction<{ error: string | null }>) {
            state.errorLogin = action.payload.error
        },
    }
})

export const authReducer = slice.reducer
export const {loggedInAC, setErrorLoginAC} = slice.actions


// ===== ThunkCreators ===== //
export const loginTC = (data: LoginRequestType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))

    try {
        const res = await authAPI.login(data)
        if(res.data.resultCode === 0){
            dispatch(initializeAppTC())
            dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
        }

    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
    }
}

export const logOutTC = (): AppThunkType => async(dispatch)=>{
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))

    try {
        const res = await authAPI.logout()
        if(res.data.resultCode === 0) {
            dispatch(loggedInAC({loggedIn: false}))
            dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
        }
    }catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
    }
}

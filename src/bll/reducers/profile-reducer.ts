import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkType} from "../store/store";
import {AxiosError} from "axios";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {profileAPI} from "../../api/profileAPI";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AppStatus, ResultCode} from "../../common/types/commonTypes";
import {UserProfileType} from "../../api/apiConfig/typesAPI/profileAPI-types";
import {ProfilePageType} from "./reducersTypes/profileReducer-types";


const initialState: ProfilePageType = {
    profile: null,
    status: "",
    posts: [
        {id: 1, message: 'Hello! How are you?'}
    ]
}

const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setUserProfileAC(state, action: PayloadAction<{ profile: UserProfileType }>) {
            state.profile = action.payload.profile
        },

        setStatusAC(state, action: PayloadAction<{ status: string }>) {
            state.status = action.payload.status
        },
    }
})

export const profileReducer = slice.reducer
export const {setUserProfileAC, setStatusAC} = slice.actions


// ===== ThunkCreators ===== //
export const getProfileTC = (userId: number): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    try {
        const res = await profileAPI.getProfile(userId)
        dispatch(setUserProfileAC({profile: res.data}))
        dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
    }
}

export const getStatusTC = (userId: number): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    try {
        const res = await profileAPI.getStatusProfile(userId)
        dispatch(setStatusAC({status: res.data}))                                      // !!!!!! ВОЗМОЖНО ЗДЕСЬ ПРОБЛЕМА
        // errorUtilsSocialNetwork(res.data)
        dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const changeStatusTC = (status: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    try {
        const res = await profileAPI.changeStatusProfile(status)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(setStatusAC({status: status}))
            dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
        } else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC({error: res.data.messages[0]}))
            } else {
                dispatch(setAppErrorAC({error: "Some error"}))
            }
            dispatch(setAppStatusAC({status: AppStatus.FAILED}))
        }
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}
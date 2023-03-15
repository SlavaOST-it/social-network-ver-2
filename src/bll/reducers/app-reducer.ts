import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {authAPI} from "../../api/authAPI";
import {loggedInAC} from "./auth-reducer";
import {getProfileTC, setMyIdAC} from "./profile-reducer";

import {AppThunkType} from "../store/store";
import {AppStatus, ResultCode} from "../../common/types/commonTypes";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";


const initialState = {
    status: AppStatus.IDLE,
    error: null as string | null,
    isInitialized: false
};

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: AppStatus }>) {
            state.status = action.payload.status
        },

        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },

        setInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setInitializedAC} = slice.actions


// ===== ThunkCreators ===== //
export const initializeAppTC = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.OK) {
            await dispatch(setMyIdAC({myId: res.data.data.id}))
            await dispatch(getProfileTC(res.data.data.id))
            await dispatch(loggedInAC({loggedIn: true}))
            await dispatch(setInitializedAC({value: true}))

            await dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
        }

    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
    } finally {
        dispatch(setInitializedAC({value: true}))
        dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
    }
}

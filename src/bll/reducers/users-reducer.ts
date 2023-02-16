import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UsersPageType, UserType} from "./reducersTypes/usersReducer-types";
import {AppThunkType} from "../store/store";
import {setAppStatusAC} from "./app-reducer";
import {AppStatus} from "../../common/types/commonTypes";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {usersAPI} from "../../api/usersAPI";


const initialState: UsersPageType = {
    items: [],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,          // нужны ли эти свойства?
    followingDisable: []        // нужны ли эти свойства?
}

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUsersAC(state, action: PayloadAction<{ users: UserType[] }>) {
            state.items = action.payload.users
        },

        setUsersTotalCountAC(state, action: PayloadAction<{ totalUsersCount: number }>) {
            state.totalUsersCount = action.payload.totalUsersCount
        },

        setCurrentPageAC(state, action: PayloadAction<{ currentPage: number }>) {
            state.currentPage = action.payload.currentPage
        },

        followAC(state, action: PayloadAction<{ userId: number }>) {
            let user = state.items.find(u => u.id === action.payload.userId)
            if (user) {
                user.followed = true
            }
        },

        unFollowAC(state, action: PayloadAction<{ userId: number }>) {
            let user = state.items.find(u => u.id === action.payload.userId)
            if (user) {
                user.followed = false
            }
        },
    }
})

export const usersReducer = slice.reducer
export const {setUsersAC, setUsersTotalCountAC, setCurrentPageAC, followAC, unFollowAC} = slice.actions


// ===== ThunkCreators ===== //
export const getUsersThunkCreator = (isFriend?: boolean): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))

    const {
        currentPage,
        pageSize
    } = getState().users

    try {
        const res = await usersAPI.getUsers(currentPage, pageSize, isFriend)
        dispatch(setUsersAC({users: res.data.items}))
        dispatch(setUsersTotalCountAC({totalUsersCount: res.data.totalCount}))

        dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
    }
}


export const followTC = (userId: number): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    try {
        const res = await usersAPI.follow(userId)
        if (res.data.resultCode === 0) {
            dispatch(followAC({userId}))
            dispatch(getUsersThunkCreator(false))
        }

        dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
    }
}


export const unFollowTC = (userId: number): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    try {
        const res = await usersAPI.unfollow(userId)
        if (res.data.resultCode === 0) {
            dispatch(unFollowAC({userId}))
            dispatch(getUsersThunkCreator(true))
        }

        dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
    }
}
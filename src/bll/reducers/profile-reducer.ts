import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkType} from "../store";
import {AxiosError} from "axios";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {profileAPI} from "../../api/api";
import {setAppStatusAC} from "./app-reducer";

export type ProfilePageType = {
    profile: UserProfileType | null,
    status: string,
    posts: PostsDataType[]
}

export type UserProfileType = {
    userId: number | null,
    aboutMe: string | null
    lookingForAJob: boolean | null,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    contacts: {
        github: string | null,
        vk: string | null,
        facebook: string | null,
        instagram: string | null,
        twitter: string | null,
        website: string | null,
        youtube: string | null,
        mainLink: string | null,
    },
    photos: PhotoProfile
}
export type PhotoProfile = {
    small: string | null,
    large: string | null
}

type PostsDataType = {
    id: number,
    message: string
}

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
        }
    }
})

export const profileReducer = slice.reducer
export const {setUserProfileAC} = slice.actions

// ===== ThunkCreators ===== //
export const getProfileTC = (userId: number): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await profileAPI.getProfile(userId)
        dispatch(setUserProfileAC({profile: res}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
    }
}

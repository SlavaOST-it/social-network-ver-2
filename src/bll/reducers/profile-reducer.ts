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
    profile: {} as UserProfileType,
    myId: 0,
    myAvatar: null,

    status: "",
    posts: [
        {id: 1, message: 'React или Angular? Что вы выберите?', likesCount: 1, comments: []},
        {id: 2, message: 'Какие книги посоветуете?', likesCount: 3, comments: [{id: 1, text: "JS для детей LOL =)"}]},
        {
            id: 3,
            message: 'Frontend or Backend? Или же Fullstack?',
            likesCount: 5,
            comments: [
                {id:1, text:"Не парься, выбери MacDonald's"}
            ]
        }
    ]
}

const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setUserProfileAC(state, action: PayloadAction<{ profile: UserProfileType }>) {
            state.profile = action.payload.profile
        },

        setStatusAC(state, action: PayloadAction<{ status: string | null}>) {
            state.status = action.payload.status
        },

        setAvatarAC(state, action: PayloadAction<{ myAvatar: string | null }>) {
            state.myAvatar = action.payload.myAvatar
        },

        setMyIdAC(state, action: PayloadAction<{ myId: number}>) {
            state.myId = action.payload.myId
        },

        addPostAC(state, action: PayloadAction<{ postText: string }>) {
            const newPost = {
                id: new Date().getTime(),
                message: action.payload.postText,
                likesCount: 0,
                comments: []
            }

            state.posts.unshift({...newPost})
        },

        addCommentAC(state, action: PayloadAction<{ commentText: string, postId: number }>) {
            const newComment = {
                id: new Date().getTime(),
                text: action.payload.commentText
            }
            let post = state.posts.find(p => p.id === action.payload.postId)
            if (post) {
                post.comments.push({...newComment})

            }
        },
    }
})

export const profileReducer = slice.reducer
export const {setUserProfileAC, setStatusAC, setAvatarAC, addPostAC, addCommentAC, setMyIdAC} = slice.actions


// ===== ThunkCreators ===== //
export const getProfileTC = (userId: number): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    try {
        const res = await profileAPI.getProfile(userId)
        dispatch(setUserProfileAC({profile: res.data}))
        dispatch(setAvatarAC({myAvatar: res.data.photos.large}))
        dispatch(getStatusTC(userId))
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
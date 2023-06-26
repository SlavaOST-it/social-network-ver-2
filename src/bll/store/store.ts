import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'

import {appReducer} from "../reducers/app-reducer";
import {authReducer} from "../reducers/auth-reducer";
import {chatReducer} from "../reducers/chat-reducer";
import {usersReducer} from "../reducers/users-reducer";
import {profileReducer} from "../reducers/profile-reducer";
import {dialogsReducer} from "../reducers/dialogs-reducer";

import {AppReducerActionTypes} from "../reducers/reducersTypes/appReducer-types";
import {AuthReducerActionTypes} from "../reducers/reducersTypes/authReducer-types";
import {UsersReducerActionTypes} from "../reducers/reducersTypes/usersReducer-types";
import {DialogsReducerActionTypes} from "../reducers/reducersTypes/dialogsReducer-types";
import {ProfileReducerActionTypes} from "../reducers/reducersTypes/profileReducer-types";
import {ChatReducerActionTypes} from "../reducers/reducersTypes/chatReducer-types";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    chat: chatReducer,
    users: usersReducer,
    profile: profileReducer,
    dialogs: dialogsReducer,
})

type ReduxActionType =
    AppReducerActionTypes
    | AuthReducerActionTypes
    | ChatReducerActionTypes
    | UsersReducerActionTypes
    | ProfileReducerActionTypes
    | DialogsReducerActionTypes


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatchType = ThunkDispatch<RootState, unknown, ReduxActionType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ReduxActionType>
// @ts-ignore
window.store = store
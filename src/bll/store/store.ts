import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'

import {appReducer} from "../reducers/app-reducer";
import {authReducer} from "../reducers/auth-reducer";
import {usersReducer} from "../reducers/users-reducer";
import {profileReducer} from "../reducers/profile-reducer";
import {dialogsReducer} from "../reducers/dialogs-reducer";

import {AppReducerActionTypes} from "../reducers/reducersTypes/appReducer-types";
import {AuthReducerActionTypes} from "../reducers/reducersTypes/authReducer-types";
import {UsersReducerActionTypes} from "../reducers/reducersTypes/usersReducer-types";
import {DialogsReducerActionTypes} from "../reducers/reducersTypes/dialogsReducer-types";
import {ProfileReducerActionTypes} from "../reducers/reducersTypes/profileReducer-types";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    dialogs: dialogsReducer,
})

type ReduxActionType =
    AppReducerActionTypes
    | AuthReducerActionTypes
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
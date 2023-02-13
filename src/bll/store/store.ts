import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'

import {appReducer} from "../reducers/app-reducer";
import {profileReducer} from "../reducers/profile-reducer";
import {usersReducer} from "../reducers/users-reducer";
import {dialogsReducer} from "../reducers/dialogs-reducer";

import {AppReducerActionTypes} from "../reducers/reducersTypes/appReducer-types";
import {ProfileReducerActionTypes} from "../reducers/reducersTypes/profileReducer-types";
import {UsersReducerActionTypes} from "../reducers/reducersTypes/usersReducer-types";
import {DialogsReducerActionTypes} from "../reducers/reducersTypes/dialogsReducer-types";


const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    users: usersReducer,
    dialogs: dialogsReducer,
})

type ReduxActionType =
    AppReducerActionTypes
    | ProfileReducerActionTypes
    | UsersReducerActionTypes
    | DialogsReducerActionTypes


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>

// ===== Типизация Dispatch для Actions и Thunks ===== //
export type AppDispatchType = ThunkDispatch<RootState, unknown, ReduxActionType>

// ===== Типизация того что возвращает нам Thunk ===== //
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ReduxActionType>
// @ts-ignore
window.store = store
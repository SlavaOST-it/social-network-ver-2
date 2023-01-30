import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {profileReducer} from "../reducers/profile-reducer";
import {appReducer} from "../reducers/app-reducer";
import {AppReducerActionType} from "../reducers/reducersTypes/appReducer-types";
import {UserReducerType} from "../reducers/reducersTypes/profileReducer-types";


const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
})

type ReduxActionType =
    AppReducerActionType
    | UserReducerType


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>

// ===== Типизация Dispatch для Actions и Thunks ===== //
export type AppDispatchType = ThunkDispatch<RootState, unknown, ReduxActionType>

// ===== Типизация того что возвращает нам Thunk ===== //
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ReduxActionType>
// @ts-ignore
window.store = store
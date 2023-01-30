import {setAppErrorAC, setAppStatusAC, setInitializedAC} from "../app-reducer";

export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetInitializedAT = ReturnType<typeof setInitializedAC>

export type AppReducerActionType = SetAppErrorAT | SetAppStatusAT | SetInitializedAT
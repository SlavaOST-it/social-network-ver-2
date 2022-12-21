import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../../bll/reducers/app-reducer";


export const baseErrorHandler = (e: Error | AxiosError, dispatch: Dispatch<SetAppErrorAT | SetAppStatusAT>) =>{
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data
            ? (err.response.data as ({ error: string })).error
            : err.message
        dispatch(setAppStatusAC({status: 'failed'}))
        dispatch(setAppErrorAC({error: error}))
    }}
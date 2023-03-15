import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../bll/reducers/app-reducer";
import {AppStatus} from "../../common/types/commonTypes";
import {SetAppErrorAT, SetAppStatusAT} from "../../bll/reducers/reducersTypes/appReducer-types";


export const baseErrorHandler = (e: Error | AxiosError, dispatch: Dispatch<SetAppErrorAT | SetAppStatusAT>) => {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data
            ? (err.response.data as ({ error: string })).error
            : err.message
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
        dispatch(setAppErrorAC({error: error}))
    }
}
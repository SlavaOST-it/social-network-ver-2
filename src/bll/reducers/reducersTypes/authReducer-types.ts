
// ===== Initial State ===== //
import {loggedInAC, setCaptchaUrlAC} from "../auth-reducer";

export type AuthPageType = {
    loggedIn: boolean,
    captchaURL: null | string
}

// ===== Action Type ==== //
type LoggedInAT = ReturnType<typeof loggedInAC>
type SetCaptchaUrlAT = ReturnType<typeof setCaptchaUrlAC>

export type AuthReducerActionTypes = LoggedInAT | SetCaptchaUrlAT
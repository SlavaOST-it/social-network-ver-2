
// ===== Initial State ===== //
import {loggedInAC, setErrorLoginAC} from "../auth-reducer";

export type AuthPageType = {
    email: string | null,
    password: string | null,
    rememberMe: boolean,
    loggedIn: boolean,
    errorLogin: string | null
}

// ===== Action Type ==== //
type LoggedInAT = ReturnType<typeof loggedInAC>
type SetErrorLoginAT = ReturnType<typeof setErrorLoginAC>

export type AuthReducerActionTypes = LoggedInAT | SetErrorLoginAT
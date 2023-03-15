
// ===== Initial State ===== //
import {loggedInAC} from "../auth-reducer";

export type AuthPageType = {
    loggedIn: boolean,
}

// ===== Action Type ==== //
type LoggedInAT = ReturnType<typeof loggedInAC>

export type AuthReducerActionTypes = LoggedInAT
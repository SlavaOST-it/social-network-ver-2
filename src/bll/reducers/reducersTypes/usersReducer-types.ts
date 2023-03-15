import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC, unFollowAC
} from "../users-reducer";


// ===== Initial State ===== //
export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: null | string,
    photos: { small: null | string, large: null | string }
    status: null,
    followed: boolean
}

export type UsersPageType = {
    items: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
}


// ===== Action Types ==== //
type  FollowAT = ReturnType<typeof followAC>
type UnFollowAT = ReturnType<typeof unFollowAC>
type SetUsersAT = ReturnType<typeof setUsersAC>
type SetCurrentPageAT = ReturnType<typeof setCurrentPageAC>
type SetUsersTotalCountAT = ReturnType<typeof setUsersTotalCountAC>


export type UsersReducerActionTypes =
    SetUsersAT
    | FollowAT
    | UnFollowAT
    | SetCurrentPageAT
    | SetUsersTotalCountAT

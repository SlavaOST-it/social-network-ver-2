import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC
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
    isFetching: boolean,
    followingDisable: number[]
}


// ===== Action Type ==== //
type SetUsersAT = ReturnType<typeof setUsersAC>
type SetUsersTotalCountAT = ReturnType<typeof setUsersTotalCountAC>
type SetCurrentPageAT = ReturnType<typeof setCurrentPageAC>
type  FollowAT = ReturnType<typeof followAC>


export type UsersReducerActionType =
    SetUsersAT
    | SetUsersTotalCountAT
    | SetCurrentPageAT
    | FollowAT
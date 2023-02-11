import {UserType} from "../../../bll/reducers/reducersTypes/usersReducer-types";

export type UsersResponseType = {
    items: UserType[],

        totalCount: number,
        error: null | string
}

export type FollowResponseType ={
    resultCode: number
    messages: string [],
    data: object
}
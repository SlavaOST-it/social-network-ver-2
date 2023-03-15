import {instance} from "./apiConfig/instance";
import {FollowResponseType, UsersResponseType} from "./apiConfig/typesAPI/usersAPI-types";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize: number, isFriend?: boolean) {
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}&friend=${isFriend}`)
    },

    follow(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`)
    },

    unfollow(userId: number) {
        return instance.delete<FollowResponseType>(`follow/${userId}`)
    }
}
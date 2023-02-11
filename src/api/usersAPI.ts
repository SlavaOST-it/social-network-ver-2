import {instance} from "./apiConfig/instance";
import {FollowResponseType, UsersResponseType} from "./apiConfig/typesAPI/usersAPI-types";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10){
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
    },

    follow(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`)
    },

    unfollow(userId: number) {
        return instance.delete<FollowResponseType>(`follow/${userId}`)
    },

    // getStatusFollowed(userId: number){
    //     return instance.get(`/follow/${userId}`)
    // }
}
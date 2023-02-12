import {instance} from "./apiConfig/instance";
import {ChangeStatusResponseType, UserProfileType} from "./apiConfig/typesAPI/profileAPI-types";


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<UserProfileType>(`/profile/${userId}`)
    },

    getStatusProfile(userId: number) {
        return instance.get(`/profile/status/${userId}`)

    },

    changeStatusProfile(status: string) {
        return instance.put<ChangeStatusResponseType>(`/profile/status`, {status})
    }

}
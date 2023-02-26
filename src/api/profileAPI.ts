import {instance} from "./apiConfig/instance";
import {
    ChangeStatusResponseType,
    UpdatePhotoResponseType,
    UserProfileType
} from "./apiConfig/typesAPI/profileAPI-types";


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<UserProfileType>(`/profile/${userId}`)
    },

    getStatusProfile(userId: number) {
        return instance.get(`/profile/status/${userId}`)

    },

    changeStatusProfile(status: string) {
        return instance.put<ChangeStatusResponseType>(`/profile/status`, {status})
    },

    updatePhoto(photo: string) {
        let formData = new FormData();
        formData.append('image', photo)
        return instance.put<UpdatePhotoResponseType>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

}
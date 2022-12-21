import {instance} from "./instance";
import {UserProfileType} from "../bll/reducers/profile-reducer";



export const authAPI = {
    me(){
        return instance.get(`/auth/me`).then(res => res.data)
    }
}

export const profileAPI = {
    getProfile(userId: number){
        return instance.get<UserProfileType>(`/profile/` + userId).then(res => res.data)
    },


}
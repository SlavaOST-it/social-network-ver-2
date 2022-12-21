import {instance} from "./instance";
import {UserProfileType} from "../bll/reducers/profile-reducer";

export const profileAPI = {
    getProfile(userId: number){
        return instance.get<UserProfileType>(`/profile/` + userId).then(res => res.data)
    },


}
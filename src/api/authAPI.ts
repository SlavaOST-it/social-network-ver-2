import {instance} from "./apiConfig/instance";
import {LoginRequestType, LoginResponseType, MeResponseType} from "./apiConfig/typesAPI/authAPI-types";


export const authAPI = {
    me(){
        return instance.get<MeResponseType>(`/auth/me`)
    },

    login(data: LoginRequestType){
        return instance.post<LoginResponseType>(`/auth/login`, data)
    },

    logout(){
        return instance.delete(`/auth/login`)
    }
}


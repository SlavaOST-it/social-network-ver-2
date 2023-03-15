import {instance} from "./apiConfig/instance";
import {CaptchaResponseType} from "./apiConfig/typesAPI/authAPI-types";


export const securityAPI = {
    getCaptchaURL(){
        return instance.get<CaptchaResponseType>(`/security/get-captcha-url`)
    }
}
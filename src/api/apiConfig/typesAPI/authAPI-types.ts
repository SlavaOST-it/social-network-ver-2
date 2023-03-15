import {ResultCode} from "../../../common/types/commonTypes";


// ===== Me response type ===== //
export type MeResponseType = {
    data: {
        id: number,
        login: string,
        email: string
    },
    messages: string[],
    fieldsErrors: string[],
    resultCode: ResultCode
}


// ===== Login Types ===== //
export type LoginRequestType = {
    email: string,
    password: string,
    rememberMe?: boolean
    captcha?: string
}

export type LoginResponseType = {
    data: {
        userId: number
    },
    messages: string[],
    fieldsErrors: string[],
    resultCode: ResultCode
}


// ===== Captcha Types ===== //
export type CaptchaResponseType = {
    url: string
}
import {ResultCode} from "../../../common/types/commonTypes";


// ===== Me response type ===== //
export type MeResponseType = {
    data: {
        id: number,
        login: string,
        email: string
    },
    messages: [],
    fieldsErrors: [],
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
    messages: [],
    fieldsErrors: [],
    resultCode: ResultCode
}
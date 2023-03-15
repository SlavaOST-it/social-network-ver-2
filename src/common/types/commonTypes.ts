export enum AppStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed'
}

export enum ResultCode {
    OK = 0,
    FAILED = 1,
    CAPTCHA = 10
}

export type UsersPageType = {
    type: 'users' | 'friends'
}

// ===== get profile response ===== //
export type UserProfileType = {
    userId: number | null,
    aboutMe: string | null
    lookingForAJob: boolean | null,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    contacts: {
        github: string | null,
        vk: string | null,
        facebook: string | null,
        instagram: string | null,
        twitter: string | null,
        website: string | null,
        youtube: string | null,
        mainLink: string | null,
    },
    photos: PhotoProfile
}
export type PhotoProfile = {
    small: string | null,
    large: string | null
}



// ===== Change status ===== //
export type ChangeStatusResponseType = {
    data: {},
    messages: string[],
    fieldsErrors: [],
    resultCode: number
}


export type UpdatePhotoResponseType ={
    data: {
        photos: {
            small: string | null,
            large: string | null
        }
    },
    messages: string[],
    resultCode: number
}

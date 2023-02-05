import {UserProfileType} from "../../../api/apiConfig/typesAPI/profileAPI-types";
import {addPostAC, setAvatarAC, setStatusAC, setUserProfileAC} from "../profile-reducer";

// ===== Initial State ===== //
export type ProfilePageType = {
    profile: UserProfileType | null,
    myAvatar: string | null,
    status: string,
    posts: PostsDataType[]
}

export type PostsDataType = {
    id: number,
    message: string,
    likesCount: number,
    comments: string
}


// ===== Action Type ==== //
type SetUserProfileAT = ReturnType<typeof setUserProfileAC>
type SetStatusAT = ReturnType<typeof setStatusAC>
type SetAvatarAT = ReturnType<typeof setAvatarAC>
type AddPostAT = ReturnType<typeof addPostAC>

export type UserReducerType = SetUserProfileAT | SetStatusAT | SetAvatarAT | AddPostAT
import {UserProfileType} from "../../../api/apiConfig/typesAPI/profileAPI-types";
import {addCommentAC, addPostAC, setAvatarAC, setStatusAC, setUserProfileAC} from "../profile-reducer";

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
    comments: CommentType[]
}

export type CommentType = {
    id: number,
    text: string
}


// ===== Action Type ==== //
type SetUserProfileAT = ReturnType<typeof setUserProfileAC>
type SetStatusAT = ReturnType<typeof setStatusAC>
type SetAvatarAT = ReturnType<typeof setAvatarAC>
type AddPostAT = ReturnType<typeof addPostAC>
type AddCommentAT = ReturnType<typeof addCommentAC>

export type UserReducerType = SetUserProfileAT | SetStatusAT | SetAvatarAT | AddPostAT | AddCommentAT
import {UserProfileType} from "../../../api/apiConfig/typesAPI/profileAPI-types";
import {
    addCommentAC,
    addPostAC,
    setAvatarAC,
    setMyIdAC,
    setOwnerAC,
    setStatusAC,
    setUserProfileAC
} from "../profile-reducer";


// ===== Initial State ===== //
export type ProfilePageType = {
    profile: UserProfileType | null,
    myId: number,
    isOwner: boolean,
    myAvatar: string | null,
    status: string | null,
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


// ===== Action Types ==== //
type AddPostAT = ReturnType<typeof addPostAC>
type SetMyIdAT = ReturnType<typeof setMyIdAC>
type SetOwnerAT = ReturnType<typeof setOwnerAC>
type SetStatusAT = ReturnType<typeof setStatusAC>
type SetAvatarAT = ReturnType<typeof setAvatarAC>
type AddCommentAT = ReturnType<typeof addCommentAC>
type SetUserProfileAT = ReturnType<typeof setUserProfileAC>

export type ProfileReducerActionTypes =
    SetUserProfileAT
    | SetMyIdAT
    | AddPostAT
    | SetOwnerAT
    | SetStatusAT
    | SetAvatarAT
    | AddCommentAT

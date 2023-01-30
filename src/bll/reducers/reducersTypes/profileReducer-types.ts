import {UserProfileType} from "../../../api/apiConfig/typesAPI/profileAPI-types";
import {setStatusAC, setUserProfileAC} from "../profile-reducer";

// ===== Initial State ===== //
export type ProfilePageType = {
    profile: UserProfileType | null,
    status: string,
    posts: PostsDataType[]
}

type PostsDataType = {
    id: number,
    message: string
}


// ===== Action Type ==== //
type SetUserProfileAT = ReturnType<typeof setUserProfileAC>
type SetStatusAT = ReturnType<typeof setStatusAC>

export type UserReducerType = SetUserProfileAT | SetStatusAT
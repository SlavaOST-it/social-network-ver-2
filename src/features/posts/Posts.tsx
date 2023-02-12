import React from 'react';
import {useAppSelector} from "../../utils/hooks/hooks";
import {AddPost} from "./addPost/AddPost";
import {PostItem} from "./postItem/PostItem";

export const Posts = () => {
const myId = useAppSelector(state => state.profile.myId)
const userId = useAppSelector(state => state.profile.profile?.userId)

    return (
        <div>
            <div>
                <AddPost/>
            </div>

            <PostItem/>
        </div>
    );
};

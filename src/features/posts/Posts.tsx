import React from 'react';
import {useAppSelector} from "../../utils/hooks/hooks";
import {AddPost} from "./addPost/AddPost";
import {PostItem} from "./postItem/PostItem";

export const Posts = () => {


    return (
        <div>
            <div>
                <AddPost/>
            </div>

            <PostItem/>
        </div>
    );
};

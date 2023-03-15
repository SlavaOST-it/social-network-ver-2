import React from 'react';
import {AddPost} from "./addPost/AddPost";
import {PostItem} from "./postItem/PostItem";


export const Posts = () => {
    return (
        <div>
            <AddPost/>
            <PostItem/>
        </div>
    );
};

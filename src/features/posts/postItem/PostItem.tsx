import React, {ChangeEvent, useState} from 'react';

import s from "./PostItem.module.scss"

import likeLogo from "../../../assets/img/icons/like.png"
import userFriendLogo from "../../../assets/img/usersBaseAvatar/userAvaPost.jpg"

import {AvatarUser} from "../../profile/avatar/AvatarUser";
import {addCommentAC} from "../../../bll/reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {ButtonSend} from "../../../common/components/buttonSend/ButtonSend";


export const PostItem = () => {
    const dispatch = useAppDispatch()
    const postsData = useAppSelector(state => state.profile.posts)
    const userName = useAppSelector(state => state.profile.profile?.fullName)

    const [valueComment, setValueComment] = useState("")

    const changeTextComment = (e: ChangeEvent<HTMLInputElement>) => {
        setValueComment(e.currentTarget.value)
    }

    const sendCommentHandler = (valueComment: string, postId: number) => {
        if (valueComment.trim().length) {
            dispatch(addCommentAC({commentText: valueComment, postId: postId}))
        }
        setValueComment("")
    }

    return (
        <div>
            {postsData.map(post =>

                <div key={post.id} className={s.postBlock}>
                    <>
                        <div className={s.headerBlock}>
                            <AvatarUser className={s.avatar}/>
                            <span className={s.userName}>{userName}</span>
                        </div>

                        <div className={s.textBlock}>
                            {post.message}
                            <div className={s.like}>
                                <img src={likeLogo} alt={'like'} className={s.likeLogo}/>
                                {post.likesCount}
                            </div>
                        </div>

                        <div className={s.commentBlock}>
                            {post.comments.length > 0 &&

                                <div>{post.comments.map(comment =>
                                    <div key={comment.id}>
                                        {comment.id === 1
                                            ? <div className={s.userInfo}>
                                                <img src={userFriendLogo} alt={"avatar"}
                                                     className={s.avatar}/>
                                                <span className={s.userName}>Thomas Shelby</span>
                                            </div>
                                            : <div className={s.userInfo}>
                                                <AvatarUser className={s.avatar}/>
                                                <span className={s.userName}>{userName}</span>
                                            </div>
                                        }

                                        {comment.text}
                                        <hr/>

                                    </div>)}
                                </div>
                            }

                            <div className={s.addCommentBlock}>
                                <input
                                    data-id={post.id}
                                    key={post.id}
                                    className={s.inputAddComment}
                                    placeholder={"Написать комментарий..."}
                                    onChange={changeTextComment}
                                />

                                <ButtonSend callBack={() => sendCommentHandler(valueComment, post.id)}/>
                            </div>
                        </div>

                        <hr/>
                    </>
                </div>
            )}
        </div>
    );
};

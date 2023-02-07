import React from 'react';
import s from "./PostItem.module.scss"
import {useAppSelector} from "../../../utils/hooks/hooks";
import {AvatarUser} from "../../profile/avatar/AvatarUser";
import likeLogo from "../../../assets/img/icons/like.png"
import userFriendLogo from "../../../assets/img/userAvaPost.jpg"
import sendButton from "../../../assets/img/icons/send-03-svgrepo-com.svg"


export const PostItem = () => {
    const postsData = useAppSelector(state => state.profile.posts)
    const userName = useAppSelector(state => state.profile.profile?.fullName)
    const userAvatar = useAppSelector(state => state.profile.profile?.photos.large)


    return (
        <div>
            {postsData.map(post =>
                <div className={s.postBlock}>
                    <div className={s.headerBlock}>
                        <AvatarUser type={"my"} avatar={userAvatar} className={s.avatar}/>
                        <span className={s.userName}>{userName}</span>
                    </div>

                    <div className={s.textBlock}>
                        {post.message}
                        <div className={s.like}>
                            <img src={likeLogo} alt={'like'} className={s.likeLogo}/>
                            {post.likesCount}
                        </div>

                    </div>

                    <hr/>

                    <div className={s.commentBlock}>
                        {post.comment &&
                            <div>
                                <div>
                                    <img src={userFriendLogo} alt={"userFriend"} className={s.avatar}/>
                                    <span className={s.userName}>Thomas</span>
                                </div>

                                <div>{post.comment}</div>
                            </div>
                        }
                        <hr/>

                        <div className={s.addCommentBlock}>
                            <input className={s.inputAddComment} placeholder={"Написать комментарий..."}/>
                            <button className={s.sendPostBtn}>
                                <img src={sendButton} alt={"send post"} />
                            </button>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
};

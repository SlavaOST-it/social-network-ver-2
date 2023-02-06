import React from 'react';
import s from "./PostItem.module.scss"
import {useAppSelector} from "../../../utils/hooks/hooks";
import {AvatarUser} from "../../profile/avatar/AvatarUser";
import likeLogo from "../../../assets/img/icons/like.png"
import userFriendLogo from "../../../assets/img/userAvaPost.jpg"


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
                        {post.comments &&
                            <div>
                                <div>
                                    <img src={userFriendLogo} alt={"userFriend"} className={s.avatar}/>
                                    <span className={s.userName}>Thomas</span>
                                </div>

                                <div>{post.comments}</div>
                            </div>
                        }

                        <input placeholder={"Написать комментарий..."}/>
                        <button>отправить</button>
                    </div>

                </div>
            )}

        </div>
    );
};

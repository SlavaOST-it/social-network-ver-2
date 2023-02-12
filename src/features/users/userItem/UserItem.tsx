import React, {FC} from 'react';
import s from "./UserItem.module.scss"
import basicAvatar from "../../../assets/img/icons/avatar_user.png"
import {UserType} from "../../../bll/reducers/reducersTypes/usersReducer-types";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../utils/hooks/hooks";
import {getProfileTC} from "../../../bll/reducers/profile-reducer";
import {PATH} from "../../../utils/routes/routes";


type UserItemType = {
    user: UserType
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    followingDisable: number []
}

export const UserItem: FC<UserItemType> = ({user, follow, unfollow, followingDisable}) => {
    const dispatch = useAppDispatch()

    const currentUser = (userId: number) => {
        dispatch(getProfileTC(userId))
    }

    return (
        <div className={s.userItem}>

            <NavLink
                to={PATH.profile}
                onClick={() => currentUser(user.id)}
                className={s.userBlock}
            >
                <img
                    src={user.photos.large ? user.photos.large : basicAvatar}
                    className={s.avatar}
                    alt={'avatar'}
                />
                <div className={s.nameStatusBlock}>
                    <div className={s.name}>{user.name}</div>

                    <div className={s.status}>{user.status}</div>
                </div>
            </NavLink>


            <button
                onClick={() => follow(user.id)}
                className={s.followButton}
            >
                подписаться
            </button>

            {/*<hr/>*/}
        </div>
    );
};

import React, {FC} from 'react';
import s from "./UserItem.module.scss"
import basicAvatar from "../../../assets/img/icons/avatar_user.png"
import {UserType} from "../../../bll/reducers/reducersTypes/usersReducer-types";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {getProfileTC} from "../../../bll/reducers/profile-reducer";
import {PATH} from "../../../utils/routes/routes";
import {commonDisabled} from "../../../utils/disabledOnBoot/disabledOnBoot";


type UserItemType = {
    user: UserType
    changeFollowHandler: (userId: number) => void,
    type: 'users' | 'friends'
    followingDisable: number []
}

export const UserItem: FC<UserItemType> = ({user, changeFollowHandler, type, followingDisable}) => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(state => state.app.status)

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
                onClick={() => {
                    changeFollowHandler(user.id)
                }}
                disabled={commonDisabled(appStatus)}
                className={s.followButton}
            >
                {type === 'users'
                    ? <span>подписаться</span>
                    : <span>отписаться</span>}
            </button>
        </div>
    );
};

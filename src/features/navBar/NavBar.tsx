import React from 'react';
import {NavLink} from "react-router-dom";

import s from "./NavBar.module.scss"
import {PATH} from "../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {getProfileTC} from "../../bll/reducers/profile-reducer";


export const NavBar = () => {
    const dispatch = useAppDispatch()
    const myId = useAppSelector(state => state.profile.myId)
    const loggedIn = useAppSelector(state => state.auth.loggedIn)

    const menuLinks = [
        {id: 2, path: PATH.dialogs, nameLink: "Сообщения"},
        {id: 3, path: PATH.friends, nameLink: "Мои друзья"},
        {id: 4, path: PATH.users, nameLink: "Пользователи"},
        {id: 5, path: PATH.music, nameLink: "Музыка"},
        {id: 6, path: PATH.news, nameLink: "Новости"},
        {id: 7, path: PATH.settings, nameLink: "Настройки"},
    ]

    const setMyProfileHandler = (myId: number) => {
        dispatch(getProfileTC(myId))
    }

    return (
        <nav className={s.navbar}>
            {loggedIn &&
                <ul>
                    <li key={1}>
                        <NavLink
                            id={PATH.profile}
                            to={PATH.profile}
                            onClick={() => setMyProfileHandler(myId)}
                            className={({isActive}) => isActive ? s.activeLink : s.link}
                        >Моя страница</NavLink>
                    </li>

                    {menuLinks.map(el =>
                        <li key={el.id}>
                            <NavLink
                                id={el.path}
                                to={el.path}
                                className={({isActive}) => isActive ? s.activeLink : s.link}
                            >{el.nameLink}</NavLink>
                        </li>
                    )}
                </ul>
            }
        </nav>
    );
};

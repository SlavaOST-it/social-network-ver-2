import React from 'react';
import {NavLink} from "react-router-dom";

import s from "./NavBar.module.scss"

import {getProfileTC} from "../../bll/reducers/profile-reducer";
import {PATH} from "../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";


export const NavBar = () => {
    const dispatch = useAppDispatch()
    const myId = useAppSelector(state => state.profile.myId)

    const changeMyProfilePage = (myId: number) => {
        dispatch(getProfileTC(myId))
    }

    const menuLinks = [
        {id: 2, path: PATH.dialogs, nameLink: "Сообщения"},
        {id: 3, path: PATH.friends, nameLink: "Мои друзья"},
        {id: 4, path: PATH.users, nameLink: "Пользователи"},
        {id: 5, path: PATH.music, nameLink: "Музыка"},
        {id: 6, path: PATH.news, nameLink: "Новости"},
        {id: 7, path: PATH.settings, nameLink: "Настройки"},
    ]

    return (
        <nav className={s.navbar}>
            <ul>
                <li>
                    <NavLink
                        to={PATH.profile}
                        onClick={()=>changeMyProfilePage(myId)}
                        className={({isActive}) => isActive ? s.activeLink : s.link}
                    >
                        Моя страница
                    </NavLink>
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
        </nav>
    );
};

import React from 'react';
import {NavLink} from "react-router-dom";

import s from "./NavBar.module.scss"
import {PATH} from "../../utils/routes/routes";
import {useAppSelector} from "../../utils/hooks/hooks";


export const NavBar = () => {
    const loggedIn = useAppSelector(state => state.auth.loggedIn)

    const menuLinks = [
        {id: 1, path: PATH.profile, nameLink: "Моя страница"},
        {id: 2, path: PATH.dialogs, nameLink: "Сообщения"},
        {id: 3, path: PATH.friends, nameLink: "Мои друзья"},
        {id: 4, path: PATH.users, nameLink: "Пользователи"},
        {id: 5, path: PATH.music, nameLink: "Музыка"},
        {id: 6, path: PATH.news, nameLink: "Новости"},
        {id: 7, path: PATH.settings, nameLink: "Настройки"},
    ]

    return (
        <nav className={s.navbar}>
            {loggedIn &&
                <ul>
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

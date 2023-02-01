import React from 'react';
import s from "./NavBar.module.scss"
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";

export const NavBar = () => {

    const menuLinks = [
        {id: 1, path: PATH.profile, nameLink: "Моя страница"},
        {id: 2, path: PATH.messages, nameLink: "Сообщения"},
        {id: 3, path: PATH.friends, nameLink: "Мои друзья"},
        {id: 4, path: PATH.users, nameLink: "Пользователи"},
        {id: 5, path: PATH.music, nameLink: "Музыка"},
        {id: 6, path: PATH.news, nameLink: "Новости"},
        {id: 7, path: PATH.settings, nameLink: "Настройки"},
    ]
    return (
        <nav className={s.navbar}>
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
        </nav>
    );
};

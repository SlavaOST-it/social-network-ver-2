import React from 'react';
import {NavLink} from "react-router-dom";

import s from "./NavBar.module.scss"

import profileLogo from "../../assets/img/icons/navBar/profile-circle.svg"
import friendsLogo from "../../assets/img/icons/navBar/friend.svg"
import usersLogo from "../../assets/img/icons/navBar/users.svg"
import messagesLogo from "../../assets/img/icons/navBar/messages.svg"
import musicLogo from "../../assets/img/icons/navBar/headphones.svg"
import newsLogo from "../../assets/img/icons/navBar/news.svg"
import settingsLogo from "../../assets/img/icons/navBar/settings-gear.svg"

import {PATH} from "../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";

import {getProfileTC} from "../../bll/reducers/profile-reducer";


export const NavBar = () => {
    const dispatch = useAppDispatch()
    const myId = useAppSelector(state => state.profile.myId)
    const loggedIn = useAppSelector(state => state.auth.loggedIn)

    const menuLinks = [
        {id: 2, path: PATH.dialogs, nameLink: "Сообщения", linkLogo: messagesLogo},
        {id: 3, path: PATH.friends, nameLink: "Мои друзья", linkLogo: friendsLogo},
        {id: 4, path: PATH.users, nameLink: "Пользователи", linkLogo: usersLogo},
        {id: 5, path: PATH.music, nameLink: "Музыка", linkLogo: musicLogo},
        {id: 6, path: PATH.news, nameLink: "Новости", linkLogo: newsLogo},
        {id: 7, path: PATH.settings, nameLink: "Настройки", linkLogo: settingsLogo},
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
                        >
                            <img src={profileLogo} alt={'nav logo'} className={s.navLogo}/>
                            <span>Моя страница</span>
                        </NavLink>
                    </li>

                    {menuLinks.map(el =>
                        <li key={el.id}>
                            <NavLink
                                id={el.path}
                                to={el.path}
                                className={({isActive}) => isActive ? s.activeLink : s.link}
                            >
                                <img src={el.linkLogo} alt={'nav logo'} className={s.navLogo}/>
                                <span>{el.nameLink}</span>
                            </NavLink>
                        </li>
                    )}
                </ul>
            }
        </nav>
    );
};

import React from 'react';
import s from './Header.module.scss'

import DevLogo from "../../assets/img/icons/devLogo.jpg"

import {HeaderItem} from "./headerItem/HeaderItem";
import {useAppSelector} from "../../utils/hooks/hooks";


export const Header = () => {
    const loggedIn = useAppSelector(state => state.auth.loggedIn)

    return (
        <div className={s.header}>
            <div >
                <img src={DevLogo} alt={'dev circle'} className={s.logo}/>
            </div>

            {loggedIn && <HeaderItem/>}
        </div>
    );
};
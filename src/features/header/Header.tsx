import React from 'react';
import s from './Header.module.scss'
import {HeaderItem} from "./headerItem/HeaderItem";
import {useAppSelector} from "../../utils/hooks/hooks";


export const Header = () => {
    const loggedIn = useAppSelector(state => state.auth.loggedIn)

    return (
        <div className={s.header}>
            <div className={s.logo}>
                <span>Ⓢ</span>ⓞⓒⓘⓐⓛ <span>Ⓝ</span>ⓔⓣⓦⓞⓡⓚ
            </div>

            {loggedIn && <HeaderItem/>}
        </div>
    );
};
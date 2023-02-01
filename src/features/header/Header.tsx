import React from 'react';
import s from './Header.module.scss'
import {HeaderItem} from "./headerItem/HeaderItem";


export const Header = () => {

    return (
        <div className={s.header}>
            <div className={s.logo}>
                <span>Ⓢ</span>ⓞⓒⓘⓐⓛ <span>Ⓝ</span>ⓔⓣⓦⓞⓡⓚ
            </div>

            <HeaderItem/>

        </div>
    );
};
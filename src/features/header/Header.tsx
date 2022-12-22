import React from 'react';
import s from './Header.module.css'
import {HeaderItem} from "./headerItem/HeaderItem";


export const Header = () => {

    return (
        <div className={s.header}>
            <div>
                LOGO
            </div>

            <div>
                <HeaderItem/>
            </div>
        </div>
    );
};
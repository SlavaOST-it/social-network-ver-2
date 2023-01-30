import React from 'react';
import s from "./Preloader.module.scss"



export const Preloader = () => {
    return (
        <div className={s.gooey}>
            <span className={s.dot}></span>
            <div className={s.dots}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

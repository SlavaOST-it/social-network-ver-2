import React from 'react';
import { useNavigate } from 'react-router-dom';

import s from "./Page404.module.scss"
import page404Logo from "../../../assets/img/404.png"

export const Page404 = () => {

    const navigate = useNavigate()

    return (
        <div className={s.page404}>
            <img src={page404Logo} alt={'404'}/>

            <p>Страница не найдена</p>

            <button
                onClick={()=>{navigate(-1)}}
                className={s.buttonRevers}>назад</button>
        </div>
    );
};


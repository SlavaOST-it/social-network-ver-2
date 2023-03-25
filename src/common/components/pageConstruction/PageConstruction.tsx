import React from 'react';
import {Navigate} from "react-router-dom";

import s from "./PageConstruction.module.scss"

import reconstructionLogo from "../../../assets/img/reconstruktion.png"

import {PATH} from "../../../utils/routes/routes";
import {useAppSelector} from "../../../utils/hooks/hooks";


export const PageConstruction = () => {
    const loggedIn = useAppSelector(state => state.auth.loggedIn)

    if (!loggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.pageConstruction}>
            <img src={reconstructionLogo} alt={"reconstruction page"}/>
        </div>
    );
};

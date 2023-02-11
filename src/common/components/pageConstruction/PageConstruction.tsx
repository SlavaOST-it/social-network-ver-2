import React from 'react';

import s from "./PageConstruction.module.scss"
import reconstructionLogo from "../../../assets/img/reconstruktion.png"


export const PageConstruction = () => {
    return (
        <div className={s.pageConstruction}>
            <img src={reconstructionLogo} alt={"reconstruction page"}/>
        </div>
    );
};

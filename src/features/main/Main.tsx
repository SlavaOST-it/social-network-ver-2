import React from 'react';
import s from "./Main.module.scss"
import {Navigate, Route, Routes} from 'react-router-dom';
import {PATH} from "../../utils/routes/routes";
import {Login} from "../login/Login";
import {ProfilePage} from "../profile/ProfilePage";



export const Main = () => {
    return (
        <div className={s.main}>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.login}/>}/>
                <Route path={PATH.login} element={<Login/>}/>
                <Route path={PATH.profile} element={<ProfilePage/>}/>
            </Routes>
        </div>
    );
};

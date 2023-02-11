import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import s from "./Main.module.scss"

import {PATH} from "../../utils/routes/routes";

import {Login} from "../login/Login";
import {ProfilePage} from "../profile/ProfilePage";
import {DialogsPage} from "../messages/DialogsPage";
import {Page404} from "../../common/components/page404/Page404";
import {UsersPage} from "../users/UsersPage";
import {PageConstruction} from "../../common/components/pageConstruction/PageConstruction";


export const Main = () => {
    return (
        <div className={s.main}>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.login}/>}/>
                <Route path={PATH.login} element={<Login/>}/>
                <Route path={PATH.profile} element={<ProfilePage/>}/>
                <Route path={PATH.messages} element={<DialogsPage/>}/>
                <Route path={PATH.friends} element={""}/>
                <Route path={PATH.users} element={<UsersPage/>}/>
                <Route path={PATH.music} element={<PageConstruction/>}/>
                <Route path={PATH.news} element={<PageConstruction/>}/>
                <Route path={PATH.settings} element={<PageConstruction/>}/>
                <Route path={"/*"} element={<Page404/>}/>
            </Routes>
        </div>
    );
};

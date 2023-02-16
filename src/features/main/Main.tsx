import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import s from "./Main.module.scss"

import {PATH} from "../../utils/routes/routes";

import {Login} from "../login/Login";
import {ProfilePage} from "../profile/ProfilePage";
import {DialogsPage} from "../dialogs/DialogsPage";
import {UsersPage} from '../users/UsersPage';
import {Page404} from "../../common/components/page404/Page404";
import {PageConstruction} from "../../common/components/pageConstruction/PageConstruction";


export const Main = () => {
    return (
        <div className={s.main}>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.login}/>}/>
                <Route path={PATH.login} element={<Login/>}/>
                <Route path={PATH.profile} element={<ProfilePage/>}/>
                <Route path={PATH.dialogs} element={<DialogsPage/>}/>
                <Route path={PATH.friends} element={<UsersPage type={'friends'}/>}/>
                <Route path={PATH.users} element={<UsersPage type={'users'}/>}/>
                <Route path={PATH.music} element={<PageConstruction/>}/>
                <Route path={PATH.news} element={<PageConstruction/>}/>
                <Route path={PATH.settings} element={<PageConstruction/>}/>
                <Route path={PATH.page404} element={<Page404/>}/>
                <Route path={"*"} element={<Navigate to={PATH.page404}/>}/>
            </Routes>
        </div>
    );
};

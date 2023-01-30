import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {PATH} from "../../utils/routes/routes";
import {Login} from "../login/Login";



export const Main = () => {
    return (
        <div className={""}>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.login}/>}/>
                <Route path={PATH.login} element={<Login/>}/>
            </Routes>
        </div>
    );
};

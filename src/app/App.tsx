import React, {useEffect} from 'react';
import s from "./App.module.scss"

import {initializeAppTC} from '../bll/reducers/app-reducer';

import {Header} from "../features/header/Header";
import {Main} from "../features/main/Main";
import {NavBar} from "../features/navBar/NavBar";

import {ErrorSnackbar} from "../common/components/errorSnackBar/ErrorSnackbar";
import {Preloader} from '../common/components/preloader/Preloader';

import {useAppDispatch, useAppSelector} from "../utils/hooks/hooks";
import {Login} from "../features/login/Login";
import Preloader2 from "../common/components/preloader/Preloader2";


function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const loggedIn = useAppSelector(state => state.auth.loggedIn)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <Preloader/>
    }

    const classNameApp = loggedIn ? s.app : ""

    return (
        <div className={classNameApp}>
            <Header/>

            {/*<div className={s.container}>*/}
            <NavBar/>
            <Main/>
            {/*</div>*/}

            <ErrorSnackbar/>
        </div>
    );
}

export default App;

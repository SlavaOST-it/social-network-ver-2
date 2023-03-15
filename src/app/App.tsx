import React, {useEffect} from 'react';

import s from "./App.module.scss"

import {initializeAppTC} from '../bll/reducers/app-reducer';

import {Main} from "../features/main/Main";
import {Header} from "../features/header/Header";
import {NavBar} from "../features/navBar/NavBar";

import {Preloader} from '../common/components/preloader/Preloader';
import {ErrorSnackbar} from "../common/components/errorSnackBar/ErrorSnackbar";

import {useAppDispatch, useAppSelector} from "../utils/hooks/hooks";


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
    const baseClassName = loggedIn ? s.app : ""

    return (
        <div className={baseClassName}>

            {loggedIn &&
                <>
                    <Header/>
                    <NavBar/>
                </>}
            <Main/>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

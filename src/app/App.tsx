import React, {useEffect} from 'react';
import s from "./App.module.scss"

import {initializeAppTC} from '../bll/reducers/app-reducer';

import {Header} from "../features/header/Header";
import {Main} from "../features/main/Main";
import {NavBar} from "../features/navBar/NavBar";

import {ErrorSnackbar} from "../common/components/errorSnackBar/ErrorSnackbar";
import {Preloader} from '../common/components/preloader/Preloader';

import {useAppDispatch, useAppSelector} from "../utils/hooks/hooks";


function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <div className={s.app}>
            <Header/>
            {/*<NavBar/>*/}


            <div className={s.container}>
                <NavBar/>
                <Main/>
            </div>

            {/*<Footer/>*/}
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../features/header/Header";
import {Main} from "../features/main/Main";
import {Footer} from "../features/footer/Footer";
import {ErrorSnackbar} from "../common/components/errorSnackBar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "../utils/hooks/hooks";
import { initializeAppTC } from '../bll/reducers/app-reducer';
import { Preloader } from '../common/components/preloader/Preloader';


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
        <div className="App">
            <Header/>
            <Main/>
            <Footer/>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

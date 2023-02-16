import React from 'react';
import s from "./Preloader2.module.scss"

const Preloader2 = () => {
    return (
        <div className={s.loading}>
            <div className={s.loadingText}>
                <span className={s.loadingTextWords}>L</span>
                <span className={s.loadingTextWords}>O</span>
                <span className={s.loadingTextWords}>A</span>
                <span className={s.loadingTextWords}>D</span>
                <span className={s.loadingTextWords}>I</span>
                <span className={s.loadingTextWords}>N</span>
                <span className={s.loadingTextWords}>G</span>
            </div>
        </div>
    );
};

export default Preloader2;
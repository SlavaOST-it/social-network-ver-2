import React from 'react';
import s from "./LinearProgress.module.scss"

export const LinearProgress = () => {
    return (
        <div className={s.progressBar}>
              <span className={s.bar}>
                <span className={s.progress}></span>
              </span>
        </div>
    );
};

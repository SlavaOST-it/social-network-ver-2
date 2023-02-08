import React, {ChangeEvent, FC, useEffect, useState} from 'react';

import s from "./UserStatus.module.scss"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {changeStatusTC} from "../../../bll/reducers/profile-reducer";
import pencilLogo from "../../../assets/img/icons/pencil.svg"



export const UserStatus = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.profile.status)

    const [localStatus, setLocalStatus] = useState(status)
    const [editMode, setEditMode] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLocalStatus(status)
    }, [status])

    const activeModeHandler = () => {
        if (localStatus.trim() !== null) {
            if (localStatus.length > 30) {
                setLocalStatus(status)
            } else {
                setError(null)
                dispatch(changeStatusTC(localStatus.trim()))
            }
        }
        setEditMode(!editMode)
    }

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setLocalStatus(value)
        if (value.length > 30) {
            setError('Максимальная длина статуса 30 символов')
        } else {
            setError(null)
        }
    }

    return (
        <div className={s.userStatus}>
            {editMode
                ? <div className={s.inputBlock}>
                    <input
                        value={localStatus}
                        onChange={changeStatus}
                        onBlur={activeModeHandler}
                        autoFocus={true}
                        className={s.inputStatus}
                    />
                    {error && (<div className={s.error}>{error}</div>)}
                </div>
                : <div className={s.span}>
                    <span onDoubleClick={activeModeHandler}>
                        {localStatus.length
                            ? localStatus
                            : <span className={s.baseStatus}>Напиши свой статус</span>}
                        <img src={pencilLogo} alt={'edit status'}/>
                    </span>
                </div>
            }


        </div>
    );
};

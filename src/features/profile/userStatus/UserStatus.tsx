import React, {ChangeEvent, useEffect, useState} from 'react';

import s from "./UserStatus.module.scss"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {changeStatusTC} from "../../../bll/reducers/profile-reducer";
import pencilLogo from "../../../assets/img/icons/pencil.svg"



export const UserStatus = () => {
    const dispatch = useAppDispatch()
    const statusUser = useAppSelector(state => state.profile.status)
    const myId = useAppSelector(state => state.profile.myId)
    const userId = useAppSelector(state => state.profile.profile?.userId)

    const status = statusUser ? statusUser : ""
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
                    <span>
                        {localStatus.length > 0 && localStatus}
                        {(localStatus.length === 0 &&  myId === userId)  && <span className={s.baseStatus}>Добавить статус...</span>}
                        {myId === userId && <img src={pencilLogo} onDoubleClick={activeModeHandler} alt={'edit status'}/>}
                    </span>
                </div>
            }
        </div>
    );
};

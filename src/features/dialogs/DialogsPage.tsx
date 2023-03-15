import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";

import s from "./DialogsPage.module.scss"
import chatLogo from "../../assets/img/icons/chat-svgrepo-com.svg"

import {AddDialog} from "./addDialog/AddDialog";
import {AddNewMessage} from "./addNewMessage/AddNewMessage";

import {PATH} from "../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";

import {changeSelectedStatusAC, setCurrentDialogIdAC} from "../../bll/reducers/dialogs-reducer";


export const DialogsPage = () => {
    const dispatch = useAppDispatch()
    const dialogsData = useAppSelector(state => state.dialogs.dialogs)
    const selectValue = useAppSelector(state => state.dialogs.selectUser)
    const currentDialogId = useAppSelector(state => state.dialogs.currentDialogId)

    const loggedIn = useAppSelector(state => state.auth.loggedIn)

    const [valueDialogId, setValueDialogId] = useState(0)

    const messagesUser = dialogsData.filter(d => d.dialogId === valueDialogId).map(m => m.messages)

    const addNewDialogHandler = () => {
        dispatch(changeSelectedStatusAC({value: true}))
    }

    useEffect(() => {
        dispatch(changeSelectedStatusAC({value: false}))
        dispatch(setCurrentDialogIdAC({dialogId: 0}))
    }, [])

    useEffect(() => {
        setValueDialogId(currentDialogId)
    }, [currentDialogId])

    if (!loggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.dialogsPage}>

            {selectValue
                ? <div>
                    <AddDialog type={"friends"} setValueDialogId={setValueDialogId}/>
                </div>
                :
                <>
                    <div className={s.dialogsNav}>
                        {valueDialogId !== 0 &&
                            <button
                                onClick={addNewDialogHandler}
                                className={s.addNewChatButton}
                            >
                                Создать чат
                            </button>
                        }

                        {dialogsData.map(dialog =>
                            <div
                                key={dialog.dialogId}
                                className={dialog.dialogId === valueDialogId ? (`${s.activeDialog} ${s.dialogsNavItem}`) : s.dialogsNavItem}
                                onClick={() => setValueDialogId(dialog.dialogId)}
                            >
                                <img src={dialog.avatar} alt={'user avatar'}/>
                                <p className={s.name}>{dialog.userName}</p>
                            </div>)}
                    </div>

                    <div className={s.dialogs}>
                        {(valueDialogId === 0) &&
                            <div className={s.addNewChat}>
                                <>
                                    <img src={chatLogo} alt={'chat'}/>
                                    <p>Выберите чат или <span onClick={addNewDialogHandler}><b>создайте новый</b></span>
                                    </p>
                                </>

                            </div>
                        }

                        <div className={s.messages}>
                            {messagesUser &&
                                (messagesUser.map(m =>
                                    <>{m.map(item =>
                                        <p key={item.messageId}
                                           className={item.messageId > 3 ? (`${s.newMessage} ${s.message}`) : s.message}>
                                            {item.text}
                                        </p>
                                    )}

                                        <div className={s.addNewMessage}>
                                            <AddNewMessage dialogId={valueDialogId}/>
                                        </div>
                                    </>
                                ))}
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

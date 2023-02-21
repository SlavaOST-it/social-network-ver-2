import React, {useState} from 'react';
import s from "./DialogsPage.module.scss"
import {useAppSelector} from "../../utils/hooks/hooks";
import {AddNewMessage} from "./addNewMessage/AddNewMessage";
import chatLogo from "../../assets/img/icons/chat-svgrepo-com.svg"


export const DialogsPage = () => {
    const dialogsData = useAppSelector(state => state.dialogs.dialogs)

    const [valueDialog, setValueDialog] = useState(0)

    const messagesUser = dialogsData.filter(d => d.dialogId === valueDialog).map(m => m.messages)

    return (
        <div className={s.dialogsPage}>

            <div className={s.dialogsNav}>
                {dialogsData.map(dialog =>
                    <div
                        className={dialog.dialogId === valueDialog ? (`${s.activeDialog} ${s.dialogsNavItem}`) : s.dialogsNavItem}
                        onClick={() => setValueDialog(dialog.dialogId)}
                    >
                        <img src={dialog.avatar} alt={'user avatar'}/>
                        <p className={s.name}>{dialog.userName}</p>
                    </div>)}
            </div>

            <div className={s.dialogs}>
                {valueDialog === 0 &&
                    <div className={s.addNewChat}>
                        <>
                            <img src={chatLogo} alt={'chat'}/>
                            <p>Выберите чат или создайте новый</p>
                        </>

                    </div>
                }

                <div className={s.messages}>
                    {messagesUser &&
                        (messagesUser.map(m =>
                            <>{m.map(item =>
                                <p className={item.messageId > 3 ? (`${s.newMessage} ${s.message}`) : s.message}>
                                    {item.text}
                                </p>
                            )}

                                <div className={s.addNewMessage}>
                                    <AddNewMessage dialogId={valueDialog}/>
                                </div>
                            </>
                        ))}

                    {/*<div className={s.addNewMessage}>*/}
                    {/*    <AddNewMessage dialogId={valueDialog}/>*/}
                    {/*</div>*/}

                </div>

            </div>

            <div>

            </div>

        </div>
    );
};

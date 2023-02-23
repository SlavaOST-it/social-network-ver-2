import React, {useState} from 'react';
import s from "./DialogsPage.module.scss"
import {useAppSelector} from "../../utils/hooks/hooks";
import {AddNewMessage} from "./addNewMessage/AddNewMessage";
import chatLogo from "../../assets/img/icons/chat-svgrepo-com.svg"
import {AddDialog} from "./addDialog/AddDialog";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";


export const DialogsPage = () => {
    const dialogsData = useAppSelector(state => state.dialogs.dialogs)
    const selectValue = useAppSelector(state => state.dialogs.selectUser)
    const loggedIn = useAppSelector(state => state.auth.loggedIn)


    const [valueDialogId, setValueDialogId] = useState(0)

    const messagesUser = dialogsData.filter(d => d.dialogId === valueDialogId).map(m => m.messages)


    if (!loggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.dialogsPage}>

            {selectValue
                ? <div>
                    <AddDialog type={"friends"}/>
                </div>
                :
                <>
                    <div className={s.dialogsNav}>
                        {dialogsData.map(dialog =>
                            <div
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
                                            <AddNewMessage dialogId={valueDialogId}/>
                                        </div>
                                    </>
                                ))}
                        </div>

                    </div>

                    <div>

                    </div>


                </>
            }
            {/*<div className={s.dialogsNav}>*/}
            {/*    {dialogsData.map(dialog =>*/}
            {/*        <div*/}
            {/*            className={dialog.dialogId === valueDialogId ? (`${s.activeDialog} ${s.dialogsNavItem}`) : s.dialogsNavItem}*/}
            {/*            onClick={() => setValueDialogId(dialog.dialogId)}*/}
            {/*        >*/}
            {/*            <img src={dialog.avatar} alt={'user avatar'}/>*/}
            {/*            <p className={s.name}>{dialog.userName}</p>*/}
            {/*        </div>)}*/}
            {/*</div>*/}

            {/*<div className={s.dialogs}>*/}
            {/*    {(valueDialogId === 0 && !selectValue) &&*/}
            {/*        <div className={s.addNewChat}>*/}
            {/*            <>*/}
            {/*                <img src={chatLogo} alt={'chat'}/>*/}
            {/*                <p>Выберите чат или создайте новый</p>*/}
            {/*            </>*/}

            {/*        </div>*/}
            {/*    }*/}

            {/*    <div className={s.messages}>*/}
            {/*        {selectValue*/}
            {/*            ? <div>*/}
            {/*                <AddDialog type={"friends"}/>*/}
            {/*            </div>*/}
            {/*            : <>*/}

            {/*                {messagesUser &&*/}
            {/*                    (messagesUser.map(m =>*/}
            {/*                        <>{m.map(item =>*/}
            {/*                            <p className={item.messageId > 3 ? (`${s.newMessage} ${s.message}`) : s.message}>*/}
            {/*                                {item.text}*/}
            {/*                            </p>*/}
            {/*                        )}*/}

            {/*                            <div className={s.addNewMessage}>*/}
            {/*                                <AddNewMessage dialogId={valueDialogId}/>*/}
            {/*                            </div>*/}
            {/*                        </>*/}
            {/*                    ))}*/}
            {/*            </>*/}


            {/*        }*/}


            {/*{messagesUser &&*/}
            {/*    (messagesUser.map(m =>*/}
            {/*        <>{m.map(item =>*/}
            {/*            <p className={item.messageId > 3 ? (`${s.newMessage} ${s.message}`) : s.message}>*/}
            {/*                {item.text}*/}
            {/*            </p>*/}
            {/*        )}*/}

            {/*            <div className={s.addNewMessage}>*/}
            {/*                <AddNewMessage dialogId={valueDialogId}/>*/}
            {/*            </div>*/}
            {/*        </>*/}
            {/*    ))}*/}


        </div>
    );
};

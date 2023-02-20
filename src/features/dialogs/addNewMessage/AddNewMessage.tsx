import React, {ChangeEvent, FC, useState} from 'react';

import s from "./AddNewMessage.module.scss"
import {useAppDispatch} from "../../../utils/hooks/hooks";
import {ButtonSend} from "../../../common/components/buttonSend/ButtonSend";
import {addNewMessageAC} from "../../../bll/reducers/dialogs-reducer";


type AddNewMessageType = {
    dialogId: number
}
export const AddNewMessage: FC<AddNewMessageType> = ({dialogId}) => {
    const dispatch = useAppDispatch()

    const [valueMessage, setValueMessage] = useState("")

    const changeTextPost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValueMessage(e.currentTarget.value)
    }

    const sendMessageHandler = (dialogId: number) => {
        if (valueMessage.length) {
            dispatch(addNewMessageAC({dialogId: dialogId, textMessage: valueMessage}))
        }
        setValueMessage("")
    }

    return (
        <div className={s.addNewMessage}>
            <textarea
                value={valueMessage}
                onChange={changeTextPost}
                placeholder={"Напишите сообщение..."}
                className={s.textArea}
            />

            <ButtonSend id={dialogId} callBack={() => sendMessageHandler(dialogId)}/>
        </div>
    );
};

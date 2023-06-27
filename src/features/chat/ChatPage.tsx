import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";

import {ButtonSend} from "../../common/components/buttonSend/ButtonSend";

import {getMessagesTC, sendMessageTC} from "../../bll/reducers/chat-reducer";


export const ChatPage = () => {
    const dispatch = useAppDispatch()
    const messagesState = useAppSelector(state => state.chat!.messages)

    const [textMessage, setTextMessage] = useState("")

    const changeTextPost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextMessage(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.charCode === 13){
            sendMessage()
        }
    }

    const sendMessage = () => {
        dispatch(sendMessageTC(textMessage));
        setTextMessage("")
    }

    useEffect(() => {
        dispatch(getMessagesTC())
    }, [])

    return (
        <div>
            <div>
                {messagesState.map((el, index) =>
                    <div key={index}>
                        <b>{el.userName}</b>
                        <div>
                            <img src={el.photo} alt={"avatar"}/>
                        </div>
                        <span>{el.message}</span>
                    </div>)}
            </div>

            <textarea value={textMessage} onKeyPress={onKeyPressHandler} onChange={changeTextPost}></textarea>

            <ButtonSend callBack={sendMessage}/>
        </div>
    );
};

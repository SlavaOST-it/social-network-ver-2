import React, {KeyboardEvent, ChangeEvent, useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {ButtonSend} from "../../common/components/buttonSend/ButtonSend";

import {ChatMessageType} from "../../bll/reducers/reducersTypes/chatReducer-types";


export const ChatPage = () => {
    const dispatch = useAppDispatch()
    const messagesState = useAppSelector(state => state.chat!.messages)

    const [textMessage, setTextMessage] = useState("")
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    const [socket, setSocket] = useState<WebSocket | null>(null)



    const changeTextPost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextMessage(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.charCode === 13){
            sendMessage()
        }
    }

    const sendMessage = () => {
        socket!.send(textMessage)
        setTextMessage("")
    }

    useEffect(() => {
        const socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        setSocket(socket)

        socket.onmessage = (event: MessageEvent) => {
            let messagesFromServer = JSON.parse(event.data)
            setMessages((actualMessages)=>[...actualMessages, ...messagesFromServer])
        }
    }, [])

    return (
        <div>
            <div>
                {messages.map((el, index) =>
                    <div key={index}>
                        <b>{el.userName}</b>
                        <div>
                            <img src={el.photo}/>
                        </div>
                        <span>{el.message}</span>
                    </div>)}
            </div>

            <textarea value={textMessage} onKeyPress={onKeyPressHandler} onChange={changeTextPost}></textarea>
            <ButtonSend callBack={sendMessage}/>
        </div>
    );
};

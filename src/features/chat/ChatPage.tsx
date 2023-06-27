import React, {useEffect, useState} from 'react';
import {ChatMessageType, useChatSocket} from "../../api/chatAPI";


export const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const chatSocket = useChatSocket();

    const changeTextPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextMessage(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.charCode === 13) {
            sendMessage();
        }
    };

    const sendMessage = () => {
        chatSocket.sendMessage(textMessage);
        setTextMessage("");
    };

    useEffect(() => {
        chatSocket.connect();

        return () => {
            chatSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        chatSocket.onMessage((newMessages: ChatMessageType[]) => {
            setMessages((oldMessages) => [...oldMessages, ...newMessages]);
        });
    }, [chatSocket]);

    return (
        <div>
            <div>
                {messages.map((el, index) => (
                    <div key={index}>
                        <b>{el.userName}</b>
                        <div>
                            <img src={el.photo} alt="User avatar"/>
                        </div>
                        <span>{el.message}</span>
                    </div>
                ))}
            </div>

            <textarea value={textMessage} onKeyPress={onKeyPressHandler} onChange={changeTextPost}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};


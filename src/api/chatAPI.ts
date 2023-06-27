// export const chatAPI = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')



import { useRef } from 'react';

export type ChatMessageType = {
    userId: number,
    userName: string,
    photo: string,
    message: string
};

export type ChatSocketType = {
    connect: () => void;
    disconnect: () => void;
    sendMessage: (message: string) => void;
    onMessage: (callback: (messages: ChatMessageType[]) => void) => void;
};

export const useChatSocket = (): ChatSocketType => {
    const socketRef = useRef<WebSocket | null>(null);

    const connect = () => {
        socketRef.current = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    };

    const disconnect = () => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
    };

    const sendMessage = (message: string) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);
        }
    };

    const onMessage = (callback: (messages: ChatMessageType[]) => void) => {
        if (socketRef.current) {
            socketRef.current.onmessage = (event: MessageEvent) => {
                let messagesFromServer = JSON.parse(event.data);
                callback(messagesFromServer);
            };
        }
    };

    return { connect, disconnect, sendMessage, onMessage };
};
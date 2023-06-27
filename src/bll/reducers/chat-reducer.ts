import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {chatAPI} from "../../api/chatAPI";

import {AppThunkType} from "../store/store";
import {setAppStatusAC} from "./app-reducer";

import {AppStatus} from "../../common/types/commonTypes";
import {ChatMessageType} from "./reducersTypes/chatReducer-types";

import {baseErrorHandler} from "../../utils/error-utils/error-utils";


type ChatStateType = {
    messages: ChatMessageType[];
    socket: WebSocket | null;
}

const initialState: ChatStateType = {
    messages: [],
    socket: null
};

const slice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSocketAC: (state, action: PayloadAction<{ socket: WebSocket }>) => {
            state.socket = action.payload.socket
        },

        setMessagesAC: (state, action: PayloadAction<ChatMessageType[]>) => {
            state.messages = [...state.messages, ...action.payload];
        },

    },
});

export const chatReducer = slice.reducer
export const {setMessagesAC, setSocketAC} = slice.actions;


// ===== ThunkCreators ===== //
export const getMessagesTC = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    try {
        const socketAPI: WebSocket = await chatAPI.connect()
        await dispatch(setSocketAC({socket: socketAPI}))

        socketAPI.onmessage = (event: MessageEvent) => {
            let messagesFromServer = JSON.parse(event.data)
            dispatch(setMessagesAC(messagesFromServer));
        }

        dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
    } finally {
        dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
    }
};

export const sendMessageTC = (textMessage: string): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC({status: AppStatus.LOADING}))
    try {
        const socketState: WebSocket | null = getState().chat.socket
        if (socketState) {
            socketState.send(textMessage);
        }
        dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
        dispatch(setAppStatusAC({status: AppStatus.FAILED}))
    } finally {
        dispatch(setAppStatusAC({status: AppStatus.SUCCEEDED}))
    }
}

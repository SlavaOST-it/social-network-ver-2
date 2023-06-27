import {setMessagesAC, setSocketAC} from "../chat-reducer";


export type ChatMessageType = {
    userId: number,
    userName: string,
    photo: string,
    message: string
}


// ===== Action Types ==== //
type  SetMessagesAT = ReturnType<typeof setMessagesAC>
type  SetSocketAT = ReturnType<typeof setSocketAC>

export type ChatReducerActionTypes = SetMessagesAT | SetSocketAT
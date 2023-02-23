import {addNewDialogAC, addNewMessageAC} from "../dialogs-reducer";


// ===== Initial State ===== //
export type DialogsPageType = {
    selectUser: boolean,
    dialogs: DialogType[]
}

export type DialogType = {
    dialogId: number,
    userName: string,
    avatar: string,
    messages: MessageType[]
}

export type MessageType = {
    messageId: number,
    text: string
}


// ===== Action Type ==== //
type AddNewMessageAT = ReturnType<typeof addNewMessageAC>
type AddNewDialogAT = ReturnType<typeof addNewDialogAC>

export type DialogsReducerActionTypes = AddNewMessageAT | AddNewDialogAT
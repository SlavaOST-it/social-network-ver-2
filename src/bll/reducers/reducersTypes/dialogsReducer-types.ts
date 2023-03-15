import {
    addNewDialogAC,
    addNewMessageAC,
    changeSelectedStatusAC,
    setCurrentDialogIdAC,
} from "../dialogs-reducer";


// ===== Initial State ===== //
export type DialogsPageType = {
    selectUser: boolean,
    currentDialogId: number
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


// ===== Action Types ==== //
type AddNewDialogAT = ReturnType<typeof addNewDialogAC>
type AddNewMessageAT = ReturnType<typeof addNewMessageAC>
type SetCurrentDialogIdAT = ReturnType<typeof setCurrentDialogIdAC>
type ChangeSelectedStatusAT = ReturnType<typeof changeSelectedStatusAC>

export type DialogsReducerActionTypes = AddNewMessageAT | AddNewDialogAT | ChangeSelectedStatusAT | SetCurrentDialogIdAT
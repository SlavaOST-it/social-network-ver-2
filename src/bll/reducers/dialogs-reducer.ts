import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import avatar1 from "../../assets/img/usersBaseAvatar/userAvaPost.jpg"
import avatar2 from "../../assets/img/usersBaseAvatar/elonMusk.png"
import avatar3 from "../../assets/img/usersBaseAvatar/userAvatar1.jpg"
import avatar4 from "../../assets/img/usersBaseAvatar/userAvatar2.jpg"


const initialState = {
    dialogs: [
        {
            dialogId: 1,
            userName: "Thomas Shelby",
            avatar: avatar1,
            messages: [
                {messageId: 1, text: "Привет!"},
                {messageId: 2, text: "Как дела?"}
            ]
        },

        {
            dialogId: 2,
            userName: "Elon Musk",
            avatar: avatar2,
            messages: [
                {messageId: 1, text: "Привет!"},
                {messageId: 2, text: "Я вчера ракету запустил!!!"},
                {messageId: 3, text: "Видел как полетела?"}
            ]
        },

        {
            dialogId: 3,
            userName: "Alex",
            avatar: avatar3,
            messages: []
        },

        {
            dialogId: 4,
            userName: "Ivan",
            avatar: avatar4,
            messages: []
        },
    ]

}

const slice = createSlice({
    name: 'dialogs',
    initialState: initialState,
    reducers: {
        addNewMessageAC(state, action: PayloadAction<{ textMessage: string , dialogId: number,}>) {
            const newMessage = {
                messageId: new Date().getTime(),
                text: action.payload.textMessage
            }
           const dialog = state.dialogs.find(d => d.dialogId === action.payload.dialogId)
            if(dialog){
                dialog.messages.push({...newMessage})
            }
        },
    }
})


export const dialogsReducer = slice.reducer
export const {addNewMessageAC} = slice.actions


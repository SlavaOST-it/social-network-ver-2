import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    dialogs: [
        {
            dialogId: 1, userName: "Thomas", messages: [
                {messageId: 1, text: "Привет!"},
                {messageId: 2, text: "Как дела?"}
            ]
        }
    ]

}

const slice = createSlice({
    name: 'dialogs',
    initialState: initialState,
    reducers: {}
})


export const dialogsReducer = slice.reducer
export const {} = slice.actions


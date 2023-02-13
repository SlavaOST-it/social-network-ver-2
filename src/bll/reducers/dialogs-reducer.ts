import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
id: 1
}

const slice = createSlice({
    name: 'dialogs',
    initialState: initialState,
    reducers: {

    }
})



export const dialogsReducer = slice.reducer
export const {} = slice.actions


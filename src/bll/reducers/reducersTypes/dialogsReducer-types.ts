import {addNewMessageAC} from "../dialogs-reducer";


// ===== Initial State ===== //
export type DialogsPage = {

}

type AddNewMessageAT = ReturnType<typeof addNewMessageAC>

export type DialogsReducerActionTypes = AddNewMessageAT
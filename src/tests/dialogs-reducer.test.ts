import {DialogsPageType} from "../bll/reducers/reducersTypes/dialogsReducer-types";
import {addNewDialogAC, addNewMessageAC, dialogsReducer} from "../bll/reducers/dialogs-reducer";
import avatar1 from "../assets/img/usersBaseAvatar/userAvaPost.jpg";


let startState: DialogsPageType = {
    selectUser: false,
    currentDialogId: 0,
    dialogs: []
}

beforeEach(() => {
    startState = {
        selectUser: false,
        currentDialogId: 0,

        dialogs: [
            {
                dialogId: 1,
                userName: "Thomas Shelby",
                avatar: avatar1,
                messages: [
                    {messageId: 1, text: "Привет!"},
                    {messageId: 2, text: "Как дела?"}
                ]
            }
        ]
    }
})

test('adding a new dialog', () => {
    const endState = dialogsReducer(startState, addNewDialogAC({userName: "Slava", avatar: null}))

    expect(endState.dialogs.length).toBe(2)
    expect(endState.dialogs[0].userName).toBe("Slava")
})

test('adding a new message', () => {
    const endState = dialogsReducer(startState, addNewMessageAC({dialogId: 1, textMessage: "new message test"}))

    expect(endState.dialogs[0].messages.length).toBe(3)
    expect(endState.dialogs[0].messages[2].text).toBe("new message test")
})
import {ProfilePageType} from "../bll/reducers/reducersTypes/profileReducer-types";
import {addPostAC, profileReducer, setStatusAC} from "../bll/reducers/profile-reducer";


let startState: ProfilePageType = {
    profile: null,
    myId: 0,
    isOwner: false,
    myAvatar: null,
    status: "",
    posts: []
}

beforeEach(() => {
    startState = {
        profile: null,
        myId: 0,
        isOwner: true,
        myAvatar: null,
        status: "",
        posts: [
            {id: 1, message: 'React или Angular? Что вы выберите?', likesCount: 1, comments: []},
            {id: 2, message: 'Какие книги посоветуете?', likesCount: 3, comments: [{id: 1, text: "JS для детей LOL =)"}]},
            {
                id: 3,
                message: 'Frontend or Backend? Или же Fullstack?',
                likesCount: 5,
                comments: [
                    {id: 1, text: "Не парься, выбери MacDonald's"}
                ]
            }
        ]
    }
})

test('change status', () => {
    const endState = profileReducer(startState, setStatusAC({status: "Test status"}))

    expect(endState.status?.length).toBe(true)
    expect(endState.status).toBe("Test status")
})

test('add new post', () => {
    const endState = profileReducer(startState, addPostAC({postText: "Test text"}))

    expect(endState.posts.length).toBe(4)
})
import React, {ChangeEvent, useState} from 'react';

import s from "./AddPost.module.scss"

import {useAppDispatch} from "../../../utils/hooks/hooks";
import {addPostAC} from "../../../bll/reducers/profile-reducer";
import {ButtonSend} from "../../../common/components/buttonSend/ButtonSend";
import {AvatarUser} from "../../profile/avatar/AvatarUser";


export const AddPost = () => {
    const dispatch = useAppDispatch()

    const [valueText, setValueText] = useState("")

    const changeTextPost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValueText(e.currentTarget.value)
    }

    const addPostHandler = () => {
        if(valueText.length){
            dispatch(addPostAC({postText: valueText}))
        }
        setValueText("")
    }

    return (
        <div className={s.addPost}>
            <div className={s.wrapper}>
                <AvatarUser className={s.avatar}/>
                <textarea
                    value={valueText}
                    onChange={changeTextPost}
                    placeholder={"Добавить пост..."}
                    className={s.textArea}
                />
                <ButtonSend callBack={addPostHandler} />
            </div>
        </div>
    );
};

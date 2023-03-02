import React, {useRef} from 'react';
import {AvatarUser} from "../avatar/AvatarUser";
import s from "./ChangePhoto.module.scss";
import cameraLogo from "../../../assets/img/icons/camera.png"
import {updatePhotoUserTC} from "../../../bll/reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";

export const ChangePhoto = () => {
    const dispatch = useAppDispatch()
    const userAvatar = useAppSelector(state => state.profile.myAvatar)

    const inputRef = useRef<HTMLInputElement>(null)

    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    }


    const changeUserAvatarHandler = (e: any) => {
        const file = e.target.files[0]
        if (e.target.files.length) {
            dispatch(updatePhotoUserTC(file))
        }
    }

    return (
        <div className={s.changePhoto}>
            <AvatarUser avatar={userAvatar} className={s.avatar}/>

            <div className={s.changeBlock}>
                <p>Изменить фото</p>

                <img
                    onClick={selectFileHandler}
                    className={s.changeAvatarBtn}
                    src={cameraLogo}
                    alt={'change_photo'}
                />
                <input
                    style={{display: 'none'}}
                    ref={inputRef}
                    type="file"
                    accept={"image/*"}
                    onChange={changeUserAvatarHandler}
                />
            </div>
        </div>
    );
};

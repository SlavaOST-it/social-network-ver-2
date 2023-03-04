import React, {FC, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {updatePhotoUserTC, updateProfileInfoTC} from "../../../bll/reducers/profile-reducer";
import {useFormik} from "formik";
import s from "./EditProfile.module.scss";
import {UpdateProfileRequestType} from "../../../api/apiConfig/typesAPI/profileAPI-types";
import {AvatarUser} from "../avatar/AvatarUser";
import cameraLogo from "../../../assets/img/icons/camera.png";


type EditProfileType = {
    isAEditingProfile: (value: boolean) => void
}

export const EditProfile: FC<EditProfileType> = ({isAEditingProfile}) => {
        const dispatch = useAppDispatch()

        const userAvatar = useAppSelector(state => state.profile.myAvatar)
        const userId = useAppSelector(state => state.profile.profile?.userId)
        const aboutMe = useAppSelector(state => state.profile.profile?.aboutMe)
        const lookingForAJob = useAppSelector(state => state.profile.profile?.lookingForAJob)
        const lookingForAJobDescription = useAppSelector(state => state.profile.profile?.lookingForAJobDescription)
        const fullName = useAppSelector(state => state.profile.profile?.fullName)
        const contacts = useAppSelector(state => state.profile.profile!.contacts)


        const checkValue = (value: any) => {
            if (value === null || undefined) {
                if (value) return value
                else return
            } else {
                if (typeof (value) === "string") {
                    if (value) return value
                    else return ""
                }

                if (typeof (value) === "number") {
                    if (value) return value
                    else return 0
                }

                if (typeof (value) === "boolean") {
                    if (value) return value
                    else return false
                }
            }
        }


        const formik = useFormik({
            initialValues: {
                userId: checkValue(userId),
                aboutMe: checkValue(aboutMe),
                lookingForAJob: checkValue(lookingForAJob),
                lookingForAJobDescription: checkValue(lookingForAJobDescription),
                fullName: checkValue(fullName),
                contacts: {
                    github: checkValue(contacts?.github),
                    vk: checkValue(contacts?.vk),
                    facebook: checkValue(contacts?.facebook),
                    instagram: checkValue(contacts?.instagram),
                    twitter: checkValue(contacts?.twitter),
                    website: checkValue(contacts?.website),
                    youtube: checkValue(contacts?.youtube),
                    mainLink: checkValue(contacts?.mainLink)
                }
            } as UpdateProfileRequestType,

            // validationSchema: {},

            onSubmit: values => {
                dispatch(updateProfileInfoTC(values))
                isAEditingProfile(false)
                formik.resetForm()
            }
        })


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

            <form onSubmit={formik.handleSubmit}>
                <div className={s.editProfile}>

                    <h2>Редактировать профиль</h2>

                    <hr/>

                    <div className={s.changeTheme}>
                        <h3>Тема оформления</h3>
                        <b>Изменить тему</b>
                    </div>

                    <hr/>

                    <div className={s.changePhoto}>
                        <h3>Фото профиля</h3>


                        <div className={s.changeBlock}>
                            <AvatarUser avatar={userAvatar} className={s.avatar}/>

                            <>
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
                                <b>изменить фото</b>
                            </>
                        </div>
                    </div>

                    <hr/>

                    <div className={s.switchBlock}>
                        <h3>В поиске работы:</h3>

                        <div className={s.toggleBlock}>
                            <b>НЕТ</b>

                            <input
                                className={s.toggleCheckbox}
                                id={"lookingForAJob"}
                                name="lookingForAJob"
                                type="checkbox"
                                onChange={formik.handleChange}
                                checked={formik.values.lookingForAJob}/>

                            <label htmlFor={"lookingForAJob"}></label>

                            <b>ДА</b>
                        </div>
                    </div>

                    <hr/>

                    <div className={s.aboutMe}>

                        <h3>Обо мне</h3>

                        <textarea
                            className={s.textarea}
                            id={"aboutMe"}
                            {...formik.getFieldProps('aboutMe')}
                        />
                    </div>

                    <hr/>

                    <div className={s.skills}>
                        <h3>Мои навыки</h3>
                        <textarea
                            className={s.textarea}
                            id={"lookingForAJobDescription"}
                            {...formik.getFieldProps('lookingForAJobDescription')}
                        />
                    </div>

                    <hr/>

                    <div className={s.fullName}>
                        <h3>Мое имя</h3>
                        <input
                            id={"fullName"}
                            {...formik.getFieldProps('fullName')}
                        />
                    </div>

                    <hr/>

                    <div className={s.contacts}>
                        <h3>Контакты: </h3>

                        {Object.keys(contacts).map(key => {
                            return (
                                <div key={key} className={s.contactItem}>
                                    <div><b>{key}:</b></div>
                                    <input
                                        className={s.inputContact}
                                        id={"contacts." + key}
                                        {...formik.getFieldProps("contacts." + key)}
                                    />
                                </div>)
                        })}
                    </div>

                    <hr/>

                    <div className={s.buttons}>
                        <button
                            type={'submit'}
                            disabled={formik.isSubmitting}
                            className={s.saveButton}
                        >
                            Сохранить
                        </button>

                        <button
                            onClick={() => isAEditingProfile(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </form>

        );
    }
;

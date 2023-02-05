import React from 'react';
import s from "./ProfilePage.module.scss"
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {AvatarUser} from "./avatar/AvatarUser";

import bgIMG from "../../assets/img/bg5.jpg"
import {UserStatus} from "./userStatus/UserStatus";
import {ContactsUser} from "./contactsUser/ContactsUser";
import {Posts} from "../posts/Posts";


export const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.profile.profile)
    const avatar = useAppSelector(state => state.profile.profile?.photos.large)
    const status = useAppSelector(state => state.profile.status)


    return (
        <div className={s.profilePage}>
            <div className={s.background}>
                <img src={bgIMG} alt={"background"}/>
            </div>

            <div className={s.content}>
                <div className={s.infoProfile}>
                    <AvatarUser type={'user'} avatar={avatar} className={s.avatar}/>

                    <div className={s.nameAndStatus}>
                        <p className={s.userName}>{userData?.fullName}</p>
                        <UserStatus/>
                    </div>
                </div>

                <button className={s.editProfileBtn}> Редактировать профиль</button>
            </div>

            <div className={s.aboutUser}>
                <ContactsUser/>
            </div>

            <div className={s.postsBlock}>
                <Posts/>
            </div>

        </div>
    );
};

import React from 'react';
import s from "./ProfilePage.module.scss"
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {AvatarUser} from "./avatar/AvatarUser";

import bgIMG from "../../assets/img/bg5.jpg"

import {Posts} from "../posts/Posts";
import {UserStatus} from "./userStatus/UserStatus";
import {ContactsUser} from "./contactsUser/ContactsUser";


export const ProfilePage = () => {

    const userData = useAppSelector(state => state.profile.profile)
    const myId = useAppSelector(state => state.profile.myId)
    const avatar = useAppSelector(state => state.profile.profile?.photos.large)


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

                {myId === userData?.userId &&
                    <button className={s.editProfileBtn}> Редактировать профиль</button>
                }
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

import React, {useState} from 'react';
import s from "./ProfilePage.module.scss"
import {useAppSelector} from "../../utils/hooks/hooks";
import {AvatarUser} from "./avatar/AvatarUser";

import bgIMG from "../../assets/img/bg5.jpg"
import checkLogo from "../../assets/img/icons/check-mark-button-svgrepo-com.svg"
import crossLogo from "../../assets/img/icons/cross-mark-button-svgrepo-com.svg"

import {Posts} from "../posts/Posts";
import {UserStatus} from "./userStatus/UserStatus";
import {ContactsUser} from "./contactsUser/ContactsUser";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import {EditProfile} from "./editProfile/EditProfile";


export const ProfilePage = () => {

    const myId = useAppSelector(state => state.profile.myId)
    const userData = useAppSelector(state => state.profile.profile)


    const loggedIn = useAppSelector(state => state.auth.loggedIn)

    const [isProfileEditing, setIsProfileEditing] = useState(false)

    const onActiveModalHandler = () => {
        setIsProfileEditing(true)
    }


    if (!loggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.profilePage}>
            {!isProfileEditing
                ? <>
                    <div className={s.background}>
                        <img src={bgIMG} alt={"background"}/>
                    </div>

                    <div className={s.content}>
                        <div className={s.infoProfile}>
                            <div className={s.photoBlock}>
                                <AvatarUser className={s.avatar}/>


                            </div>
                            <div className={s.nameAndStatus}>
                                <p className={s.userName}>{userData?.fullName}</p>
                                <UserStatus/>

                                <p className={s.lookingForAJob}>В поиске работы: {userData?.lookingForAJob
                                    ? <>
                                        Да
                                        <img src={checkLogo} alt={'check'} className={s.lookingForJobLogo}/>
                                    </>
                                    : <>
                                        Нет
                                        <img src={crossLogo} alt={'check'} className={s.lookingForJobLogo}/>
                                    </>
                                }</p>
                            </div>

                            <div>


                            </div>
                        </div>

                        {myId === userData?.userId &&
                            <button
                                onClick={onActiveModalHandler}
                                className={s.editProfileBtn}>
                                Редактировать профиль
                            </button>
                        }
                    </div>

                    <div className={s.aboutUser}>
                        <ContactsUser/>
                    </div>

                    <div className={s.postsBlock}>
                        <Posts/>
                    </div>
                </>

                : <EditProfile isAEditingProfile={setIsProfileEditing}/>

            }

        </div>
    );
};

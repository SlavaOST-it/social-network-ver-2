import React, {FC} from 'react';
import {useAppSelector} from "../../utils/hooks/hooks";
import baseAvatarUser from "../../assets/img/icons/avatar_user.png"


type AvatarUserType = {
    onError?: ()=> void
    className?: string
}
export const AvatarUser: FC<AvatarUserType>= ({onError, className}) => {
    const userAvatar = useAppSelector(state => state.profile.profile?.photos.large)

    return (
        <div>
            <img
                className={className ? className : ""}
                src={userAvatar === null ? baseAvatarUser : userAvatar}
                onError={onError}
                alt={'user avatar'}
            />
        </div>
    );
};
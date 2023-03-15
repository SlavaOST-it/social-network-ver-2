import React, {FC} from 'react';

import {useAppSelector} from "../../../utils/hooks/hooks";
import baseAvatarUser from "../../../assets/img/icons/baseAvatar.jpg"


type AvatarUserType = {
    avatar?: string | null
    onError?: () => void
    className?: string
}
export const AvatarUser: FC<AvatarUserType> = ({ avatar, onError, className}) => {

    const avatarUser = useAppSelector(state => state.profile.profile?.photos.large)

    const finalAvatar = avatar ? avatar : avatarUser

    return (
        <div>
            <img
                className={className ? className : ""}
                src={finalAvatar ? finalAvatar : baseAvatarUser}
                onError={onError}
                alt={'user avatar'}
            />
        </div>
    );
};

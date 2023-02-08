import React, {FC} from 'react';
import {useAppSelector} from "../../../utils/hooks/hooks";
import baseAvatarUser from "../../../assets/img/icons/avatar_user.png"


type AvatarUserType = {
    type: 'my' | 'user'
    avatar?: string | null | undefined
    onError?: () => void
    className?: string
}
export const AvatarUser: FC<AvatarUserType> = ({avatar, type, onError, className}) => {
    const myAvatar = useAppSelector(state => state.profile.myAvatar)

    const currentAvatar = type === 'user' ? avatar : myAvatar
    return (
        <div>
            <img
                className={className ? className : ""}
                src={currentAvatar === null ? baseAvatarUser : currentAvatar}
                onError={onError}
                alt={'user avatar'}
            />
        </div>
    );
};
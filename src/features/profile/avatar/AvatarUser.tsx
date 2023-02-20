import React, {FC} from 'react';
import {useAppSelector} from "../../../utils/hooks/hooks";
import baseAvatarUser from "../../../assets/img/icons/baseAvatar.jpg"


type AvatarUserType = {
    type: 'my' | 'user'
    avatar?: string | null | undefined
    onError?: () => void
    className?: string
}
export const AvatarUser: FC<AvatarUserType> = ({type, onError, className}) => {
    const avatar = useAppSelector(state => state.profile.profile?.photos.large)

    return (
        <div>
            <img
                className={className ? className : ""}
                src={avatar === null ? baseAvatarUser : avatar}
                onError={onError}
                alt={'user avatar'}
            />
        </div>
    );
};
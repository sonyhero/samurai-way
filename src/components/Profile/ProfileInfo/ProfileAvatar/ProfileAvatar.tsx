import {PhotosType} from '../../profile-reducer/profile-reducer';
import React from 'react';
import {Preloader} from '../../../common/Preloader/Preloader';
import user from '../../../../assets/img/user.png';

type ProfileAvatarType = {
    isAvatar: boolean
    photos: PhotosType
}

export const ProfileAvatar: React.FC<ProfileAvatarType> = ({isAvatar, photos}) => {
    return (
        <div>
            {(isAvatar)
                ? <Preloader/>
                : <img src={photos.large || user} alt={'profile'}/>
            }</div>
    )
}
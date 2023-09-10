import { PhotosType } from '../../../model/profile-reducer'
import React from 'react'
import { Preloader } from '../../../../../common/Preloader/Preloader'
import user from '../../../../../../assets/img/user.png'

export const ProfileAvatar: React.FC<ProfileAvatarType> = ({ isAvatar, photos }) => {
  return <div>{isAvatar ? <Preloader /> : <img src={photos.large || user} alt={'profile'} />}</div>
}

//Types
type ProfileAvatarType = {
  isAvatar: boolean
  photos: PhotosType
}

import React, { ChangeEvent, useState } from 'react'
import s from './ProfileInfo.module.scss'
import { ProfileType } from '../../model/profile-reducer'
import { ProfileStatusUseState } from './ProfileStatus/ProfileStatusUseState'
import { ProfileDescription } from './ProfileDescription/ProfileDescription'
import ProfileForm, { ProfileFormType } from './ProfileForm/ProfileForm'
import { Typography } from '../../../../ui/typography'
import { AvatarDemo } from '../../../../ui/avatar'
import { Edit } from '../../../../../assets'

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {
  const { profile, profileStatus, updateProfileStatus, isOwner, savePhoto, saveProfile } = props

  const [editMode, setEditMode] = useState<boolean>(false)

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }
  const onSetEditModeHandler = () => {
    setEditMode(true)
  }

  const onSubmit = (formData: ProfileFormType) => {
    saveProfile(formData).then(() => {
      setEditMode(false)
    })
  }

  return (
    <div className={s.profileInfoBox}>
      <div className={s.profileBox}>
        {/*<ProfileAvatar isAvatar={!profile} photos={profile.photos} />*/}

        <div className={s.avatarBox}>
          <AvatarDemo className={s.avatar} src={profile.photos.large || profile.photos.small} />
          {isOwner && editMode && (
            <label htmlFor={'mainPhotoInput'}>
              <div className={s.avatarEdit}>
                <Edit className={s.avatarEdit} />
              </div>
              <input type={'file'} id={'mainPhotoInput'} onChange={onMainPhotoSelected} className={s.mainPhotoInput} />
            </label>
          )}
        </div>

        {editMode ? (
          <ProfileForm initialValues={profile} onSubmit={onSubmit} />
        ) : (
          <ProfileDescription profile={profile} isOwner={isOwner} setEditMode={onSetEditModeHandler} />
        )}
      </div>
      <div className={s.statusBox}>
        <Typography className={s.statusLabel} variant={'h3'}>
          Status:
        </Typography>
        <ProfileStatusUseState status={profileStatus} updateProfileStatus={updateProfileStatus} />
      </div>
    </div>
  )
}

//Types
type ProfileInfoPropsType = {
  profile: ProfileType
  profileStatus: string
  updateProfileStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (value: File) => void
  saveProfile: (profile: ProfileFormType) => Promise<void | string>
}

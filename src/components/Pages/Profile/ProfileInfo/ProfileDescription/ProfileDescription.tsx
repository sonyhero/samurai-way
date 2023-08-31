import React from 'react'
import { ProfileType } from '../../profile-reducer/profile-reducer'
import { Contacts } from './Contacts'
import { Button } from '../../../../ui/button'
import { Typography } from '../../../../ui/typography'
import s from './ProfileDescription.module.scss'
import { Modal } from '../../../../ui/modal'

export const ProfileDescription: React.FC<ProfileDescriptionType> = ({ profile, isOwner, setEditMode }) => {
  return (
    <div className={s.wrap}>
      <div className={s.buttonBox}>
        <Modal>
          <div>Looking for a job: {profile.lookingForAJob ? 'yes' : ' no'}</div>
          {profile.lookingForAJob && <div>My professional skills: {profile.lookingForAJobDescription}</div>}
          <div>
            Contacts: <Contacts />
          </div>
        </Modal>
        <Button>More</Button>
        {isOwner && <Button onClick={setEditMode}>Edit profile</Button>}
      </div>
      <div className={s.descriptionBox}>
        <Typography variant={'h2'}>{profile.fullName}</Typography>
        <Typography>About me: {profile.aboutMe}</Typography>
      </div>

      {/*<div>Looking for a job: {profile.lookingForAJob ? 'yes' : ' no'}</div>*/}
      {/*{profile.lookingForAJob && <div>My professional skills: {profile.lookingForAJobDescription}</div>}*/}
      {/*<div>*/}
      {/*  Contacts: <Contacts />*/}
      {/*</div>*/}
    </div>
  )
}

//Types
type ProfileDescriptionType = {
  profile: ProfileType
  isOwner: boolean
  setEditMode: () => void
}

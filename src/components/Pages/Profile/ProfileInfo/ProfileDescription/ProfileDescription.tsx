import React from 'react'
import { ProfileType } from '../../profile-reducer/profile-reducer'
import { Contacts } from './Contacts'
import { Button } from '../../../../ui/button'

export const ProfileDescription: React.FC<ProfileDescriptionType> = ({ profile, isOwner, setEditMode }) => {
  return (
    <div>
      {isOwner && <Button onClick={setEditMode}>Edit profile</Button>}
      <div>Full name: {profile.fullName}</div>
      <div>About me: {profile.aboutMe}</div>
      <div>Looking for a job: {profile.lookingForAJob ? 'yes' : ' no'}</div>
      {profile.lookingForAJob && <div>My professional skills: {profile.lookingForAJobDescription}</div>}
      <div>
        Contacts: <Contacts />
      </div>
    </div>
  )
}

//Types
type ProfileDescriptionType = {
  profile: ProfileType
  isOwner: boolean
  setEditMode: () => void
}

import React from 'react'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { MyPostsContainer } from './MyPosts/MyPostsContainer'
import { ProfileType } from './profile-reducer/profile-reducer'
import { ProfileFormType } from './ProfileInfo/ProfileForm/ProfileForm'

export const Profile: React.FC<ProfilePropsType> = (props) => {
  const { profile, profileStatus, updateProfileStatus, isOwner, savePhoto, saveProfile } = props

  return (
    <div>
      <ProfileInfo
        profile={profile}
        profileStatus={profileStatus}
        updateProfileStatus={updateProfileStatus}
        isOwner={isOwner}
        savePhoto={savePhoto}
        saveProfile={saveProfile}
      />
      {isOwner && <MyPostsContainer />}
    </div>
  )
}

//Types
type ProfilePropsType = {
  profile: ProfileType
  profileStatus: string
  updateProfileStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (value: File) => void
  saveProfile: (profile: ProfileFormType) => Promise<void | string>
}

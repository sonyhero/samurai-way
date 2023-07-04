import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfileType} from './profile-reducer/profile-reducer';

type ProfilePropsType = {
    profile: ProfileType | null
    profileStatus: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (value: File) => void
}
export const Profile: React.FC<ProfilePropsType> = (props) => {

    const {profile, profileStatus, updateProfileStatus, isOwner,savePhoto} = props

    return (
        <div>
            <ProfileInfo profile={profile}
                         profileStatus={profileStatus}
                         updateProfileStatus={updateProfileStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
            />
            <MyPostsContainer/>
        </div>
    )
}
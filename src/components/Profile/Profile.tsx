import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfileType} from './profile-reducer/profile-reducer';

type ProfilePropsType = {
    profile: ProfileType | null
    profileStatus: string
    updateProfileStatus: (status: string) => void
}
export const Profile: React.FC<ProfilePropsType> = (props) => {

    const {profile, profileStatus, updateProfileStatus} = props

    return (
        <div>
            <ProfileInfo profile={profile}
                         profileStatus={profileStatus}
                         updateProfileStatus={updateProfileStatus}
            />
            <MyPostsContainer/>
        </div>
    )
}
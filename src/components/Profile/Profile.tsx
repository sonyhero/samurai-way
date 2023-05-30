import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfileType} from '../../redux/profile-reducer';

type ProfilePropsType = {
    profile: ProfileType | null
    profileStatus: string
}
export const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         profileStatus={props.profileStatus}
            />
            <MyPostsContainer/>
        </div>
    )
}
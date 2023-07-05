import React, {ChangeEvent} from 'react';
import s from './ProfileInfoCSS.module.css'
import {ProfileType} from '../profile-reducer/profile-reducer';
import {ProfileStatusUseState} from './ProfileStatusUseState';
import {ProfileDescription} from '../ProfileDescription/ProfileDescription';
import {ProfileAvatar} from '../ProfileAvatar/ProfileAvatar';

type ProfileInfoPropsType = {
    profile: ProfileType
    profileStatus: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (value: File) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    const {profile, profileStatus, updateProfileStatus, isOwner, savePhoto} = props

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img
                    src="https://cdn.wallpapersafari.com/66/25/slYcCE.jpg"
                    alt="itachi content" width="600px" height="200px"/>
            </div>
            <div className={s.descriptionBlock}>
                <ProfileAvatar isAvatar={!profile} photos={profile.photos}/>
                <div>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                </div>
                <ProfileDescription profile={profile}/>
            </div>
            Status:<ProfileStatusUseState status={profileStatus}
                                          updateProfileStatus={updateProfileStatus}
        />
        </div>
    )
}

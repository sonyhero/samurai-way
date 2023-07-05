import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfoCSS.module.css'
import {ProfileType} from '../profile-reducer/profile-reducer';
import {ProfileStatusUseState} from './ProfileStatus/ProfileStatusUseState';
import {ProfileDescription} from './ProfileDescription/ProfileDescription';
import {ProfileAvatar} from './ProfileAvatar/ProfileAvatar';
import {ProfileForm} from "./ProfileForm/ProfileForm";

type ProfileInfoPropsType = {
    profile: ProfileType
    profileStatus: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (value: File) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    const {profile, profileStatus, updateProfileStatus, isOwner, savePhoto} = props
    const [editMode, setEditMode] = useState<boolean>(false)

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
                <span>------------------</span>
                <div>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                </div>
                <span>------------------</span>
                {editMode
                    ?<ProfileForm/>
                    :<ProfileDescription profile={profile} isOwner={isOwner}/>}
                <span>------------------</span>
            </div>
            Status:
            <ProfileStatusUseState status={profileStatus}
                                   updateProfileStatus={updateProfileStatus}
        />
            <span>------------------</span>
        </div>
    )
}

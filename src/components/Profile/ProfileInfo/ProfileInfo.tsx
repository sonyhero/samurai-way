import React, {ChangeEvent} from 'react';
import s from './ProfileInfoCSS.module.css'
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileType} from '../profile-reducer/profile-reducer';
import {ProfileStatusUseState} from './ProfileStatusUseState';
import user from '../../../assets/img/user.png'

type ProfileInfoPropsType = {
    profile: ProfileType | null
    profileStatus: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (value: File) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    const {profile, profileStatus, updateProfileStatus, isOwner, savePhoto} = props
    // if(!props.profile){
    //     return <Preloader/>
    // }

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
                <div>
                    {(!profile)
                        ? <Preloader/>
                        : <img src={profile.photos.large || user} alt={'profile'}/>
                    }</div>
                ava+description
                <div>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                </div>
            </div>
            Status:<ProfileStatusUseState status={profileStatus}
                                          updateProfileStatus={updateProfileStatus}
        />
        </div>
    )
}
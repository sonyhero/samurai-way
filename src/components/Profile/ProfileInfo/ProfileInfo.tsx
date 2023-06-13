import React from 'react';
import s from './ProfileInfoCSS.module.css'
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profile-reducer';
import {ProfileStatusUseState} from './ProfileStatusUseState';

type ProfileInfoPropsType = {
    profile: ProfileType | null
    profileStatus: string
    updateProfileStatus: (status: string) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    const {profile, profileStatus, updateProfileStatus} = props
    // if(!props.profile){
    //     return <Preloader/>
    // }

    return (
        <div>
            <div>
                <img
                    src="https://cdn.wallpapersafari.com/66/25/slYcCE.jpg"
                    alt="itachi content" width="600px" height="200px"/>
            </div>
            <div className={s.descriptionBlock}>
                {(!profile)
                    ? <Preloader/>
                    : <img src={profile.photos.large} alt={"profile"}/>
                }
                ava+description
            </div>
            Status:<ProfileStatusUseState status={profileStatus}
                                  updateProfileStatus={updateProfileStatus}
        />
        </div>
    )
}
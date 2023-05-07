import React from 'react';
import s from './ProfileInfoCSS.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";

type ProfileInfoPropsType = {
    profile: ProfileType | null
}
export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

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
                {(!props.profile)
                    ? <Preloader/>
                    : <img src={props.profile.photos.large} alt={"profile"}/>
                }
                ava+description
            </div>
        </div>
    )
}
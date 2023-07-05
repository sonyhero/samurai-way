import React from 'react';
import {ProfileType} from '../../profile-reducer/profile-reducer';
import {Button} from "../../../common/Button/Button";

type ProfileDescriptionType = {
    profile: ProfileType
    isOwner: boolean
    setEditMode: () => void
}

export const ProfileDescription: React.FC<ProfileDescriptionType> = ({profile, isOwner, setEditMode}) => {

    return (
        <div>
            {isOwner && <Button callback={setEditMode} name={'Edit profile'}/>}
            <div>Full name: {profile.fullName}</div>
            <div>About me: {profile.aboutMe}</div>
            <div>Looking for a job: {profile.lookingForAJob ? 'yes' : ' no'}</div>
            {profile.lookingForAJob &&
                <div>My professional skills: {profile.lookingForAJobDescription}</div>}
            <div>Contacts: {profile.contacts && Object.entries(profile.contacts).map((key, index) => {
                return (
                    <Contacts
                        key={index}
                        title={key[0]}
                        value={key[1]}
                    />)
            })} </div>
        </div>
    )
}


type ContactsType = {
    title: string
    value: string
}

const Contacts = ({title, value}: ContactsType) => {
    return (
        <div>{title}: {value}</div>
    )
}


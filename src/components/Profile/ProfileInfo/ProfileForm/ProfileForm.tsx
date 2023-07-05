import React from "react";
import {Button} from "../../../common/Button/Button";
import {fieldCreator, Input} from "../../../common/FormsControls/FormsControl";
import {InjectedFormProps, reduxForm} from "redux-form";

export const ProfileForm: React.FC<InjectedFormProps<ProfileFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Button name={'Save'}/>
            <div>Full name: {fieldCreator('fullName', 'Full name', [], Input)}</div>
            <div>About me: {fieldCreator('aboutMe', 'About me', [], Input)}</div>
            <div>Looking for a
                job: {fieldCreator('lookingForAJob', '', [], Input, {type: 'checkbox'}, 'lookingForAJob')}</div>
            <div></div>
            <div></div>
        </form>
    )
}

export default reduxForm<ProfileFormType>({
    form: 'editProfile'
})(ProfileForm)

//Types
export type ProfileFormType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
}
import React from 'react'
import { fieldCreator, Input, TextArea } from '../../../../common/FormsControls/FormsControl'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { ContactsForm } from './ContactsForm'
import s from '../../../Login/LoginForm/Login-form.module.scss'
import { Typography } from '../../../../ui/typography'
import { Button } from '../../../../ui/button'

export const ProfileForm: React.FC<InjectedFormProps<ProfileFormType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {props.error && <div className={s.summeryError}>{props.error}</div>}
      <Button>Save</Button>
      <div>
        <Typography>Full name:</Typography> {fieldCreator('fullName', 'Full name', [], Input)}
      </div>
      <div>About me: {fieldCreator('aboutMe', 'About me', [], Input)}</div>
      <div>Looking for a job: {fieldCreator('lookingForAJob', '', [], Input, { type: 'checkbox' })}</div>
      <div>
        My professional skills: {fieldCreator('lookingForAJobDescription', 'My professional skills', [], TextArea)}
      </div>
      <div>
        Contacts: <ContactsForm />
      </div>
    </form>
  )
}

export default reduxForm<ProfileFormType>({
  form: 'editProfile',
})(ProfileForm)

//Types
export type ProfileFormType = {
  fullName: string
  aboutMe: string
  lookingForAJob: boolean
}

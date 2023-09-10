import React from 'react'
import { fieldCreator, Input, TextArea } from '../../../../../common/FormsControls/FormsControl'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { ContactsForm } from './ContactsForm'
import s from './ProfieForm.module.scss'
import { Button } from '../../../../../ui/button'

export const ProfileForm: React.FC<InjectedFormProps<ProfileFormType>> = (props) => {
  return (
    <form className={s.formBox} onSubmit={props.handleSubmit}>
      <div className={s.buttonBox}>
        <Button>Save</Button>
      </div>
      <div className={s.field}>Full name:{fieldCreator('fullName', 'Full name', [], Input)}</div>
      <div className={s.field}>About me: {fieldCreator('aboutMe', 'About me', [], Input)}</div>
      <div className={s.checkboxBlock}>
        Looking for a job:
        <div className={s.fieldCheckbox}>{fieldCreator('lookingForAJob', '', [], Input, { type: 'checkbox' })}</div>
      </div>
      <div className={s.field}>
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

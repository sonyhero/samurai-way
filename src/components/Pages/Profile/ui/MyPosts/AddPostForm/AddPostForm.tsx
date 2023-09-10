import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { TextArea } from '../../../../../forms-controls/FormsControl'
import { Button } from '../../../../../ui/button'
import { maxLength, minLength, required } from '../../../../../../utils/validators'
import s from './AddPostForm.module.scss'

const maxLength100 = maxLength(100)
const minLength2 = minLength(2)

const AddPostForm: React.FC<InjectedFormProps<FormAddPostDataType>> = (props) => {
  return (
    <form className={s.formBox} onSubmit={props.handleSubmit}>
      <div className={s.field}>
        <Field
          name={'postText'}
          placeholder={'Enter post text'}
          value={'newPostText'}
          component={TextArea}
          validate={[required, maxLength100, minLength2]}
        />
      </div>
      <Button className={s.formButton}>Add post</Button>
    </form>
  )
}

export const AddPostReduxForm = reduxForm<FormAddPostDataType>({ form: 'addPost' })(AddPostForm)

//Types
export type FormAddPostDataType = {
  postText: string
}

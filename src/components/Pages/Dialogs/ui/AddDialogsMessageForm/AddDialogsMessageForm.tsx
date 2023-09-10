import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { TextArea } from '../../../../forms-controls/FormsControl'
import { maxLength, minLength, required } from '../../../../../utils/validators'
import { Button } from '../../../../ui/button'

const maxLength100 = maxLength(100)
const minLength1 = minLength(1)

const AddDialogsMessageForm: React.FC<InjectedFormProps<FormAddMessageDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name={'messageText'}
        placeholder={'Enter message'}
        value={'newMessageText'}
        component={TextArea}
        validate={[required, maxLength100, minLength1]}
      />
      <Button>Add message</Button>
    </form>
  )
}

export const AddMessageReduxForm = reduxForm<FormAddMessageDataType>({ form: 'addMessage' })(AddDialogsMessageForm)

//Types
type FormAddMessageDataType = {
  messageText: string
}

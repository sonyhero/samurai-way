import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {TextArea} from '../common/FormsControls/FormsControl';
import {maxLength, minLength, required} from '../../utils/validators';

type FormAddMessageDataType = {
    messageText: string
}

const maxLength100 = maxLength(100)
const minLength1 = minLength(1)

const AddMessageForm: React.FC<InjectedFormProps<FormAddMessageDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                name={'messageText'}
                placeholder={'Enter message'}
                value={'newMessageText'}
                component={TextArea}
                validate={[required, maxLength100, minLength1]}
                // onKeyDown={onKeyDownHandler}
            />
            <br/>
            <button>Add message</button>
        </form>
    )
}

export const AddMessageReduxForm = reduxForm<FormAddMessageDataType>({form: 'addMessage'})(AddMessageForm)
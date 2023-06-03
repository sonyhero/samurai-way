import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

type FormAddMessageDataType = {
    messageText: string
}

const AddMessageForm: React.FC<InjectedFormProps<FormAddMessageDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                name={'messageText'}
                placeholder={'Enter message'}
                value={'newMessageText'}
                component={'textarea'}
                // onKeyDown={onKeyDownHandler}
            />
            <br/>
            <button>Add message</button>
        </form>
    )
}

export const AddMessageReduxForm = reduxForm<FormAddMessageDataType>({form: 'addMessage'})(AddMessageForm)
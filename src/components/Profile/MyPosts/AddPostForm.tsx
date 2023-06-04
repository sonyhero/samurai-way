import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLength, minLength, required} from '../../../utils/validators';
import {FormsControls} from '../../common/FormsControls/FormsControls';

type FormAddPostDataType = {
    postText: string
}

const maxLength10 = maxLength(10)
const minLength2 = minLength(2)


const AddPostForm: React.FC<InjectedFormProps<FormAddPostDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                name={'postText'}
                placeholder={'Enter post text'}
                value={'newPostText'}
                component={FormsControls}
                validate={[required, maxLength10, minLength2]}
                // onKeyDown={onKeyDownHandler}
            />
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddPostReduxForm = reduxForm<FormAddPostDataType>({form: 'addPost'})(AddPostForm)
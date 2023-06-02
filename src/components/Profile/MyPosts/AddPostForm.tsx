import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormAddPostDataType = {
    postText: string
}

const AddPostForm: React.FC<InjectedFormProps<FormAddPostDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                name={'postText'}
                placeholder={'Enter post text'}
                value={'newPostText'}
                component={'textarea'}
                // onKeyDown={onKeyDownHandler}
            />
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddPostReduxForm = reduxForm<FormAddPostDataType>({form: 'addPost'})(AddPostForm)
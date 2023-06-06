import React, {TextareaHTMLAttributes} from 'react';
import s from './FormsControls.module.css'

type TextAreaType = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    input: {
        name: string;
        onBlur: () => void;
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        onFocus: () => void;
        value: string;
    }
    meta: {
        touched: boolean;
        error: string;
    }
}

export const TextArea: React.FC<TextAreaType> = (props) => {

    const {input, meta, ...restProps} = props

    const isError = meta.touched && meta.error
    const finalClassName = `${s.formControl} ${isError
        ? s.error
        : ''}`

    return (
        <div className={finalClassName}>
            <div><textarea  {...input} {...restProps}/></div>
            <div>
                {isError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}
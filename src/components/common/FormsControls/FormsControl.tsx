import React from 'react';
import s from './FormsControls.module.css'


type FormControlType = {
    input: {
        name: string;
        // onBlur: () => void;
        // onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        // onFocus: () => void;
        value: string;
    }
    meta: {
        touched?: boolean;
        error?: string;
    }
    children: React.ReactNode
}

export const FormControl: React.FC<FormControlType> = (props) => {

    const {input, meta, children, ...restProps} = props

    const isError = meta.touched && meta.error
    const finalClassName = `${s.formControl} ${isError
        ? s.error
        : ''}`

    return (
        <div className={finalClassName}>
            <div>{children}</div>
            <div>
                {isError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

// type TextAreaType = TextareaHTMLAttributes<HTMLTextAreaElement>;
export const TextArea: React.FC<FormControlType> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <textarea  {...input} {...restProps} />
        </FormControl>)
}

// type InputType = InputHTMLAttributes<HTMLInputElement>
export const Input: React.FC<FormControlType> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>)
}
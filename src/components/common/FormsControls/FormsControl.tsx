import React, {InputHTMLAttributes, TextareaHTMLAttributes} from 'react';
import s from './FormsControls.module.css'


type FormControlType<T = {}> = {
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
    children: React.ReactNode
} & T

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

type TextAreaType = TextareaHTMLAttributes<HTMLTextAreaElement>;
export const TextArea: React.FC<TextAreaType & FormControlType<TextAreaType>> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea  {...input} {...restProps} /></FormControl>
}

type InputType = InputHTMLAttributes<HTMLInputElement>
export const Input: React.FC<InputType & FormControlType<InputType>> = (props) => {
    const {meta, ...restProps} = props
    return <FormControl {...props}><input {...restProps} /></FormControl>
}

// export const TextArea: React.FC<TextAreaType> = (props) => {
//
//     const {input, meta, ...restProps} = props
//
//     const isError = meta.touched && meta.error
//     const finalClassName = `${s.formControl} ${isError
//         ? s.error
//         : ''}`
//
//     return (
//         <div className={finalClassName}>
//             <div><textarea  {...input} {...restProps}/></div>
//             <div>
//                 {isError && <span>{meta.error}</span>}
//             </div>
//         </div>
//     )
// }
//
// export const Input: React.FC<InputType> = (props) => {
//
//     const {meta, ...restProps} = props
//
//     const isError = meta.touched && meta.error
//     const finalClassName = `${s.formControl} ${isError
//         ? s.error
//         : ''}`
//
//     return (
//         <div className={finalClassName}>
//             <div><input {...restProps}/></div>
//             <div>
//                 {isError && <span>{meta.error}</span>}
//             </div>
//         </div>
//     )
// }
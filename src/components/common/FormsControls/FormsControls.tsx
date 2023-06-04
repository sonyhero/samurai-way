import React, {TextareaHTMLAttributes} from 'react';

type FormsControlsType = TextareaHTMLAttributes<HTMLTextAreaElement> & {
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

export const FormsControls: React.FC<FormsControlsType> = (props) => {

    const {input, meta, ...restProps} = props

    return (
        <div>
            <textarea {...input} {...restProps}/>
        </div>
    )
}
import { ChangeEvent, KeyboardEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { LabelDemo } from '../label'
import { Typography } from '../typography'

import s from './textfield.module.scss'
import { DeleteIcon, Eye, NotEye, Search } from '../../../assets'

export type TextFieldProps = {
  type?: 'default' | 'password' | 'searchType'
  label?: string
  errorMessage?: string | null
  placeholder?: string
  disableValue?: boolean
  value?: string
  onChangeText?: (value: string) => void
  onEnter?: () => void
  onSearchClear?: () => void
  className?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      errorMessage,
      label,
      placeholder = 'Some text',
      type = 'default',
      disableValue = false,
      value,
      onEnter,
      onSearchClear,
      onChangeText,
      className,
      ...restProps
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const finalType = getType(type, showPassword)

    const inputStyle = (type: 'default' | 'password' | 'searchType' | string) => {
      if (type === 'searchType') {
        return { paddingLeft: '2.56rem', paddingRight: '35px' }
      } else if (type === 'password') {
        return { paddingRight: '35px' }
      } else {
        return {}
      }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeText?.(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onEnter && e.key === 'Enter' && onEnter()
    }
    const onSearchClearHandler = () => {
      if (onSearchClear) {
        onSearchClear()
      }
    }

    return (
      <div className={className}>
        <LabelDemo label={label} variant={'secondary'}>
          <div className={`${s.fieldContainer}`}>
            {type === 'searchType' && (
              <span className={s.search}>
                <Search fill={disableValue ? '#4c4c4c' : '#808080'} />
              </span>
            )}
            <input
              className={`${s.field} ${errorMessage ? s.error : ''}`}
              ref={ref}
              placeholder={placeholder}
              type={finalType}
              disabled={disableValue}
              onChange={onChangeHandler}
              onKeyDown={onKeyPressCallback}
              style={inputStyle(type)}
              value={value}
              {...restProps}
            />
            {type === 'password' && (
              <button
                className={s.buttonAction}
                type={'button'}
                aria-label={'show password'}
                disabled={disableValue}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Eye fill={disableValue ? '#fff' : '#4c4c4c'} />
                ) : (
                  <NotEye fill={disableValue ? '#fff' : '#4c4c4c'} />
                )}
              </button>
            )}
            {type === 'searchType' && !!value && (
              <button
                className={s.buttonAction}
                type={'button'}
                aria-label={'delete'}
                disabled={disableValue}
                onClick={onSearchClearHandler}
              >
                <DeleteIcon fill={disableValue ? '#4c4c4c' : '#808080'} />
              </button>
            )}
          </div>
          <Typography variant="body1" className={s.errorMessage}>
            {errorMessage}
          </Typography>
        </LabelDemo>
      </div>
    )
  },
)

function getType(type: string, showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
import { useAppDispatch, useAppSelector } from '../../../../../../app/store'
import { getStatus } from '../../../../../../app/model/selectors/chat-selector'
import { useState } from 'react'
import { sendMessage } from '../../../model/chat-reducer'
import { TextField } from '../../../../../ui/textfield'
import { Button } from '../../../../../ui/button'
import s from '../../../../Profile/ui/MyPosts/AddPostForm/AddPostForm.module.scss'

export const AddChatMessageForm = () => {
  const status = useAppSelector(getStatus)
  const [value, setValue] = useState<string>('')
  const dispatch = useAppDispatch()

  const onChangeHandler = (text: string) => {
    setValue(text)
  }

  const addNewMessage = () => {
    if (!value) {
      return
    }
    dispatch(sendMessage(value))
    setValue('')
  }
  const onKeyPressHandler = () => {
    addNewMessage()
  }

  return (
    <div className={s.formBox}>
      <TextField
        className={s.field}
        onEnter={onKeyPressHandler}
        onChangeText={onChangeHandler}
        value={value}
        placeholder={'type message...'}
      />
      <Button className={s.formButton} disabled={status !== 'ready'} onClick={addNewMessage}>
        Send
      </Button>
    </div>
  )
}

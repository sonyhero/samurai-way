import React from 'react'
import s from './Dialogs.module.scss'
import { DialogItem } from './DialogItem/DialogsItem'
import { Message } from './Message/Message'
import { AddMessageReduxForm } from './AddDialogsMessageForm/AddDialogsMessageForm'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { addMessage } from '../model/dialogs-reducer'
import { withAuthRedirect } from '../../../../hoc/withAuthRedirect'

const DialogsPage = () => {
  const dispatch = useAppDispatch()
  const dialogsPage = useAppSelector((state) => state.dialogsReducer)

  const dialogsDataMap = dialogsPage.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />)

  const messagesDataMap = dialogsPage.messages.map((m) => <Message key={m.id} messageText={m.messageText} id={m.id} />)

  const onAddMessage = (data: { messageText: string }) => {
    dispatch(addMessage(data.messageText))
  }

  return (
    <div className={s.dialogsBox}>
      Dialogs
      <div className={s.dialogs}>
        <div className={s.messages}>
          {messagesDataMap}
          <AddMessageReduxForm onSubmit={onAddMessage} />
        </div>
        <div className={s.dialogsItems}>{dialogsDataMap}</div>
      </div>
    </div>
  )
}

export default withAuthRedirect(DialogsPage)

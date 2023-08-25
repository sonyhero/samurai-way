import React from 'react'
import s from './DialogsCSS.module.css'
import { DialogItem } from './DialogItem/DialogsItem'
import { Message } from './Message/Message'
import { MapDispatchToPropsType, MapStateToPropsType } from './DialogsContainer'
import { AddMessageReduxForm } from './AddMessageForm'
import { useAppSelector } from '../../../app/store'
import { getIsAuth } from '../../../app/selectors/auth-selector'
import { Redirect } from 'react-router-dom'

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
  const isAuth = useAppSelector(getIsAuth)

  const { addMessage, dialogsPage } = props

  const dialogsDataMap = dialogsPage.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />)

  const messagesDataMap = dialogsPage.messages.map((m) => <Message key={m.id} messageText={m.messageText} id={m.id} />)

  const onAddMessage = (data: { messageText: string }) => {
    addMessage(data.messageText)
  }

  return !isAuth ? (
    <Redirect to={'/login'} />
  ) : (
    <div>
      Dialogs
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsDataMap}</div>
        <div className={s.messages}>
          {messagesDataMap}
          <AddMessageReduxForm onSubmit={onAddMessage} />
        </div>
      </div>
    </div>
  )
}

//Types
type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

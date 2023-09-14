import { FC, memo } from 'react'
import { ChatMessageAPIType } from '../../../../api/chat-api'
import userPhoto from '../../../../../../../assets/img/user.png'
import s from './ChatMessage.module.scss'
import { AvatarDemo } from '../../../../../../ui/avatar'
import { Typography } from '../../../../../../ui/typography'

export const ChatMessage: FC<ChatMessagePropsType> = memo(({ messageBody }) => {
  const { message, photo, userName } = messageBody

  const avatar = photo || userPhoto

  return (
    <div className={s.container}>
      {/*<img className={s.avatar} src={avatar} alt={'photo'} />*/}
      <div className={s.avatarContainer}>
        <AvatarDemo src={avatar} />
        <Typography className={s.fullName} variant={'h3'}>
          {userName}
        </Typography>
      </div>
      <Typography variant={'body1'}>{message}</Typography>
    </div>
  )
})
//types
type ChatMessagePropsType = {
  messageBody: ChatMessageAPIType
}

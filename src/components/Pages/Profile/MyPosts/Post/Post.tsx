import React from 'react'
import s from './Post.module.scss'
import { Button } from '../../../../ui/button'
import { Like, Trash } from '../../../../../assets'
import { Typography } from '../../../../ui/typography'
import { AvatarDemo } from '../../../../ui/avatar'
import { useAppSelector } from '../../../../../app/store'
import { PostsType } from '../../profile-reducer/profile-reducer'

export const Post: React.FC<PropsType> = (props) => {
  const { post, deletePost, setLikePost } = props
  const { id, date, postText, likesCount, isLiked } = post

  const userPhoto = useAppSelector((state) => state.profileReducer.profile.photos.small)
  const fullName = useAppSelector((state) => state.profileReducer.profile.fullName)

  const stringTime = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date)
  const stringDate = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date)

  const deletePostHandler = () => {
    deletePost(id)
  }

  const likePostHandler = () => {
    if (!isLiked) setLikePost(id, true)
  }

  return (
    <div className={s.postBox}>
      <div className={s.postHeader}>
        <div className={s.postInfo}>
          <AvatarDemo name={fullName} src={userPhoto} />
          <div>
            <Typography variant={'h3'} className={s.fullName}>
              {fullName}
            </Typography>
            <Typography variant={'caption'} className={s.time}>
              {stringTime}
            </Typography>
          </div>
        </div>
        <div>
          <Button variant={'icon'} onClick={deletePostHandler}>
            <Trash className={s.icon} />
          </Button>
        </div>
      </div>
      <div className={s.textBox}>
        <Typography className={s.postText}>{postText}</Typography>
        <div className={s.postFooter}>
          <Button variant={'icon'} onClick={likePostHandler}>
            <Like like={isLiked ? '#990f2b' : '#4c4c4c'} />
            {likesCount}
          </Button>
          <Typography variant={'caption'} className={s.timeDate}>
            {stringDate}
          </Typography>
        </div>
      </div>
    </div>
  )
}

//Types
type PropsType = {
  post: PostsType
  deletePost: (id: number) => void
  setLikePost: (id: number, isLike: boolean) => void
}

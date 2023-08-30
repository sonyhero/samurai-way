import React from 'react'
import s from './Post.module.scss'
import { Button } from '../../../../ui/button'
import { Like, Trash } from '../../../../../assets'
import { Typography } from '../../../../ui/typography'
import { AvatarDemo } from '../../../../ui/avatar'
import { useAppSelector } from '../../../../../app/store'

export const Post: React.FC<PostsType> = (props) => {
  const { id, postText, likesCount, deletePost } = props

  const userPhoto = useAppSelector((state) => state.profileReducer.profile.photos.small)
  const fullName = useAppSelector((state) => state.profileReducer.profile.fullName)

  const deletePostHandler = () => {
    deletePost(id)
  }

  return (
    <div key={id} className={s.postBox}>
      <div className={s.postHeader}>
        <div className={s.postInfo}>
          <AvatarDemo name={fullName} src={userPhoto} />
          <Typography variant={'h3'} className={s.fullName}>
            {fullName}
          </Typography>
        </div>
        <div>
          <Button variant={'icon'} onClick={deletePostHandler}>
            <Trash className={s.icon} />
          </Button>
        </div>
      </div>
      <div className={s.textBox}>
        <Typography className={s.postText}>{postText}</Typography>
        <Button variant={'icon'}>
          <Like />
          {likesCount}
        </Button>
      </div>
    </div>
  )
}

//Types
type PostsType = {
  id: number
  postText: string
  likesCount: number
  deletePost: (id: number) => void
}

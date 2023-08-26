import React from 'react'
import s from './PostCSS.module.css'
import { Button } from '../../../../ui/button'
import { Trash } from '../../../../../assets'
import { Typography } from '../../../../ui/typography'
// import { Button } from '../../../../common/Button/Button'

export const Post: React.FC<PostsType> = (props) => {
  const { id, postText, likesCount, deletePost } = props

  const deletePostHandler = () => {
    deletePost(id)
  }

  return (
    <div key={id} className={s.item}>
      <img src="https://i.pinimg.com/736x/11/f7/83/11f78374741b89e4dea99e0b6356ee3c.jpg" alt="itachi logo" />
      <Typography>{postText}</Typography>
      <div>
        <Typography> {likesCount} likes</Typography>
        <Button variant={'icon'} onClick={deletePostHandler}>
          <Trash fill={'#2D606BFF'} />
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

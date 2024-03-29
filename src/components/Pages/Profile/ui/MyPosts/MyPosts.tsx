import React, { memo } from 'react'
import s from './MyPosts.module.scss'
import { Post } from './Post/Post'
import { MapDispatchToPropsType, MapStateToPropsType } from './MyPostsContainer'
import { AddPostReduxForm, FormAddPostDataType } from './AddPostForm/AddPostForm'
import { Typography } from '../../../../ui/typography'

export const MyPosts: React.FC<MyPostsPropsType> = memo((props) => {
  const { addPost, profilePage, deletePost, setLikePost } = props

  const postDataMap = profilePage.posts.map((p) => (
    <Post key={p.id} post={p} deletePost={deletePost} setLikePost={setLikePost} />
  ))

  const onAddPost = (data: FormAddPostDataType) => {
    addPost(data.postText)
  }

  return (
    <div className={s.postsBox}>
      <div className={s.addPostBox}>
        <Typography className={s.addPostLabel} variant={'h3'}>
          My posts
        </Typography>
        <AddPostReduxForm onSubmit={onAddPost} />
      </div>
      <div className={s.posts}>{postDataMap}</div>
    </div>
  )
})

//Types
type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType

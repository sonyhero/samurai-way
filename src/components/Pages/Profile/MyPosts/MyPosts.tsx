import React, { memo } from 'react'
import s from './MyPostsCSS.module.css'
import { Post } from './Post/Post'
import { MapDispatchToPropsType, MapStateToPropsType } from './MyPostsContainer'
import { AddPostReduxForm, FormAddPostDataType } from './AddPostForm'
import { Typography } from '../../../ui/typography'

export const MyPosts: React.FC<MyPostsPropsType> = memo((props) => {
  const { addPost, profilePage, deletePost } = props

  console.log('render my posts')

  const postDataMap = profilePage.posts.map((p) => (
    <Post key={p.id} id={p.id} postText={p.postText} likesCount={p.likesCount} deletePost={deletePost} />
  ))

  const onAddPost = (data: FormAddPostDataType) => {
    addPost(data.postText)
  }

  return (
    <div className={s.postsBlock}>
      <Typography variant={'h3'}>My posts</Typography>
      <AddPostReduxForm onSubmit={onAddPost} />
      <div className={s.posts}>{postDataMap}</div>
    </div>
  )
})

//Types
type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType
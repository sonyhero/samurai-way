import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyPostsCSS.module.css'
import {Post} from './Post/Post';
import {ActionsTypes, PostsType} from '../../../redux/state';
import {addPostAC, updateNewPostTextAC} from '../../../redux/profile-reducer';

type MyPostsPropsType = {
    posts: PostsType[]
    dispatch: (action: ActionsTypes) => void
    newPostText: string
}

export const MyPosts = (props: MyPostsPropsType) => {

    const postDataMap = props.posts.map(p =>
        <Post id={p.id} postText={p.postText} likesCount={p.likesCount}/>
    )

    const addPost = () => {
        if (props.newPostText.trim() !== '')
            props.dispatch(addPostAC())
    }

    const onChangePost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newPostText = e.currentTarget.value
        props.dispatch(updateNewPostTextAC(newPostText))
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            addPost()
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        placeholder={'Enter post text'}
                        value={props.newPostText}
                        onChange={onChangePost}
                        onKeyDown={onKeyDownHandler}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postDataMap}
            </div>
        </div>
    )
}
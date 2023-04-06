import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyPostsCSS.module.css'
import {Post} from './Post/Post';
import {
    ActionsTypes, addPostAC,
    PostsType, updateNewPostTextAC,
} from '../../../redux/state';

type MyPostsPropsType = {
    posts: PostsType[]
    //addPost: (postMessage: string) => void
    // addPost: () => void
    // updateNewPostText: (newText: string) => void
    dispatch: (action: ActionsTypes) => void
    newPostText: string
}

export const MyPosts = (props: MyPostsPropsType) => {

    const postDataMap = props.posts.map(p =>
        <Post id={p.id} message={p.message} likesCount={p.likesCount}/>
    )

    // const addPost = () => {
    //     if (props.newPostText.trim()!=='')
    //         props.addPost(props.newPostText.trim())
    //         props.updateNewPostText('')
    //     }

    const addPost = () => {
        if (props.newPostText.trim() !== '')
            props.dispatch(addPostAC())
    }


    const onChangePost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewPostTextAC(e.currentTarget.value))
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
                    <textarea onChange={onChangePost}
                              value={props.newPostText}
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
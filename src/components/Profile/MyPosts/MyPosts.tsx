import React, {ChangeEvent} from 'react';
import s from './MyPostsCSS.module.css'
import {Post} from './Post/Post';
import {PostsType} from '../../../App';

type MyPostsPropsType = {
    posts: PostsType[]
    //addPost: (postMessage: string) => void
    addPost: () => void
    updateNewPostText: (newText: string) => void
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
            props.addPost()
        props.updateNewPostText('')
    }


    const onChangePost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onChangePost} value={props.newPostText}></textarea>
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
import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyPostsCSS.module.css'
import {Post} from './Post/Post';
import {PostsType} from '../../../redux/state';

type MyPostsPropsType = {
    addPost: () => void
    updateNewPostText: (newPostText: string) => void
    posts: PostsType[]
    newPostText: string
}

export const MyPosts = (props: MyPostsPropsType) => {

    const postDataMap = props.posts.map(p =>
        <Post id={p.id} postText={p.postText} likesCount={p.likesCount}/>
    )

    const onAddPost = () => {
        props.addPost()
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newPostText = e.currentTarget.value
        props.updateNewPostText(newPostText)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            props.addPost()
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
                        onChange={onPostChange}
                        onKeyDown={onKeyDownHandler}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postDataMap}
            </div>
        </div>
    )
}
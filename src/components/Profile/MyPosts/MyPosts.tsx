import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyPostsCSS.module.css'
import {Post} from './Post/Post';
import {InitialProfileReducerStateType} from '../../../redux/profile-reducer';

type MyPostsPropsType = {
    addPost: () => void
    updateNewPostText: (newPostText: string) => void
    profilePage: InitialProfileReducerStateType
}

export const MyPosts = (props: MyPostsPropsType) => {

    const postDataMap = props.profilePage.posts.map(p =>
        <Post key={p.id} id={p.id} postText={p.postText} likesCount={p.likesCount}/>
    )

    const onAddPost = () => {
        if (props.profilePage.newPostText.trim() !== '')
        props.addPost()
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newPostText = e.currentTarget.value
        props.updateNewPostText(newPostText)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            onAddPost()
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        placeholder={'Enter post text'}
                        value={props.profilePage.newPostText}
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
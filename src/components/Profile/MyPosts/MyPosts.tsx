import React from 'react';
import s from './MyPostsCSS.module.css'
import {Post} from './Post/Post';
import {ProfileStateType} from '../Profile';


export const MyPosts = (props: ProfileStateType) => {

    const postDataMap = props.posts.map(p =>
        <Post id={p.id} message={p.message} likesCount={p.likesCount}/>
    )

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
            let text = newPostElement.current?.value
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
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
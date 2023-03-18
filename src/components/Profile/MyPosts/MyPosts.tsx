import React from 'react';
import s from './MyPostsCSS.module.css'
import {Post} from './Post/Post';
import {ProfilePropsType} from '../Profile';


export const MyPosts = (props: ProfilePropsType) => {



    let postDataMap = props.posts.map(p =>
        <Post id={p.id} message={p.message} likesCount={p.likesCount}/>
    )

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postDataMap}
            </div>
        </div>
    )
}
import React from 'react';
import s from './MyPostsCSS.module.css'
import {Post} from './Post/Post';

export const MyPosts = () => {

    let posts = [
        {id: 1, message: 'Hi, how are you?', likesCount: 23},
        {id: 2, message: "It's my first post!", likesCount: 100},
    ]

    let postDataMap = posts.map(p=>
        <Post message={p.message} likesCount={p.likesCount}/>
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
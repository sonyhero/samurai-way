import React from "react";
import s from './MyPostsCSS.module.css'
import {Post} from "./Post/Post";

export const MyPosts = () => {
    return (

        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                <Post message='Hi, how are you?' likesCount={23}/>
                <Post message="It's my first post!" likesCount={100}/>
            </div>
        </div>

    )
}
import React from "react";
import s from './MyPostsCSS.module.css'
import {Post} from "./Post/Post";

export const MyPosts = () => {
    return (

        <div>
            My posts
            <div>
                <textarea ></textarea>
                <button>Add post</button>
            </div>
            <div className={s.posts}>
                <Post message='Hi, how are you?' likesCount={23}/>
                <Post message="It's my first post!" likesCount={100}/>
            </div>
        </div>

    )
}
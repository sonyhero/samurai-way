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
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>

    )
}
import React from "react";
import s from './MyPostsCSS.module.css'

export const MyPosts = () => {
    return (

        <div>
            my posts
            <div>
                new post
            </div>
            <div className='posts'>
                <div className={s.item}>post 1</div>
                <div className={s.item}>post 2</div>
            </div>
        </div>

    )
}
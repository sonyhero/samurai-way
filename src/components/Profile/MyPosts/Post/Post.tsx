import React from "react";
import s from './PostCSS.module.css'

type PostType = {
    message: string
    likes: number
}

export const Post = (props: PostType) => {
    return (
        <div className={s.item}>
            <img src="https://i.pinimg.com/736x/11/f7/83/11f78374741b89e4dea99e0b6356ee3c.jpg" alt="itachi logo"/>
            {props.message}
            <div>
                <span> {props.likes} likes</span>
            </div>
        </div>
    )
}
import React from 'react';
import s from './PostCSS.module.css'

type PostsType = {
    id: number
    postText: string
    likesCount: number
}
export const Post = (props: PostsType) => {
    return (
        <div key={props.id} className={s.item}>
            <img src="https://i.pinimg.com/736x/11/f7/83/11f78374741b89e4dea99e0b6356ee3c.jpg" alt="itachi logo"/>
            {props.postText}
            <div>
                <span> {props.likesCount} likes</span>
            </div>
        </div>
    )
}
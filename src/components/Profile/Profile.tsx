import React from "react";
import s from './ProfileCSS.module.css'
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
    return (
        <div className={s.content}>
            <div>
                <img
                    src="https://cdn.wallpapersafari.com/66/25/slYcCE.jpg"
                    alt="itachi content" width='1200px' height='200px'/>
            </div>
            <div>
                ava+dicr
            </div>
            <MyPosts/>
        </div>
    )
}
import React from "react";
import s from './ProfileCSS.module.css'

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
        </div>
    )
}
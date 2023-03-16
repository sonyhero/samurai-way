import React from 'react';
import s from './ProfileInfoCSS.module.css'

export const ProfileInfo = () => {
    return (
        <div >
            <div>
                <img
                    src="https://cdn.wallpapersafari.com/66/25/slYcCE.jpg"
                    alt="itachi content" width="600px" height="200px"/>
            </div>
            <div className={s.descriptionBlock}>
                ava+description
            </div>
        </div>
    )
}
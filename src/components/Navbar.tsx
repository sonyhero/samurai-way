import React from "react";
import s from './NavbarCSS.module.css'

export const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className ={s.item }>
                <a >Profile</a>
            </div>
            <div className ={`${s.item} ${s.active}`}>
                <a >Messages</a>
            </div>
            <div className ={`${s.item} ${s.active}`}>
                <a >News</a>
            </div>
            <div className ={`${s.item} ${s.active}`}>
                <a >Music</a>
            </div>
            <div className ={`${s.item} ${s.active}`}>
                <a >Settings</a>
            </div>
        </nav>
    )
}
import React from "react";
import s from './HeaderCSS.module.css'

export const Header = () => {
    return (
        <header className={s.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLxOuoX74j_i0OvkPIIwhN6uVhK4KXc9JPjQ&usqp=CAU"
                alt="itachi logo"/>
        </header>
    )
}
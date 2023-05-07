import React from 'react';
import preloader from "../../../assets/img/preloader.svg";
import s from "../../Users/UsersCSS.module.css";

export const Preloader = () => {
    return (
        <img src={preloader} alt={"loading"} className={s.preloader}/>
    )
}
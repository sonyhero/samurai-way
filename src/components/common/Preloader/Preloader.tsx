import React from 'react'
import preloader from '../../../assets/img/preloader.svg'
import s from './PreloaderCSS.module.css'

export const Preloader = () => {
  return (
    <div className={s.preloaderContainer}>
      <img src={preloader} alt={'loading'} />
    </div>
  )
}

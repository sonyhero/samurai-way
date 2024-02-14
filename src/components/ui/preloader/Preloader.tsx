import React from 'react'
import preloader from '../../../assets/img/preloader.svg'
import s from './Preloader.module.scss'

export const Preloader = () => {
  return (
    <div className={s.preloaderContainer}>
      <img className={s.image} src={preloader} alt={'loading'} />
    </div>
  )
}

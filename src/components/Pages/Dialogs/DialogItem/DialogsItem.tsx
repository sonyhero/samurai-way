import React from 'react'
import s from '../DialogsCSS.module.css'
import { NavLink } from 'react-router-dom'

export const DialogItem = (props: DialogItemType) => {
  let path = '/dialogs/' + props.id
  return (
    <div className={s.dialog}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  )
}

//Types
type DialogItemType = {
  id: number
  name: string
}

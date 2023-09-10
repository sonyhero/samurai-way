import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './DialogsItem.module.scss'

export const DialogItem = (props: DialogItemType) => {
  let path = '/dialogs/' + props.id
  return (
    <div className={s.item}>
      <NavLink to={path} activeClassName={s.activeLink}>
        {props.name}
      </NavLink>
    </div>
  )
}

//Types
type DialogItemType = {
  id: number
  name: string
}

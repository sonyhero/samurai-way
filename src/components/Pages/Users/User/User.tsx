import React from 'react'
import s from './UserCSS.module.css'
import userPhoto from '../../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../user-reducer/users-reducer'
import { Button } from '../../../common/Button/Button'

export const User: React.FC<UserPropsType> = (props) => {
  const { user, followingInProgress, followUsers, unFollowUsers } = props

  const changeFollow = (userId: number) => followUsers(userId)
  const changeUnFollow = (userId: number) => unFollowUsers(userId)

  return (
    <div>
      <span>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img
              src={user.photos.small !== null ? user.photos.small : userPhoto}
              alt={'avatar'}
              className={s.usersPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <Button
              name={'Unfollow'}
              xType={'red'}
              disabled={followingInProgress.some((id) => id === user.id)}
              callback={() => changeUnFollow(user.id)}
            />
          ) : (
            <Button
              name={'Follow'}
              disabled={followingInProgress.some((id) => id === user.id)}
              callback={() => changeFollow(user.id)}
            />
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{'el.location.country'}</div>
          <div>{'el.location.city'}</div>
        </span>
      </span>
    </div>
  )
}

//Types
type UserPropsType = {
  user: UserType
  followingInProgress: number[]
  followUsers: (userId: number) => void
  unFollowUsers: (userId: number) => void
}

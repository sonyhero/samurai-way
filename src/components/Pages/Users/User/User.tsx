import React from 'react'
import s from './User.module.scss'
import userPhoto from '../../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../user-reducer/users-reducer'
import { Button } from '../../../ui/button'

export const User: React.FC<UserPropsType> = (props) => {
  const { user, followingInProgress, followUsers, unFollowUsers } = props

  const changeFollow = (userId: number) => followUsers(userId)
  const changeUnFollow = (userId: number) => unFollowUsers(userId)

  return (
    <div className={s.userBlock}>
      <div className={s.linkBlock}>
        <NavLink to={`/profile/${user.id}`}>
          <img
            src={user.photos.small !== null ? user.photos.small : userPhoto}
            alt={'avatar'}
            className={s.usersPhoto}
          />
        </NavLink>
      </div>

      {user.followed ? (
        <Button
          variant={'secondary'}
          disabled={followingInProgress.some((id) => id === user.id)}
          onClick={() => changeUnFollow(user.id)}
        >
          Unfollow
        </Button>
      ) : (
        <Button disabled={followingInProgress.some((id) => id === user.id)} onClick={() => changeFollow(user.id)}>
          Follow
        </Button>
      )}

      <div className={s.userDescription}>
        <div>{user.name}</div>
        <div>{user.status}</div>
        {/*<div>{user.location.country}</div>*/}
        {/*<div>{user.location.city}</div>*/}
      </div>
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

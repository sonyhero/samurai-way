import React from 'react'
import s from './User.module.scss'
import userPhoto from '../../../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../model/users-reducer'
import { Button } from '../../../../ui/button'
import { useAppSelector } from '../../../../../app/store'
import { getFollowingInProgress } from '../../../../../app/model/selectors/users-selector'

export const User: React.FC<UserPropsType> = (props) => {
  const { user, followUsers, unFollowUsers } = props

  const followingInProgress = useAppSelector(getFollowingInProgress)

  const changeFollow = () => followUsers(user.id)
  const changeUnFollow = () => unFollowUsers(user.id)

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
          onClick={changeUnFollow}
        >
          Unfollow
        </Button>
      ) : (
        <Button disabled={followingInProgress.some((id) => id === user.id)} onClick={changeFollow}>
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
  followUsers: (userId: number) => void
  unFollowUsers: (userId: number) => void
}

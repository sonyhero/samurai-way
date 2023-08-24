import React from 'react'
import { UsersAPIComponentType } from './UsersContainer'
import { Pagination } from '../common/Pagination/Pagination'
import { User } from './User/User'

export const Users: React.FC<UsersPropsType> = (props) => {
  const {
    totalUsersCount,
    pageSize,
    currentPage,
    users,
    followingInProgress,
    onPageChanged,
    followUsers,
    unFollowUsers,
  } = props

  const mappedUsers = users.map((u) => (
    <User
      key={u.id}
      user={u}
      followUsers={followUsers}
      unFollowUsers={unFollowUsers}
      followingInProgress={followingInProgress}
    />
  ))

  return (
    <div>
      <Pagination
        pageSize={pageSize}
        totalItemsCount={totalUsersCount}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        portionSize={10}
      />
      {mappedUsers}
    </div>
  )
}

//Types
type UsersProps = {
  onPageChanged: (pageNumber: number) => void
}
type UsersPropsType = UsersProps & UsersAPIComponentType

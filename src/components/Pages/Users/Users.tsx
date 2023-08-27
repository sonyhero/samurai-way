import React from 'react'
import { UsersAPIComponentType } from './UsersContainer'
import { User } from './User/User'
import { Pagination } from '../../ui/pagination'

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

  const pagesCount = Math.ceil(totalUsersCount / pageSize)

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
      {/*<Pagination*/}
      {/*  pageSize={pageSize}*/}
      {/*  totalItemsCount={totalUsersCount}*/}
      {/*  currentPage={currentPage}*/}
      {/*  onPageChanged={onPageChanged}*/}
      {/*  portionSize={10}*/}
      {/*/>*/}
      <Pagination count={pagesCount} page={currentPage} onChange={onPageChanged} />
      {mappedUsers}
    </div>
  )
}

//Types
type UsersProps = {
  onPageChanged: (pageNumber: number) => void
}
type UsersPropsType = UsersProps & UsersAPIComponentType

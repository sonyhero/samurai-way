import React from 'react'
import { UsersAPIComponentType } from './UsersContainer'
import { User } from './User/User'
import { Pagination } from '../../ui/pagination'
import { Typography } from '../../ui/typography'
import { SuperSelect } from '../../ui/select'
import s from './Users.module.scss'

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
    options,
    onSetPerPage,
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
      <div className={s.pagination}>
        <Pagination count={pagesCount} page={currentPage} onChange={onPageChanged} />
        <Typography variant={'body2'}>Показать</Typography>
        <SuperSelect
          options={options}
          // value={`${pageSize}`}
          defaultValue={pageSize}
          onValueChange={onSetPerPage}
          classname={s.selectPagination}
        />
        <Typography variant={'body2'}>На странице</Typography>
      </div>

      {mappedUsers}
    </div>
  )
}

//Types
type UsersProps = {
  onPageChanged: (pageNumber: number) => void
  onSetPerPage: (value: number) => void
}
type UsersPropsType = UsersProps & UsersAPIComponentType

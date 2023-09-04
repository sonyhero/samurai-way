import React, { FormEvent, useCallback } from 'react'
import { UsersAPIComponentType } from './UsersContainer'
import { User } from './User/User'
import { Pagination } from '../../ui/pagination'
import { Typography } from '../../ui/typography'
import { SuperSelect } from '../../ui/select'
import s from './Users.module.scss'
import { UserSearchForm } from './UserSearchForm/UserSearchForm'
import { useAppDispatch } from '../../../app/store'
import { requestUsers, SearchFilterType } from './user-reducer/users-reducer'
import { Button } from '../../ui/button'

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

  const dispatch = useAppDispatch()

  const pagesCount = Math.ceil(totalUsersCount / pageSize)

  const onFilterChange = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      const data = Object.fromEntries(new FormData(event.currentTarget)) as SearchFilterType
      dispatch(requestUsers(1, pageSize, data))
      event.preventDefault()
    },
    [pageSize],
  )
  const reset = () => {
    dispatch(requestUsers(1, pageSize, { term: '' }))
  }

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
    <div className={s.usersPageBlock}>
      <UserSearchForm onFilterChange={onFilterChange} />
      <Button onClick={reset}> Reset filter</Button>
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
      <div className={s.usersBlock}>{mappedUsers}</div>
    </div>
  )
}

//Types
type UsersProps = {
  onPageChanged: (pageNumber: number) => void
  onSetPerPage: (value: number) => void
}
type UsersPropsType = UsersProps & UsersAPIComponentType

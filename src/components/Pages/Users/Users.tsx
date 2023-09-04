import React, { FormEvent, useCallback, useEffect } from 'react'
import { User } from './User/User'
import { Pagination } from '../../ui/pagination'
import { Typography } from '../../ui/typography'
import { SuperSelect } from '../../ui/select'
import s from './Users.module.scss'
import { UserSearchForm } from './UserSearchForm/UserSearchForm'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { followUsers, requestUsers, SearchFilterType, unFollowUsers, userActions } from './user-reducer/users-reducer'
import { Button } from '../../ui/button'
import {
  getCurrentPage,
  getOptions,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../../app/selectors/users-selector'

export const Users = () => {
  const totalUsersCount = useAppSelector(getTotalUsersCount)
  const pageSize = useAppSelector(getPageSize)
  const currentPage = useAppSelector(getCurrentPage)
  const options = useAppSelector(getOptions)
  const users = useAppSelector(getUsers)
  const filter = useAppSelector(getUsersFilter)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter))
  }, [])

  const follow = (userId: number) => dispatch(followUsers(userId))

  const unFollow = (userId: number) => dispatch(unFollowUsers(userId))

  const pagesCount = Math.ceil(totalUsersCount / pageSize)

  const onFilterChange = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      const data = Object.fromEntries(new FormData(event.currentTarget)) as SearchFilterType
      dispatch(requestUsers(1, pageSize, data))
      event.preventDefault()
    },
    [pageSize],
  )
  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }
  const onSetPerPage = (value: number) => {
    dispatch(userActions.setPerPage(value))
    dispatch(requestUsers(currentPage, value, filter))
  }
  const reset = () => {
    dispatch(requestUsers(1, pageSize, { term: '' }))
  }

  const mappedUsers = users.map((u) => <User key={u.id} user={u} followUsers={follow} unFollowUsers={unFollow} />)

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

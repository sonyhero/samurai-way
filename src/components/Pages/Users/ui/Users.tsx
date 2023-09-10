import React, { useEffect } from 'react'
import { User } from './User/User'
import { Pagination } from '../../../ui/pagination'
import { Typography } from '../../../ui/typography'
import { SuperSelect } from '../../../ui/select'
import s from './Users.module.scss'
import { UserSearchForm } from './UserSearchForm/UserSearchForm'
import { useAppDispatch } from '../../../../app/store'
import { requestUsers } from '../model/users-reducer'
import { searchStringToObject } from 'use-query-params'
import { withAuthRedirect } from '../../../../hoc/withAuthRedirect'
import { useUsers } from './hooks/useUsers'

const Users = () => {
  const dispatch = useAppDispatch()
  const {
    users,
    follow,
    unFollow,
    pagesCount,
    onFilterChange,
    onPageChanged,
    onSetPerPage,
    options,
    history,
    setQuery,
    currentPage,
    filter,
    pageSize,
  } = useUsers()

  useEffect(() => {
    const parsed = searchStringToObject(history.location.search)

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = Number(parsed.page)
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

    switch (parsed.friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null }
        break
      case 'true':
        actualFilter = { ...actualFilter, friend: true }
        break
      case 'false':
        actualFilter = { ...actualFilter, friend: false }
        break
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    if (!!filter.term) {
      setQuery({ term: filter.term })
    }
    if (!filter.friend) {
      setQuery({ friend: String(filter.friend) })
    }
    if (currentPage) {
      setQuery({ page: String(currentPage) })
    }
  }, [filter, currentPage])

  const mappedUsers = users.map((u) => <User key={u.id} user={u} followUsers={follow} unFollowUsers={unFollow} />)

  return (
    <div className={s.usersPageBlock}>
      <UserSearchForm onFilterChange={onFilterChange} />
      <div className={s.pagination}>
        <Pagination count={pagesCount} page={currentPage} onChange={onPageChanged} />
        <Typography variant={'body2'}>Показать</Typography>
        <SuperSelect options={options} onValueChange={onSetPerPage} classname={s.selectPagination} />
        <Typography variant={'body2'}>На странице</Typography>
      </div>
      <div className={s.usersBlock}>{mappedUsers}</div>
    </div>
  )
}

export default withAuthRedirect(Users)

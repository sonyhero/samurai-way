import React, { useCallback, useEffect } from 'react'
import { User } from './User/User'
import { Pagination } from '../../../ui/pagination'
import { Typography } from '../../../ui/typography'
import { SuperSelect } from '../../../ui/select'
import s from './Users.module.scss'
import { UserSearchForm } from './UserSearchForm/UserSearchForm'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { followUsers, requestUsers, SearchFilterType, unFollowUsers, userActions } from '../model/users-reducer'
import {
  getCurrentPage,
  getOptions,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../../../app/model/selectors/users-selector'
import { searchStringToObject, StringParam, useQueryParams } from 'use-query-params'
import { useHistory } from 'react-router-dom'
import { withAuthRedirect } from '../../../../hoc/withAuthRedirect'

const Users = () => {
  const totalUsersCount = useAppSelector(getTotalUsersCount)
  const pageSize = useAppSelector(getPageSize)
  const currentPage = useAppSelector(getCurrentPage)
  const options = useAppSelector(getOptions)
  const users = useAppSelector(getUsers)
  const filter = useAppSelector(getUsersFilter)
  const dispatch = useAppDispatch()

  const history = useHistory()

  const [_, setQuery] = useQueryParams({
    page: StringParam,
    term: StringParam,
    friend: StringParam,
  })

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

  const follow = (userId: number) => dispatch(followUsers(userId))

  const unFollow = (userId: number) => dispatch(unFollowUsers(userId))

  const pagesCount = Math.ceil(totalUsersCount / pageSize)

  const onFilterChange = useCallback(
    (filter: SearchFilterType) => {
      dispatch(requestUsers(1, pageSize, filter))
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

  const mappedUsers = users.map((u) => <User key={u.id} user={u} followUsers={follow} unFollowUsers={unFollow} />)

  return (
    <div className={s.usersPageBlock}>
      <UserSearchForm onFilterChange={onFilterChange} />
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

export default withAuthRedirect(Users)

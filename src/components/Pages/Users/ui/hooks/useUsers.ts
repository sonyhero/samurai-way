import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import {
  getCurrentPage,
  getOptions,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../../../../app/model/selectors/users-selector'
import { useHistory } from 'react-router-dom'
import { StringParam, useQueryParams } from 'use-query-params'
import { followUsers, requestUsers, SearchFilterType, unFollowUsers, userActions } from '../../model/users-reducer'
import { useCallback } from 'react'

export const useUsers = () => {
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

  return {
    users,
    follow,
    unFollow,
    pagesCount,
    onFilterChange,
    onPageChanged,
    onSetPerPage,
    history,
    setQuery,
    options,
    currentPage,
    filter,
    pageSize,
  }
}

import React, { ComponentType } from 'react'
import { RootReducerType } from '../../../app/store'
import { connect } from 'react-redux'
import { followUsers, requestUsers, unFollowUsers, userActions, UserType } from './user-reducer/users-reducer'
import { Users } from './Users'
import { Preloader } from '../../common/Preloader/Preloader'
import { compose } from 'redux'
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getOptions,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from '../../../app/selectors/users-selector'
import { getIsAuth } from '../../../app/selectors/auth-selector'
import { Redirect } from 'react-router-dom'

const {
  follow,
  unFollow,
  setUsers,
  setCurrentPage,
  setUsersTotalCount,
  toggleIsFetching,
  toggleFollowingProgress,
  setPerPage,
} = userActions

export class UsersAPIComponent extends React.Component<UsersAPIComponentType> {
  componentDidMount() {
    const { currentPage, pageSize } = this.props
    this.props.requestUsers(currentPage, pageSize)
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props
    this.props.requestUsers(pageNumber, pageSize)
  }

  onSetPerPage = (value: number) => {
    const { currentPage } = this.props
    this.props.setPerPage(value)
    this.props.requestUsers(currentPage, value)
  }

  render() {
    if (!this.props.isAuth) return <Redirect to={'/login'} />
    // return this.props.isFetching ? (
    //   <Preloader />
    // ) : (
    return <Users {...this.props} onPageChanged={this.onPageChanged} onSetPerPage={this.onSetPerPage} />
    // )
  }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
  return {
    isAuth: getIsAuth(state),
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    options: getOptions(state),
  }
}

export default compose<ComponentType>(
  connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setUsersTotalCount,
    toggleIsFetching,
    toggleFollowingProgress,
    requestUsers,
    followUsers,
    unFollowUsers,
    setPerPage,
  }),
)(UsersAPIComponent)
//Types
type MapDispatchToPropsType = {
  follow: (userId: number) => void
  unFollow: (userId: number) => void
  setUsers: (users: UserType[]) => void
  setCurrentPage: (currentPage: number) => void
  setUsersTotalCount: (totalUsersCount: number) => void
  toggleIsFetching: (isFetching: boolean) => void
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void
  requestUsers: (currentPage: number, pageSize: number) => void
  followUsers: (userId: number) => void
  unFollowUsers: (userId: number) => void
  setPerPage: (value: number) => void
}
type MapStateToPropsType = {
  isAuth: boolean
  users: UserType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: number[]
  options: { value: number }[]
}
export type UsersAPIComponentType = MapStateToPropsType & MapDispatchToPropsType

import { RootReducerType } from '../store'

export const getUsers = (state: RootReducerType) => state.usersReducer.users
export const getPageSize = (state: RootReducerType) => state.usersReducer.pageSize
export const getTotalUsersCount = (state: RootReducerType) => state.usersReducer.totalUsersCount
export const getCurrentPage = (state: RootReducerType) => state.usersReducer.currentPage
export const getIsFetching = (state: RootReducerType) => state.usersReducer.isFetching
export const getFollowingInProgress = (state: RootReducerType) => state.usersReducer.followingInProgress
export const getOptions = (state: RootReducerType) => state.usersReducer.paginationOptions

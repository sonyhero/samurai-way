import { ResponseAppType, ResultCodesEnum } from '../../../../api/api'
import { Dispatch } from 'redux'
import { AppThunk, InferActionsTypes } from '../../../../app/store'
import { usersAPI } from '../../../../api/users-api'
import NProgress from 'nprogress'
import { handleServerAppError, handleServerNetworkError } from '../../../../utils/error-utils'

const initialState: InitialUsersReducerStateType = {
  users: [],
  totalUsersCount: 0,
  isFetching: false,
  followingInProgress: [],
  paginationOptions: [{ value: 5 }, { value: 10 }, { value: 20 }, { value: 50 }, { value: 100 }],
  pageSize: 5,
  currentPage: 1,
}

export const usersReducer = (
  state: InitialUsersReducerStateType = initialState,
  action: UsersReducerType,
): InitialUsersReducerStateType => {
  switch (action.type) {
    case 'USERS/FOLLOW':
      return {
        ...state,
        users: state.users.map((el) => (el.id === action.userId ? { ...el, followed: true } : el)),
      }
    case 'USERS/UNFOLLOW':
      return {
        ...state,
        users: state.users.map((el) => (el.id === action.userId ? { ...el, followed: false } : el)),
      }
    case 'USERS/SET_USERS':
      return {
        ...state,
        users: action.users,
      }
    case 'USERS/SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case 'USERS/SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }
    case 'USERS/TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      }
    case 'SET_PER_PAGE':
      return {
        ...state,
        pageSize: action.value,
      }
    default:
      return state
  }
}
//Actions
export const userActions = {
  follow: (userId: number) => ({ type: 'USERS/FOLLOW', userId }) as const,
  unFollow: (userId: number) => ({ type: 'USERS/UNFOLLOW', userId }) as const,
  setUsers: (users: UserType[]) => ({ type: 'USERS/SET_USERS', users }) as const,
  setCurrentPage: (currentPage: number) => ({ type: 'USERS/SET_CURRENT_PAGE', currentPage }) as const,
  setUsersTotalCount: (totalUsersCount: number) => ({ type: 'USERS/SET_TOTAL_USERS_COUNT', totalUsersCount }) as const,
  toggleIsFetching: (isFetching: boolean) => ({ type: 'USERS/TOGGLE_IS_FETCHING', isFetching }) as const,
  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId,
    }) as const,
  setPerPage: (value: number) => ({ type: 'SET_PER_PAGE', value }) as const,
}

//Thunks
export const requestUsers = (page: number, pageSize: number) => (dispatch: Dispatch) => {
  try {
    NProgress.start()
    dispatch(userActions.toggleIsFetching(true))
    dispatch(userActions.setCurrentPage(page))
    usersAPI.getUsers(page, pageSize).then((data) => {
      dispatch(userActions.toggleIsFetching(false))
      dispatch(userActions.setUsers(data.items))
      dispatch(userActions.setUsersTotalCount(data.totalCount))
      NProgress.done()
    })
  } catch (e) {
    handleServerNetworkError(e)
  }
}

//Рефакторинг выпуск 90
const followUnfollowUsers = async (
  dispatch: Dispatch,
  userId: number,
  actionCreator: (userId: number) => UsersReducerType,
  apiMethod: (userId: number) => Promise<ResponseAppType>,
) => {
  try {
    NProgress.start()
    dispatch(userActions.toggleFollowingProgress(true, userId))
    const data = await apiMethod(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actionCreator(userId))
      NProgress.done()
    } else {
      handleServerAppError(data)
    }
  } catch (e) {
    handleServerNetworkError(e)
  } finally {
    dispatch(userActions.toggleFollowingProgress(false, userId))
  }
}

export const followUsers =
  (userId: number): AppThunk =>
  async (dispatch) => {
    await followUnfollowUsers(dispatch, userId, userActions.follow, usersAPI.followUsers.bind(usersAPI))
  }
export const unFollowUsers =
  (userId: number): AppThunk =>
  async (dispatch) => {
    await followUnfollowUsers(dispatch, userId, userActions.unFollow, usersAPI.unFollowUsers.bind(usersAPI))
  }
//Types
export type UserType = {
  id: number
  photos: PhotosType
  followed: boolean
  name: string
  status: string
  location: LocationType
}
type LocationType = {
  city: string
  country: string
}
type PhotosType = {
  small: any
  large: any
}
export type InitialUsersReducerStateType = {
  users: UserType[]
  totalUsersCount: number
  isFetching: boolean
  followingInProgress: number[]
  paginationOptions: { value: number }[]
  pageSize: number
  currentPage: number
}
export type UsersReducerType = InferActionsTypes<typeof userActions>

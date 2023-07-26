import {ResponseType, ResultCodesEnum} from '../../../api/api';
import {Dispatch} from 'redux';
import {InferActionsTypes} from '../../../app/store';
import {usersAPI} from '../../../api/users-api';

const initialState: InitialUsersReducerStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export const usersReducer = (state: InitialUsersReducerStateType = initialState, action: UsersReducerType):
    InitialUsersReducerStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW':
            return {
                ...state,
                users: state.users.map(el => el.id === action.userId
                    ? {...el, followed: true}
                    : el
                )
            }
        case 'USERS/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(el => el.id === action.userId
                    ? {...el, followed: false}
                    : el
                )
            }
        case 'USERS/SET_USERS':
            return {
                ...state, users: action.users
            }
        case 'USERS/SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }
        case 'USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.totalUsersCount
            }
        case 'USERS/TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching
            }
        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}
//Actions
export const userActions = {
    follow: (userId: number) => ({type: 'USERS/FOLLOW', userId} as const),
    unFollow: (userId: number) => ({type: 'USERS/UNFOLLOW', userId} as const),
    setUsers: (users: UserType[]) => ({type: 'USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', currentPage} as const),
    setUsersTotalCount: (totalUsersCount: number) => ({type: 'USERS/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}

//Thunks
export const requestUsers = (page: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(userActions.toggleIsFetching(true))
    dispatch(userActions.setCurrentPage(page))
    usersAPI.getUsers(page, pageSize).then(data => {
        dispatch(userActions.toggleIsFetching(false))
        dispatch(userActions.setUsers(data.items))
        dispatch(userActions.setUsersTotalCount(data.totalCount))
    })
}

//Рефакторинг выпуск 90
const followUnfollowUsers = async (
    dispatch: Dispatch,
    userId: number,
    actionCreator: (userId: number) => UsersReducerType,
    apiMethod: (userId: number) => Promise<ResponseType>) => {
    try {
        dispatch(userActions.toggleFollowingProgress(true, userId))
        const data = await apiMethod(userId)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actionCreator(userId))
        }
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(userActions.toggleFollowingProgress(false, userId))
    }
}

export const followUsers = (userId: number) => async (dispatch: Dispatch) => {
    await followUnfollowUsers(dispatch, userId, userActions.follow, usersAPI.followUsers.bind(usersAPI))
}
export const unFollowUsers = (userId: number) => async (dispatch: Dispatch) => {
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
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
// export type UsersReducerType =
//     | ReturnType<typeof follow>
//     | ReturnType<typeof unFollow>
//     | ReturnType<typeof setUsers>
//     | ReturnType<typeof setCurrentPage>
//     | ReturnType<typeof setUsersTotalCount>
//     | ReturnType<typeof toggleIsFetching>
//     | ReturnType<typeof toggleFollowingProgress>

export type UsersReducerType = InferActionsTypes<typeof userActions>
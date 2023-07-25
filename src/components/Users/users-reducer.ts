import {ResponseType, usersAPI} from '../../api/api';
import {Dispatch} from 'redux';

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
                users: state.users.map(el => el.id === action.payload.userId
                    ? {...el, followed: true}
                    : el
                )
            }
        case 'USERS/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload.userId
                    ? {...el, followed: false}
                    : el
                )
            }
        case 'USERS/SET_USERS':
            return {
                ...state, users: action.payload.users
            }
        case 'USERS/SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.payload.currentPage
            }
        case 'USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.payload.totalUsersCount
            }
        case 'USERS/TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.payload.isFetching
            }
        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id !== action.payload.userId)
            }
        default:
            return state
    }
}
//Actions
export const follow = (userId: number) => {
    return {
        type: 'USERS/FOLLOW',
        payload: {
            userId
        }
    } as const
}
export const unFollow = (userId: number) => {
    return {
        type: 'USERS/UNFOLLOW',
        payload: {
            userId
        }
    } as const
}
export const setUsers = (users: UserType[]) => {
    return {
        type: 'USERS/SET_USERS',
        payload: {
            users
        }
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'USERS/SET_CURRENT_PAGE',
        payload: {
            currentPage
        }
    } as const
}
export const setUsersTotalCount = (totalUsersCount: number) => {
    return {
        type: 'USERS/SET_TOTAL_USERS_COUNT',
        payload: {
            totalUsersCount
        }
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'USERS/TOGGLE_IS_FETCHING',
        payload: {
            isFetching
        }
    } as const
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        payload: {
            isFetching,
            userId
        }
    } as const
}

//Thunks
export const requestUsers = (page: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    usersAPI.getUsers(page, pageSize).then(data => {
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUsersTotalCount(data.totalCount))
    })
}

//Рефакторинг выпуск 90
const followUnfollowUsers = async (
    dispatch: Dispatch,
    userId: number,
    actionCreator: (userId: number) => ReturnType<typeof follow> | ReturnType<typeof unFollow>,
    apiMethod: (userId: number) => Promise<ResponseType>) => {
    try {
        dispatch(toggleFollowingProgress(true, userId))
        const data = await apiMethod(userId)
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const followUsers = (userId: number) => async (dispatch: Dispatch) => {
    await followUnfollowUsers(dispatch, userId, follow, usersAPI.followUsers.bind(usersAPI))
}
export const unFollowUsers = (userId: number) => async (dispatch: Dispatch) => {
    await followUnfollowUsers(dispatch, userId, unFollow, usersAPI.unFollowUsers.bind(usersAPI))
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
export type UsersReducerType =
    | ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>
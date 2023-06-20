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
        case 'FOLLOW':
            return {
                ...state,
                // users: updateObjectInArray(state.users, action.payload.userId, 'id', {followed: true} )
                users: state.users.map(el => el.id === action.payload.userId
                    ? {...el, followed: true}
                    : el
                )
            }
        case 'UNFOLLOW':
            return {
                ...state,
                // users: updateObjectInArray(state.users, action.payload.userId, 'id', {followed: false} )
                users: state.users.map(el => el.id === action.payload.userId
                    ? {...el, followed: false}
                    : el
                )
            }
        case 'SET_USERS':
            return {
                ...state, users: action.payload.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.payload.currentPage
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.payload.totalUsersCount
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.payload.isFetching
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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
        type: 'FOLLOW',
        payload: {
            userId
        }
    } as const
}
export const unFollow = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        payload: {
            userId
        }
    } as const
}
export const setUsers = (users: UsersType[]) => {
    return {
        type: 'SET_USERS',
        payload: {
            users
        }
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: {
            currentPage
        }
    } as const
}
export const setUsersTotalCount = (totalUsersCount: number) => {
    return {
        type: 'SET_TOTAL_USERS_COUNT',
        payload: {
            totalUsersCount
        }
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'TOGGLE_IS_FETCHING',
        payload: {
            isFetching
        }
    } as const
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
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
        // Засетал тотал каунт разделенный на 200 так как очень много данных
        dispatch(setUsersTotalCount(data.totalCount / 200))
    })
}

//Рефакторинг выпуск 90
const followUnfollowUsers = async (
    dispatch: Dispatch,
    userId: number, actionCreator: (userId: number) => ReturnType<typeof follow> | ReturnType<typeof unFollow>,
    apiMethod: (userId: number) => Promise<ResponseType>) => {
    try {
        dispatch(toggleFollowingProgress(true, userId))
        let data = await apiMethod(userId)
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
    // try {
    //     dispatch(toggleFollowingProgress(true, userId))
    //     let data = await usersAPI.followUsers(userId)
    //     if (data.resultCode === 0) {
    //         dispatch(follow(userId))
    //     }
    // } catch (e) {
    //     console.log(e)
    // } finally {
    //     dispatch(toggleFollowingProgress(false, userId))
    // }
}
export const unFollowUsers = (userId: number) => async (dispatch: Dispatch) => {
    await followUnfollowUsers(dispatch, userId, unFollow, usersAPI.unFollowUsers.bind(usersAPI))
    // try {
    //     dispatch(toggleFollowingProgress(true, userId))
    //     let data = await usersAPI.unFollowUsers(userId)
    //     if (data.resultCode === 0) {
    //         dispatch(unFollow(userId))
    //     }
    // } catch (e) {
    //     console.log(e)
    // } finally {
    //     dispatch(toggleFollowingProgress(false, userId))
    // }
}
//Types
export type UsersType = {
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
    users: UsersType[]
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
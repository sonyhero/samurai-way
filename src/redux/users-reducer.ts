import {ActionsTypes} from './redux-store';

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
}
const initialState: InitialUsersReducerStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
}

export const usersReducer = (state: InitialUsersReducerStateType = initialState, action: ActionsTypes):
    InitialUsersReducerStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state, users: state.users.map(el => el.id === action.payload.userId
                    ? {...el, followed: true}
                    : el
                )
            }
        case 'UNFOLLOW':
            return {
                ...state, users: state.users.map(el => el.id === action.payload.userId
                    ? {...el, followed: false}
                    : el
                )
            }
        case 'SET_USERS':
            return {
                // ...state, users: [...state.users, ...action.payload.users]
                ...state, users: action.payload.users
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state, currentPage: action.payload.currentPage
            }
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state, totalUsersCount: action.payload.totalUsersCount
            }
        default:
            return state
    }
}

export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        payload: {
            userId
        }
    } as const
}
export const unFollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        payload: {
            userId
        }
    } as const
}
export const setUsersAC = (users: UsersType[]) => {
    return {
        type: 'SET_USERS',
        payload: {
            users
        }
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: {
            currentPage
        }
    } as const
}
export const setUsersTotalCountAC = (totalUsersCount: number) => {
    return {
        type: 'SET_TOTAL_USERS_COUNT',
        payload: {
            totalUsersCount
        }
    } as const
}
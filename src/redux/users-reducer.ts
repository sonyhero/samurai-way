import {ActionsTypes} from './redux-store';

export type InitialUsersReducerStateType = {
    users: UsersType[]
}
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
const initialState: InitialUsersReducerStateType = {
    users: [
        // {
        //     id: 1, photoUrl: 'https://avatars.githubusercontent.com/u/71019041?v=4', followed: true, fullName: 'Roma', status: 'Team-Leader', location:
        //         {city: 'Minsk', country: ' Belarus'}
        // },
        // {
        //     id: 2, photoUrl: 'https://avatars.githubusercontent.com/u/113249072?v=4', followed: false, fullName: 'Anton', status: 'Pre-Junior', location:
        //         {city: 'Minsk', country: ' Belarus'}
        // },
        // {
        //     id: 3, photoUrl: 'https://avatars.githubusercontent.com/u/125352324?v=4', followed: true, fullName: 'Egor', status: 'Pre-Junior', location:
        //         {city: 'Yaroslavl', country: 'Russia'}
        // },
        // {
        //     id: 4, photoUrl: 'https://avatars.githubusercontent.com/u/68869871?v=4', followed: false, fullName: 'Artem', status: 'Pre-Junior', location:
        //         {city: 'Baranovichi', country: ' Belarus'}
        // },
    ]
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
                ...state, users: [...state.users, ...action.payload.users]
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

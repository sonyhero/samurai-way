import {ActionsTypes} from './redux-store';

export type InitialUsersReducerStateType = {
    users: UsersType[]
}
type UsersType = {
    id: number
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}
type LocationType = {
    city: string
    country: string
}
const initialState: InitialUsersReducerStateType = {
    users: [
        {
            id: 1, followed: true, fullName: 'Roma', status: 'Team-Leader', location:
                {city: 'Minsk', country: ' Belarus'}
        },
        {
            id: 1, followed: false, fullName: 'Anton', status: 'Pre-Junior', location:
                {city: 'Minsk', country: ' Belarus'}
        },
        {
            id: 1, followed: true, fullName: 'Egor', status: 'Pre-Junior', location:
                {city: 'Yaroslavl', country: 'Russia'}
        },
        {
            id: 1, followed: false, fullName: 'Artem', status: 'Pre-Junior', location:
                {city: 'Baranovichi', country: ' Belarus'}
        },
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

export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        payload: {
            userId
        }
    } as const
}
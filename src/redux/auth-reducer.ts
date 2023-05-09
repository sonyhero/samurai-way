import {ActionsTypes} from './redux-store';


export type InitialUsersReducerStateType = {
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
}
const initialState: InitialUsersReducerStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state: InitialUsersReducerStateType = initialState, action: ActionsTypes):
    InitialUsersReducerStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state, ...action.payload.data, isAuth: true}
        default:
            return state
    }
}

export const setAuthUserData = (userId: string, email: string, login: string) => {
    return {
        type: 'SET_USER_DATA',
        payload: {
            data: {
                userId,
                email,
                login
            }
        }
    } as const
}
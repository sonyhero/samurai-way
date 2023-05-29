import {ActionsTypes} from './redux-store';
import {Dispatch} from "redux";
import {authAPI} from "../api/api";


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

export const getAuth = () => async (dispatch: Dispatch) => {
    try {
        let data = await authAPI.getAuth()
        if (data.resultCode === 0) {
            const {id, email, login} = data.data
            dispatch(setAuthUserData(String(id), email, login))
        }
    } catch (e) {
        console.log(e)
    }
}
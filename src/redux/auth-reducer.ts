import {ActionsTypes, AppThunk} from './redux-store';
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
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setAuthUserData = (userId: string | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'SET_USER_DATA',
        payload: {
                userId,
                email,
                login,
                isAuth
        }
    } as const
}

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    try {
        let data = await authAPI.getAuthMe()
        if (data.resultCode === 0) {
            const {id, email, login} = data.data
            dispatch(setAuthUserData(String(id), email, login, true))
        }
    } catch (e) {
        console.log(e)
    }
}
export const login = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    try {
        let data = await authAPI.logIn(email, password, rememberMe)
        if (data.resultCode === 0) {
            await dispatch(getAuthUserData())
        }
    } catch (e) {
        console.log(e)
    }
}
export const logout = (): AppThunk => async (dispatch) => {
    try {
        let data = await authAPI.logOut()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    } catch (e) {
        console.log(e)
    }
}
import {AppThunk} from './redux-store';

import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const initialState: InitialUsersReducerStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state: InitialUsersReducerStateType = initialState, action: AuthReducerType):
    InitialUsersReducerStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state, ...action.payload}
        default:
            return state
    }
}
//Actions
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
//Thunks
export const getAuthUserData = (): AppThunk => async (dispatch) => {
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
        } else {
            let errorMessage = data.messages.length > 0
                ? data.messages[0]
                : 'Some error'
            await dispatch(stopSubmit('login', {_error: errorMessage}))
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
//Types
export type InitialUsersReducerStateType = {
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export type AuthReducerType = ReturnType<typeof setAuthUserData>
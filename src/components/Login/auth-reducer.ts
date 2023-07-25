import {AppThunk} from '../../app/store';

import {authAPI, securityAPI} from '../../api/api';
import {stopSubmit} from 'redux-form';
import {ResultCodeForCapctha, ResultCodesEnum} from '../Users/enums';

const initialState: InitialUsersReducerStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export const authReducer = (state: InitialUsersReducerStateType = initialState, action: AuthReducerType):
    InitialUsersReducerStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
            return {...state, ...action.payload}
        case 'AUTH/GET_CUPTCHA-URL-SUCCESS':
            return {...state, ...action.payload}
        default:
            return state
    }
}
//Actions
export const setAuthUserData = (userId: string | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'AUTH/SET_USER_DATA',
        payload: {
            userId,
            email,
            login,
            isAuth
        }
    } as const
}
export const getCaptchaUrlSuccess = (captchaUrl: string) => {
    return {
        type: 'AUTH/GET_CUPTCHA-URL-SUCCESS',
        payload: {
            captchaUrl
        }
    } as const
}

//Thunks
export const getAuthUserData = (): AppThunk => async (dispatch) => {
    try {
        const data = await authAPI.getAuthMe()
        if (data.resultCode === ResultCodesEnum.Success) {
            const {id, email, login} = data.data
            dispatch(setAuthUserData(String(id), email, login, true))
        }
    } catch (e) {
        console.log(e)
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): AppThunk => async (dispatch) => {
    try {
        const data = await authAPI.logIn(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === ResultCodeForCapctha.CaptchaIsRequired) {
                dispatch(getCaptcha())
            }
            const errorMessage = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: errorMessage}))
        }
    } catch (e) {
        console.log(e)
    }
}
export const logout = (): AppThunk => async (dispatch) => {
    try {
        const data = await authAPI.logOut()
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    } catch (e) {
        console.log(e)
    }
}
export const getCaptcha = (): AppThunk => async (dispatch) => {
    try {
        const data = await securityAPI.getCaptchaUrl()
        const captchaUrl = data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
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
    captchaUrl: string | null
}
export type AuthReducerType =
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof getCaptchaUrlSuccess>
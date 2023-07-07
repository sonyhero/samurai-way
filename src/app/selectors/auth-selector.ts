import {RootReducerType} from '../store';

export const getUserId = (state: RootReducerType) => state.authReducer.userId
export const getEmail = (state: RootReducerType) => state.authReducer.email
export const getLogin = (state: RootReducerType) => state.authReducer.login
export const getIsAuth = (state: RootReducerType) => state.authReducer.isAuth
export const getCaptchaUrl = (state: RootReducerType) => state.authReducer.captchaUrl


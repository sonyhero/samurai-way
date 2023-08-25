import { AppThunk, InferActionsTypes } from '../../../app/store'

import { stopSubmit } from 'redux-form'
import { authAPI } from '../../../api/auth-api'
import { securityAPI } from '../../../api/security-api'
import { ResultCodeForCapctha, ResultCodesEnum } from '../../../api/api'

const initialState: InitialUsersReducerStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
}

export const authReducer = (
  state: InitialUsersReducerStateType = initialState,
  action: AuthReducerType,
): InitialUsersReducerStateType => {
  switch (action.type) {
    case 'AUTH/SET_USER_DATA':
      return { ...state, ...action.payload }
    case 'AUTH/GET_CAPTCHA-URL-SUCCESS':
      return { ...state, captchaUrl: action.captchaUrl }
    default:
      return state
  }
}
//Actions
export const authActions = {
  setAuthUserData: (userId: string | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({
      type: 'AUTH/SET_USER_DATA',
      payload: {
        userId,
        email,
        login,
        isAuth,
      },
    }) as const,
  getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'AUTH/GET_CAPTCHA-URL-SUCCESS', captchaUrl }) as const,
}
//Thunks
export const getAuthUserData = (): AppThunk => async (dispatch) => {
  try {
    const data = await authAPI.getAuthMe()
    if (data.resultCode === ResultCodesEnum.Success) {
      const { id, email, login } = data.data
      dispatch(authActions.setAuthUserData(String(id), email, login, true))
    }
  } catch (e) {
    console.log(e)
  }
}
export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string): AppThunk =>
  async (dispatch) => {
    try {
      const data = await authAPI.logIn(email, password, rememberMe, captcha)
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
      } else {
        if (data.resultCode === ResultCodeForCapctha.CaptchaIsRequired) {
          dispatch(getCaptcha())
        }
        const errorMessage = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: errorMessage }))
      }
    } catch (e) {
      console.log(e)
    }
  }
export const logout = (): AppThunk => async (dispatch) => {
  try {
    const data = await authAPI.logOut()
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(authActions.setAuthUserData(null, null, null, false))
    }
  } catch (e) {
    console.log(e)
  }
}
export const getCaptcha = (): AppThunk => async (dispatch) => {
  try {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(authActions.getCaptchaUrlSuccess(captchaUrl))
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
// export type AuthReducerType =
//     | ReturnType<typeof setAuthUserData>
//     | ReturnType<typeof getCaptchaUrlSuccess>
export type AuthReducerType = InferActionsTypes<typeof authActions>

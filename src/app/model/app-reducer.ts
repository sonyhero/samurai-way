import { AppThunk } from '../store'
import { getAuthUserData } from '../../components/Pages/Login/model/auth-reducer'
import NProgress from 'nprogress'

const initialState: InitialUsersReducerStateType = {
  initialized: false,
}

export const appReducer = (
  state: InitialUsersReducerStateType = initialState,
  action: AppReducerType,
): InitialUsersReducerStateType => {
  switch (action.type) {
    case 'APP/INITIALIZED_SUCCESS':
      return { ...state, initialized: true }
    default:
      return state
  }
}
//Actions
export const initializedSuccess = () => ({ type: 'APP/INITIALIZED_SUCCESS' }) as const
//Thunks
export const initializeApp = (): AppThunk => async (dispatch) => {
  NProgress.start()
  await dispatch(getAuthUserData())
  NProgress.done()
  dispatch(initializedSuccess())
}
//Types
export type InitialUsersReducerStateType = {
  initialized: boolean
}
export type AppReducerType = ReturnType<typeof initializedSuccess>

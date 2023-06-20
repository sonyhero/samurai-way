import {AppThunk} from './store';
import {getAuthUserData} from '../components/Login/auth-reducer';

const initialState: InitialUsersReducerStateType = {
    initialized: false
}

export const appReducer = (state: InitialUsersReducerStateType = initialState, action: AppReducerType):
    InitialUsersReducerStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {...state, initialized: true}
        default:
            return state
    }
}
//Actions
export const initializedSuccess = () => ({type: 'INITIALIZED_SUCCESS'} as const)
//Thunks
export const initializeApp = (): AppThunk => async (dispatch) => {
    await dispatch(getAuthUserData())
    dispatch(initializedSuccess())
}
//Types
export type InitialUsersReducerStateType = {
    initialized: boolean
}
export type AppReducerType = ReturnType<typeof initializedSuccess>
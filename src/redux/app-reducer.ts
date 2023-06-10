import {AppThunk} from './redux-store';
import {getAuthUserData} from './auth-reducer';


export type InitialUsersReducerStateType = {
    initialized: boolean
}
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

export const initializedSuccess = () => ({type: 'INITIALIZED_SUCCESS'} as const)

export const initializeApp = (): AppThunk => async (dispatch) => {
    await dispatch(getAuthUserData())
    dispatch(initializedSuccess())
}

export type AppReducerType = ReturnType<typeof initializedSuccess>
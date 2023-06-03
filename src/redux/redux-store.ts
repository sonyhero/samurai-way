import {applyMiddleware, combineReducers, createStore} from 'redux';
import {addMessage, dialogsReducer} from './dialogs-reducer';
import {addPost, profileReducer, setUserProfile, setUserProfileStatus} from './profile-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {
    follow,
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleFollowingProgress,
    toggleIsFetching,
    unFollow,
    usersReducer
} from './users-reducer';
import {authReducer, setAuthUserData} from './auth-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'

let rootReducer = combineReducers({
        dialogsReducer,
        profileReducer,
        sidebarReducer,
        usersReducer,
        authReducer,
    form: formReducer
    }
)

// Объединение типов actions
export type ActionsTypes =
    ReturnType<typeof addPost>
    | ReturnType<typeof addMessage>
    | ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof toggleFollowingProgress>
    | ReturnType<typeof setUserProfileStatus>

export type RootReducerType = ReturnType<typeof rootReducer>
export type RootStateType = ReturnType<typeof store.getState>
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatch = ThunkDispatch<RootStateType, unknown, ActionsTypes> // для санок
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
    RootStateType,
    unknown,
    ActionsTypes
>

// @ts-ignore
window.store = store

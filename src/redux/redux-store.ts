import {combineReducers, createStore} from 'redux';
import {addMessageAC, dialogsReducer, updateNewMessageTextAC} from './dialogs-reducer';
import {addPostAC, profileReducer, setUserProfile, updateNewPostTextAC} from './profile-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {
    follow,
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleIsFetching,
    unFollow,
    usersReducer
} from './users-reducer';
import {authReducer, setAuthUserData} from './auth-reducer';

let rootReducer = combineReducers({
        dialogsReducer,
        profileReducer,
        sidebarReducer,
        usersReducer,
        authReducer
    }
)

// Объединение типов actions
export type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof updateNewMessageTextAC>
    | ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setAuthUserData>

export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store

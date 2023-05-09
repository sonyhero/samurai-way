import {combineReducers, createStore} from 'redux';
import {addMessage, dialogsReducer, updateNewMessageText} from './dialogs-reducer';
import {addPost, profileReducer, setUserProfile, updateNewPostText} from './profile-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {
    follow,
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleIsFetching, toggleFollowingProgress,
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
    ReturnType<typeof addPost>
    | ReturnType<typeof updateNewPostText>
    | ReturnType<typeof addMessage>
    | ReturnType<typeof updateNewMessageText>
    | ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof toggleFollowingProgress>

export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store

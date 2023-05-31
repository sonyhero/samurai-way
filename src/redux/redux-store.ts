import {applyMiddleware, combineReducers, createStore} from 'redux';
import {addMessage, dialogsReducer, updateNewMessageText} from './dialogs-reducer';
import {addPost, profileReducer, setUserProfile, setUserProfileStatus, updateNewPostText} from './profile-reducer';
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

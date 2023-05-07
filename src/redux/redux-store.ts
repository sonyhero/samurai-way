import {combineReducers, createStore} from "redux";
import {addMessageAC, dialogsReducer, updateNewMessageTextAC} from './dialogs-reducer';
import {addPostAC, profileReducer, updateNewPostTextAC} from './profile-reducer';
import {sidebarReducer} from "./sidebar-reducer";
import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC,
    toggleIsFetchingAC,
    unFollowAC,
    usersReducer
} from './users-reducer';

let rootReducer = combineReducers({
        dialogsReducer,
        profileReducer,
        sidebarReducer,
        usersReducer
    }
)

// Объединение типов actions
export type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof updateNewMessageTextAC>
    | ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC>
    | ReturnType<typeof toggleIsFetchingAC>

export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

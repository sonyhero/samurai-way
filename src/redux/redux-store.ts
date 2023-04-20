import {combineReducers, createStore} from "redux";
import {addMessageAC, dialogsReducer, updateNewMessageTextAC} from './dialogs-reducer';
import {addPostAC, profileReducer, updateNewPostTextAC} from './profile-reducer';
import {sidebarReducer} from "./sidebar-reducer";

let rootReducer = combineReducers({
    dialogsReducer,
    profileReducer,
    sidebarReducer
    }
)

// Объединение типов actions
export type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof updateNewMessageTextAC>

export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

import {combineReducers, createStore} from "redux";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";
import {sidebarReducer} from "./sidebar-reducer";

let rootReducer = combineReducers({
    dialogsReducer,
    profileReducer,
    sidebarReducer
    }
)

export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

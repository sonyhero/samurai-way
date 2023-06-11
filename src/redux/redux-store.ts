import {applyMiddleware, combineReducers, createStore} from 'redux';
import {dialogsReducer, DialogsReducerType} from './dialogs-reducer';
import {profileReducer} from './profile-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {usersReducer, UsersReducerType} from './users-reducer';
import {authReducer, AuthReducerType} from './auth-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {FormAction, reducer as formReducer} from 'redux-form'
import {appReducer, AppReducerType} from './app-reducer';

let rootReducer = combineReducers({
        dialogsReducer,
        profileReducer,
        sidebarReducer,
        usersReducer,
        authReducer,
        form: formReducer,
        appReducer
    }
)
export const store = createStore(rootReducer, applyMiddleware(thunk))
// @ts-ignore
window.store = store
// Объединение типов actions
export type ActionsTypes =
    | UsersReducerType
    | DialogsReducerType
    | AuthReducerType
    | FormAction
    | AppReducerType

export type RootReducerType = ReturnType<typeof rootReducer>
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, ActionsTypes> // для санок
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootStateType,
    unknown,
    ActionsTypes
>
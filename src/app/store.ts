import {applyMiddleware, combineReducers, createStore} from 'redux';
import {dialogsReducer, DialogsReducerType} from '../components/Dialogs/dialogs-reducer';
import {profileReducer} from '../components/Profile/profile-reducer/profile-reducer';
import {sidebarReducer} from '../components/Navbar/sidebar-reducer';
import {usersReducer, UsersReducerType} from '../components/Users/users-reducer';
import {authReducer, AuthReducerType} from '../components/Login/auth-reducer';
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
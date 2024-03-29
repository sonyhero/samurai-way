import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { dialogsReducer, DialogsReducerType } from '../components/Pages/Dialogs/model/dialogs-reducer'
import { profileReducer } from '../components/Pages/Profile/model/profile-reducer'
import { sidebarReducer } from '../components/ui/navbar/sidebar-reducer'
import { usersReducer, UsersReducerType } from '../components/Pages/Users/model/users-reducer'
import { authReducer, AuthReducerType } from '../components/Pages/Login/model/auth-reducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { FormAction, reducer as formReducer } from 'redux-form'
import { appReducer, AppReducerType } from './model/app-reducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { chatReducer } from '../components/Pages/Chat/model/chat-reducer'

let rootReducer = combineReducers({
  dialogsReducer,
  profileReducer,
  sidebarReducer,
  usersReducer,
  authReducer,
  form: formReducer,
  appReducer,
  chatReducer,
})
//Redux dev tools
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// @ts-ignore
window.store = store

//Types

// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type RootReducerType = ReturnType<typeof rootReducer>
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, ActionsTypes>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsTypes>
export type ActionsTypes = UsersReducerType | DialogsReducerType | AuthReducerType | FormAction | AppReducerType

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

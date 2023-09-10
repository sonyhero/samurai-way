import { RootReducerType } from '../../store'

// export const getPosts = (state: RootReducerType) => state.profileReducer.posts
export const getProfile = (state: RootReducerType) => state.profileReducer.profile
export const getContacts = (state: RootReducerType) => state.profileReducer.profile.contacts
export const getStatus = (state: RootReducerType) => state.profileReducer.profileStatus

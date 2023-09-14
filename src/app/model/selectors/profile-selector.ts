import { RootReducerType } from '../../store'

export const getProfile = (state: RootReducerType) => state.profileReducer.profile
export const getContacts = (state: RootReducerType) => state.profileReducer.profile.contacts
export const getStatus = (state: RootReducerType) => state.profileReducer.profileStatus
export const getProfilePhotoSmall = (state: RootReducerType) => state.profileReducer.profile.photos.small

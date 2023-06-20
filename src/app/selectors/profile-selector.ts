import {RootReducerType} from '../store';

// export const getPosts = (state: RootReducerType) => state.profileReducer.posts
export const getProfile = (state: RootReducerType) => state.profileReducer.profile
export const getStatus = (state: RootReducerType) => state.profileReducer.profileStatus
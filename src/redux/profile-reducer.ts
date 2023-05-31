import {ActionsTypes} from './redux-store';
import {Dispatch} from 'redux';
import {profileAPI} from '../api/api';

export type InitialProfileReducerStateType = {
    newPostText: string
    posts: PostsType[]
    profile: ProfileType | null
    profileStatus: string
}
type PostsType = {
    id: number
    postText: string
    likesCount: number
}

type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

type PhotosType = {
    small: string
    large: string
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

const initialState = {
    posts: [ //Props Profile-MyPosts
        {id: 1, postText: 'Hi, how are you?', likesCount: 23},
        {id: 2, postText: 'It\'s my first post!', likesCount: 100}
    ],
    newPostText: '',
    profile: null,
    profileStatus: ''
}

export const profileReducer = (state: InitialProfileReducerStateType = initialState, action: ActionsTypes):
    InitialProfileReducerStateType => {
    switch (action.type) {
        case 'ADD_POST':
            const newPostText = state.newPostText
            const newPost: PostsType = {
                id: new Date().getTime(), postText: newPostText, likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost], newPostText: ''}
        case 'UPDATE_NEW_POST_TEXT':
            return {...state, newPostText: action.newPostText}
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.payload.profile}
        }
        case 'SET_USER_PROFILE_STATUS':
            return {...state, profileStatus: action.payload.status}
        default:
            return state
    }
}

export const addPost = () => ({type: 'ADD_POST'} as const)
export const updateNewPostText = (newPostText: string) => ({
    type: 'UPDATE_NEW_POST_TEXT',
    newPostText
} as const)

export const setUserProfile = (profile: ProfileType) => {
    return {
        type: 'SET_USER_PROFILE',
        payload: {
            profile
        }
    } as const
}

export const setUserProfileStatus = (status: string) => {
    return {
        type: 'SET_USER_PROFILE_STATUS',
        payload: {
            status
        }
    } as const
}

export const getProfileData = (userId: string) => async (dispatch: Dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getProfileStatus = (userId: string) => async (dispatch: Dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setUserProfileStatus(data))
}

export const updateProfileStatus = (status: string) => async (dispatch: Dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setUserProfileStatus(status))
    }
}
import {AppThunk} from '../../../app/store';
import {profileAPI} from '../../../api/api';
import {ProfileFormType} from "../ProfileInfo/ProfileForm/ProfileForm";

const initialState = {
    posts: [ //Props Profile-MyPosts
        {id: 1, postText: 'Hi, how are you?', likesCount: 23},
        {id: 2, postText: 'It\'s my first post!', likesCount: 100}
    ],
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: '',
        },
        lookingForAJob: true,
        lookingForAJobDescription: '',
        fullName: '',
        userId: 28769,
        photos: {
            small: '',
            large: '',
        }
    },
    profileStatus: ''
}

export const profileReducer = (state: InitialProfileReducerStateType = initialState, action: ProfileReducerType):
    InitialProfileReducerStateType => {
    switch (action.type) {
        case 'PROFILE/ADD_POST':
            const newPost: PostsType = {
                id: new Date().getTime(), postText: action.newPostText, likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost]}
        case 'PROFILE/SET_USER_PROFILE': {
            return {...state, profile: action.payload.profile}
        }
        case 'PROFILE/SET_USER_PROFILE_STATUS':
            return {...state, profileStatus: action.payload.status}
        case 'PROFILE/DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        case 'PROFILE/SAVE_PHOTO':
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state
    }
}
//Actions
export const addPost = (newPostText: string) => ({type: 'PROFILE/ADD_POST', newPostText} as const)
export const setUserProfile = (profile: ProfileType) => {
    return {
        type: 'PROFILE/SET_USER_PROFILE',
        payload: {
            profile
        }
    } as const
}
export const setUserProfileStatus = (status: string) => {
    return {
        type: 'PROFILE/SET_USER_PROFILE_STATUS',
        payload: {
            status
        }
    } as const
}
export const deletePost = (id: number) => {
    return {
        type: 'PROFILE/DELETE_POST',
        id
    } as const
}
export const savePhotoSuccess = (photos: PhotosType) => {
    return {
        type: 'PROFILE/SAVE_PHOTO',
        photos
    } as const
}
export const saveProfileSuccess = (profile: ProfileFormType) => {
    return {
        type: 'PROFILE/PROFILE',
        profile
    } as const
}
//Thunks
export const getProfileData = (userId: string): AppThunk => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}
export const getProfileStatus = (userId: string): AppThunk => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setUserProfileStatus(data))
}
export const updateProfileStatus = (status: string): AppThunk => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setUserProfileStatus(status))
    }
}
export const savePhoto = (file: File): AppThunk => async (dispatch) => {
    let data = await profileAPI.updatePhoto(file)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileFormType): AppThunk => async (dispatch) => {
    let data = await profileAPI.updateProfile(profile)
    if (data.resultCode === 0) {
        // dispatch(savePhotoSuccess(data.data.photos))
    }
}
//Types
export type InitialProfileReducerStateType = {
    // newPostText: string
    posts: PostsType[]
    profile: ProfileType
    profileStatus: string
}
type PostsType = {
    id: number
    postText: string
    likesCount: number
}
export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts?: ContactsType
    photos: PhotosType
    aboutMe: string
}
export type ProfileReducerType =
    | ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserProfileStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>
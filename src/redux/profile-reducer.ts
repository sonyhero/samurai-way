import {ActionsTypes} from './redux-store';

export type InitialProfileReducerStateType = {
    newPostText: string
    posts: PostsType[]
    profile: ProfileType | null
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
    profile: null
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
            return {...state,newPostText: action.newPostText}
        case "SET_USER_PROFILE": {
            return {...state, profile: action.payload.profile}
        }
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
import {ActionsTypes, PostsType} from './state';
import {ProfilePageType} from './state';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
export const addPostAC = () => ({type: ADD_POST} as const)
export const updateNewPostTextAC = (newPostText: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText
} as const)

export const profileReducer = (state: ProfilePageType, action: ActionsTypes) => {

    switch (action.type) {
        case ADD_POST:
            const newPostText = state.newPostText
            const newPost: PostsType = {
                id: new Date().getTime(), postText: newPostText, likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            // return {...state, posts: [...state.posts, newPost]}
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newPostText
            return state
        default:
            return state
    }
}
import {ActionsTypes, PostsType} from './state';
import {ProfilePageType} from './state';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export const profileReducer = (state: ProfilePageType, action: ActionsTypes) => {


    if (action.type === ADD_POST) {
        const newPostText = state.newPostText
        const newPost: PostsType = {
            id: new Date().getTime(), postText: newPostText, likesCount: 0
        }
        state.posts.push(newPost)
        state.newPostText = ''
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
        state.newPostText = action.newPostText


    }

    return state
}
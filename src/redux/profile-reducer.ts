import {ActionsTypes, PostsType} from './state';
import {ProfilePageType} from './state';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
export const addPostAC = () => ({type: ADD_POST} as const)
export const updateNewPostTextAC = (newPostText: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText
} as const)

const initialState: ProfilePageType = {
    posts: [ //Props Profile-MyPosts
        {id: 1, postText: 'Hi, how are you?', likesCount: 23},
        {id: 2, postText: 'It\'s my first post!', likesCount: 100}
    ],
    newPostText: ''
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {

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
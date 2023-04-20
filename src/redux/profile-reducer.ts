import {ActionsTypes} from './redux-store';

export type InitialProfileReducerStateType = {
    newPostText: string
    posts: PostsType[]
}
type PostsType = {
    id: number
    postText: string
    likesCount: number
}
const initialState = {
    posts: [ //Props Profile-MyPosts
        {id: 1, postText: 'Hi, how are you?', likesCount: 23},
        {id: 2, postText: 'It\'s my first post!', likesCount: 100}
    ],
    newPostText: ''
}

export const profileReducer = (state: InitialProfileReducerStateType = initialState, action: ActionsTypes):
    InitialProfileReducerStateType => {
    switch (action.type) {
        case 'ADD_POST':
            const newPostText = state.newPostText
            const newPost: PostsType = {
                id: new Date().getTime(), postText: newPostText, likesCount: 0
            }
            // state.posts.push(newPost)
            // state.newPostText = ''
            // return state
            return {...state, posts: [...state.posts, newPost], newPostText: ''}

        case 'UPDATE_NEW_POST_TEXT':
            // state.newPostText = action.newPostText
            return {...state,newPostText: action.newPostText}
        default:
            return state
    }
}

export const addPostAC = () => ({type: 'ADD_POST'} as const)
export const updateNewPostTextAC = (newPostText: string) => ({
    type: 'UPDATE_NEW_POST_TEXT',
    newPostText
} as const)
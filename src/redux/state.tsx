import {PostsType} from '../App';
import {rerenderEntireTree} from '../render';

const state = {
    profilePage: {
        posts: [ //Props Profile-MyPosts
            {id: 1, message: 'Hi, how are you?', likesCount: 23},
            {id: 2, message: 'It\'s my first post!', likesCount: 100}
        ],
        newPostText: ''
    },
    dialogsPage: {
        dialogs: [ // Props Dialogs-DialogsItem
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Sveta'},
            {id: 3, name: 'Viktor'},
            {id: 4, name: 'Maks'},
            {id: 5, name: 'Igor'},
        ],
        messages: [ //Props Dialogs-Message
            {id: 1, message: 'Hi'},
            {id: 2, message: 'Anton'},
            {id: 3, message: 'How are you'},
        ]
    },
    sidebar: {
        friends: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Nikita'},
            {id: 3, name: 'Eugenia'}
        ]
    }
}

// export const addPost = (postMessage: string) => {
//     const newPost: PostsType = {
//         id: new Date().getTime(), message: postMessage, likesCount: 0
//     }
//     state.profilePage.posts.push(newPost)
//     rerenderEntireTree(state)
// }

export const addPost = () => {
    const newPost: PostsType = {
        id: new Date().getTime(), message: state.profilePage.newPostText, likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}

export default state;
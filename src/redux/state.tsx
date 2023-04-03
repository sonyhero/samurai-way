import {MessageType, PostsType} from '../App';

let store = {
    _state: {
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
            ],
            newMessageText: ''
        },
        sidebar: {
            friends: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Nikita'},
                {id: 3, name: 'Eugenia'}
            ]
        }
    },
    _callSubscriber() {
        console.log('State changed')
    },
    addPost() {
        const newPost: PostsType = {
            id: new Date().getTime(), message: this._state.profilePage.newPostText, likesCount: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ''
        this._callSubscriber()
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText
        this._callSubscriber()
    },
    addMessage() {
        const newMessage: MessageType = {
            id: new Date().getTime(), message: this._state.dialogsPage.newMessageText
        }
        this._state.dialogsPage.messages.push(newMessage)
        this._state.dialogsPage.newMessageText = ''
        this._callSubscriber()
    },
    updateNewMessageText(newMessageText: string) {
        this._state.dialogsPage.newMessageText = newMessageText
        this._callSubscriber()
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer
    }
}

// const rerenderEntireTree = () => {
//     console.log('State changed')
// }

// const state = {
//     profilePage: {
//         posts: [ //Props Profile-MyPosts
//             {id: 1, message: 'Hi, how are you?', likesCount: 23},
//             {id: 2, message: 'It\'s my first post!', likesCount: 100}
//         ],
//         newPostText: ''
//     },
//     dialogsPage: {
//         dialogs: [ // Props Dialogs-DialogsItem
//             {id: 1, name: 'Dimych'},
//             {id: 2, name: 'Sveta'},
//             {id: 3, name: 'Viktor'},
//             {id: 4, name: 'Maks'},
//             {id: 5, name: 'Igor'},
//         ],
//         messages: [ //Props Dialogs-Message
//             {id: 1, message: 'Hi'},
//             {id: 2, message: 'Anton'},
//             {id: 3, message: 'How are you'},
//         ],
//         newMessageText: ''
//     },
//     sidebar: {
//         friends: [
//             {id: 1, name: 'Dimych'},
//             {id: 2, name: 'Nikita'},
//             {id: 3, name: 'Eugenia'}
//         ]
//     }
// }

// export const addPost = (postMessage: string) => {
//     const newPost: PostsType = {
//         id: new Date().getTime(), message: postMessage, likesCount: 0
//     }
//     state.profilePage.posts.push(newPost)
//     rerenderEntireTree(state)
// }

// Функции добавленияя постов
// export const addPost = () => {
//     const newPost: PostsType = {
//         id: new Date().getTime(), message: state.profilePage.newPostText, likesCount: 0
//     }
//     state.profilePage.posts.push(newPost)
//     state.profilePage.newPostText = ''
//     rerenderEntireTree()
// }

// export const updateNewPostText = (newText: string) => {
//     state.profilePage.newPostText = newText
//     rerenderEntireTree()
// }

// Функции добавленияя сообщений
// export const addMessage = () => {
//     const newMessage: MessageType = {
//         id: new Date().getTime(), message: state.dialogsPage.newMessageText
//     }
//     state.dialogsPage.messages.push(newMessage)
//     state.dialogsPage.newMessageText = ''
//     rerenderEntireTree()
// }

// export const updateNewMessageText = (newMessageText: string) => {
//     state.dialogsPage.newMessageText = newMessageText
//     rerenderEntireTree()
// }

// export const subscribe = (observer: () => void) => {
//     rerenderEntireTree = observer
// }

// export default state
//window.state = state
export default store;
// window.store = store
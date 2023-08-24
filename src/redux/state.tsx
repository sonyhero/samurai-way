export {}
// import {profileReducer} from './profile-reducer';
// import {dialogsReducer} from './dialogs-reducer';
// import {sidebarReducer} from './sidebar-reducer';
// import {ActionsTypes} from './redux-store';
//
//  type StateType = {
//     profilePage: ProfilePageType
//     dialogsPage: DialogsPageType
//     sidebar: SidebarType
// }
//  type ProfilePageType = {
//     posts: PostsType[]
//      newPostText: string
// }
//  type DialogsPageType = {
//     messages: MessageType[]
//     dialogs: DialogItemType[]
//     newMessageText: string
// }
//  type SidebarType = {
//     friends: FriendsType[]
// }
//  type DialogItemType = {
//     id: number
//     name: string
// }
//  type MessageType = {
//     id: number
//     messageText: string
// }
//  type FriendsType = {
//     id: number
//     name: string
// }
//  type PostsType = {
//     id: number
//     postText: string
//     likesCount: number
// }
// export type StoreType = {
//     _state: StateType
//     _callSubscriber: () => void
//     getState: () => StateType
//     subscribe: (observer: () => void) => void
//     dispatch: (action: ActionsTypes) => void
// }
//
//
//
// let store: StoreType = {
//     _state: {
//         profilePage: {
//             posts: [ //Props Profile-MyPosts
//                 {id: 1, postText: 'Hi, how are you?', likesCount: 23},
//                 {id: 2, postText: 'It\'s my first post!', likesCount: 100}
//             ],
//             newPostText: ''
//         },
//         dialogsPage: {
//             dialogs: [ // Props Dialogs-DialogsItem
//                 {id: 1, name: 'Dimych'},
//                 {id: 2, name: 'Sveta'},
//                 {id: 3, name: 'Viktor'},
//                 {id: 4, name: 'Maks'},
//                 {id: 5, name: 'Igor'},
//             ],
//             messages: [ //Props Dialogs-Message
//                 {id: 1, messageText: 'Hi'},
//                 {id: 2, messageText: 'Anton'},
//                 {id: 3, messageText: 'How are you'},
//             ],
//             newMessageText: ''
//         },
//         sidebar: {
//             friends: [
//                 {id: 1, name: 'Dimych'},
//                 {id: 2, name: 'Nikita'},
//                 {id: 3, name: 'Eugenia'}
//             ]
//         }
//     },
//     _callSubscriber() {
//         console.log('State changed')
//     },
//
//     getState() {
//         return this._state
//     },
//     subscribe(observer: () => void) {
//         this._callSubscriber = observer
//     },
//
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action)
//         this._callSubscriber()
//
//     }
// }
// export default store;
// // window.store = store

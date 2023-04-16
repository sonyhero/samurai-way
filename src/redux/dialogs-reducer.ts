import {ActionsTypes, DialogsPageType, MessageType} from './state';

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
export const addMessageAC = () => ({type: ADD_MESSAGE} as const)
export const updateNewMessageTextAC = (newMessageText: string) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessageText
} as const)

const initialState: DialogsPageType = {
    dialogs: [ // Props Dialogs-DialogsItem
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Sveta'},
        {id: 3, name: 'Viktor'},
        {id: 4, name: 'Maks'},
        {id: 5, name: 'Igor'},
    ],
    messages: [ //Props Dialogs-Message
        {id: 1, messageText: 'Hi'},
        {id: 2, messageText: 'Anton'},
        {id: 3, messageText: 'How are you'},
    ],
    newMessageText: ''
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessageText = state.newMessageText
            const newMessage: MessageType = {
                id: new Date().getTime(), messageText: newMessageText
            }
            // state.messages.push(newMessage)
            state.newMessageText = ''
            return {...state, messages: [...state.messages, newMessage]}
            // return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText
            return state
        default:
            return state
    }
}
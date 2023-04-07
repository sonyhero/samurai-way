import {ActionsTypes, DialogsPageType, MessageType} from './state';

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export const dialogsReducer = (state: DialogsPageType, action: ActionsTypes) => {

    if (action.type === ADD_MESSAGE) {
        const newMessageText = state.newMessageText
        const newMessage: MessageType = {
            id: new Date().getTime(), messageText: newMessageText
        }
        state.messages.push(newMessage)
        state.newMessageText = ''
    } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
        state.newMessageText = action.newMessageText
    }

    return state
}
import {ActionsTypes} from './redux-store';

export type InitialDialogsReducerStateType = {
    messages: MessageType[]
    dialogs: DialogItemType[]
    newMessageText: string
}
type MessageType = {
    id: number
    messageText: string
}
type DialogItemType = {
    id: number
    name: string
}

const initialState: InitialDialogsReducerStateType = {
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

export const dialogsReducer = (state: InitialDialogsReducerStateType = initialState, action: ActionsTypes)
    : InitialDialogsReducerStateType => {

    switch (action.type) {
        case 'ADD_MESSAGE':
            const newMessageText = state.newMessageText
            const newMessage: MessageType = {
                id: new Date().getTime(), messageText: newMessageText
            }
            return {...state, messages: [...state.messages, newMessage], newMessageText: ''}
        case 'UPDATE_NEW_MESSAGE_TEXT':
            return {...state, newMessageText: action.newMessageText}
        default:
            return state
    }
}

export const addMessage = () => ({type: 'ADD_MESSAGE'} as const)
export const updateNewMessageText = (newMessageText: string) => ({
    type: 'UPDATE_NEW_MESSAGE_TEXT',
    newMessageText
} as const)
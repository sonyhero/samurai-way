export type InitialDialogsReducerStateType = {
    messages: MessageType[]
    dialogs: DialogItemType[]
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
    ]
}

export const dialogsReducer = (state: InitialDialogsReducerStateType = initialState, action: DialogsReducerType)
    : InitialDialogsReducerStateType => {

    switch (action.type) {
        case 'ADD_MESSAGE':
            const newMessageText = action.messageText
            const newMessage: MessageType = {
                id: new Date().getTime(), messageText: newMessageText
            }
            return {...state, messages: [...state.messages, newMessage]}
        default:
            return state
    }
}

export const addMessage = (messageText: string) => (
    {type: 'ADD_MESSAGE',
        messageText
    } as const)

export type DialogsReducerType = ReturnType<typeof addMessage>
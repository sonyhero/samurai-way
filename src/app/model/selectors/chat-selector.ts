import { RootReducerType } from '../../store'

export const getStatus = (state: RootReducerType) => state.chatReducer.status
export const getMessages = (state: RootReducerType) => state.chatReducer.messages

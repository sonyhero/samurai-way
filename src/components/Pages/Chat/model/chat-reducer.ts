import { Dispatch } from 'redux'
import { v1 } from 'uuid'
import { AppThunk } from '../../../../app/store'
import { chatAPI, ChatMessageAPIType, StatusType } from '../api/chat-api'

export type ChatActionsType =
  | ReturnType<typeof messagesReceivedAC>
  | ReturnType<typeof statusChangedAC>
  | ReturnType<typeof clearDataAC>
export type InitialStateType = typeof initialState

type ChatMessageType = ChatMessageAPIType & { id: string }

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
}

export const chatReducer = (state: InitialStateType = initialState, action: ChatActionsType): InitialStateType => {
  switch (action.type) {
    case 'CHAT_PAGE/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.messages.map((m) => ({ ...m, id: v1() }))].filter(
          (m, index, array) => index >= array.length - 100,
        ),
      }
    case 'CHAT_PAGE/STATUS_CHANGED':
      return { ...state, status: action.status }
    case 'CHAT_PAGE/CLEAR_DATA':
      return { ...state, messages: [] }
    default:
      return state
  }
}
//ActionCreators
export const messagesReceivedAC = (messages: ChatMessageAPIType[]) =>
  ({
    type: 'CHAT_PAGE/MESSAGES_RECEIVED',
    messages,
  }) as const
export const statusChangedAC = (status: StatusType) => ({ type: 'CHAT_PAGE/STATUS_CHANGED', status }) as const
export const clearDataAC = () => ({ type: 'CHAT_PAGE/CLEAR_DATA' }) as const

//Thunks
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(messagesReceivedAC(messages))
    }
  }
  return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(statusChangedAC(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): AppThunk => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): AppThunk => async (dispatch) => {
  dispatch(clearDataAC())
  chatAPI.unSubscribe('message-received', newMessageHandlerCreator(dispatch))
  chatAPI.unSubscribe('status-changed', statusChangedHandlerCreator(dispatch))
  chatAPI.stop()
}
export const sendMessage =
  (message: string): AppThunk =>
  async () => {
    chatAPI.sendMessage(message)
  }

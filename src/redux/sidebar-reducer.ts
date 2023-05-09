import {ActionsTypes} from './redux-store';

type InitialStateSidebarReducerType = {
    friends: FriendsType[]
}

type FriendsType = {
    id: number
    name: string
}

const initialState: InitialStateSidebarReducerType  = {
    friends: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Nikita'},
        {id: 3, name: 'Eugenia'}
    ]
}
export const sidebarReducer = (state: InitialStateSidebarReducerType = initialState, action: ActionsTypes)
    : InitialStateSidebarReducerType => {
    return state
}
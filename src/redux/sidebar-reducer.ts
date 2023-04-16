import {ActionsTypes, SidebarType} from './state';

const initialState: SidebarType  = {
    friends: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Nikita'},
        {id: 3, name: 'Eugenia'}
    ]
}
export const sidebarReducer = (state: SidebarType = initialState, action: ActionsTypes) => {
    return state
}
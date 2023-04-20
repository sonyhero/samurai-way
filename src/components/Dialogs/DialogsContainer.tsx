import React from 'react';
import {DialogsPageType} from '../../redux/state';
import {addMessageAC, updateNewMessageTextAC} from '../../redux/dialogs-reducer';
import {Dialogs} from "./Dialogs";
import {connect} from 'react-redux';
import {Dispatch} from 'redux';


// type DialogsPropsType = {
//     dialogsPage: DialogsPageType
//     dispatch: (action: ActionsTypes) => void
//     store: StoreType
// }

// export const DialogsContainer = () => {
//
//     const state = store.getState()
//
//     const addMessage = () => {
//         if (state.dialogsPage.newMessageText.trim() !== '')
//             store.dispatch(addMessageAC())
//     }
//
//     const changeMassage = (newMessageText: string) => {
//         store.dispatch(updateNewMessageTextAC(newMessageText))
//     }
//
//     // const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
//     //     if (e.key === 'Enter') addMessage()
//     // }
//
//     return (
//         <Dialogs
//             addMessage={addMessage}
//             changeMassage={changeMassage}
//             dialogsPage={state.dialogsPage}
//         />
//     )
// }
export type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}
export type MapDispatchToPropsType = Dispatch
//     {
//     addMessage: () => void
//     changeMassage: (newMessageText: string) =>void
// }

const mapStateToProps = (state: MapStateToPropsType) => {
  return {
        dialogsPage: state.dialogsPage
  }
}


const mapDispatchToProps = (dispatch: MapDispatchToPropsType) => {
    return {
        addMessage: () => {
              dispatch(addMessageAC())
        },
        changeMassage: (newMessageText: string) => {
            dispatch(updateNewMessageTextAC(newMessageText))
        }
    }

}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
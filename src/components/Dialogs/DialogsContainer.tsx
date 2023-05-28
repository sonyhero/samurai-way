import React from 'react';
import {addMessage, InitialDialogsReducerStateType, updateNewMessageText} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {RootReducerType} from '../../redux/redux-store';

export type MapDispatchToPropsType = {
    addMessage: () => void
    updateNewMessageText: (newMessageText: string) => void
}
export type MapStateToPropsType = {
    dialogsPage: InitialDialogsReducerStateType
}
const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsReducer
    }
}

export const DialogsContainer = connect(mapStateToProps, {
    addMessage,
    updateNewMessageText
})(Dialogs)
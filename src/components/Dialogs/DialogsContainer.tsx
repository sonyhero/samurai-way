import React from 'react';
import {addMessageAC, InitialDialogsReducerStateType, updateNewMessageTextAC} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppStateType} from '../../redux/redux-store';

type MapDispatchToPropsType = {
    addMessage: () => void
    changeMassage: (newMessageText: string) => void
}
type MapStateToPropsType = {
    dialogsPage: InitialDialogsReducerStateType
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsReducer
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
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
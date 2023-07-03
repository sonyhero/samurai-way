import {addMessage, InitialDialogsReducerStateType} from './dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {RootReducerType} from '../../app/store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {ComponentType} from 'react';
import {getDialogsPage} from '../../app/selectors/dialogs-selector';

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        dialogsPage: getDialogsPage(state),
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {
        addMessage
    }),
    withAuthRedirect
)(Dialogs)
//Types
export type MapDispatchToPropsType = {
    addMessage: (messageText: string) => void
}
export type MapStateToPropsType = {
    dialogsPage: InitialDialogsReducerStateType
}
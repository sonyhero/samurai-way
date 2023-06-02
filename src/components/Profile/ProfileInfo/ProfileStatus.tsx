import React, {ChangeEvent, KeyboardEvent} from 'react';


type ProfileStatusType = {
    status: string
    updateProfileStatus: (status: string) => void
}
type LocalStateType = {
    editMode: boolean
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState(
            {editMode: true}
        )
    }

    deActivateEditMode = () => {
        this.setState(
            {editMode: false}
        )
        this.props.updateProfileStatus(this.state.status)
    }

    onChangeStatus = (e: ChangeEvent<HTMLInputElement>)=> {this.setState( {status: e.currentTarget.value})
    }

    onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // if { === 'Enter'}
       if (e.key === 'Enter') {
           this.deActivateEditMode()
       }
    }

    componentDidUpdate(prevProps: ProfileStatusType, prevState: LocalStateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <>
                {/*{!this.state.editMode*/}
                {/*    ? <div>*/}
                {/*    <span onDoubleClick={this.activateEditMode}>*/}
                {/*        {this.props.status ? this.props.status : 'Hello'}*/}
                {/*    </span></div>*/}
                {/*    : <div>*/}
                {/*        <input autoFocus*/}
                {/*               onBlur={this.deActivateEditMode} value={this.props.status ? this.props.status : 'Hello'}*/}
                {/*        /></div>*/}
                {/*}*/}

                {!this.state.editMode
                    ? <div>
                    <span onDoubleClick={this.activateEditMode}>
                        {this.props.status || 'No status'}
                    </span></div>
                    : <div>
                        <input autoFocus
                               onBlur={this.deActivateEditMode} value={this.state.status}
                               onChange={this.onChangeStatus}
                               onKeyDown={this.onKeyHandler}
                        /></div>
                }
            </>
            // <EditableSpan title={this.props.status}/>
        )
    }
}
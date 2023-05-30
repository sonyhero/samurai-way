import React from 'react';


type ProfileStatusType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState(
            {editMode: true}
        )
    }

    deActivateEditMode() {
        this.setState(
            {editMode: false}
        )
    }

    render() {
        return (
            <>{!this.state.editMode
                ? <div>
                    <span onDoubleClick={this.activateEditMode.bind(this)}>
                        {this.props.status? this.props.status: 'Hello'}
                    </span></div>
                : <div>
                    <input onBlur={this.deActivateEditMode.bind(this)} value={this.props.status? this.props.status: 'Hello'}
                           autoFocus
                /></div>
            }
            </>
            // <EditableSpan title={this.props.status}/>
        )
    }
}
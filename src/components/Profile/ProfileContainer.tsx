import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";


type ProfileAPIComponentType = {
    setUserProfile: (profile: ProfileType) => void
    profile: ProfileType | null
}

export class ProfileAPIComponent extends React.Component<ProfileAPIComponentType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

type MapStateToPropsType = {
    profile: ProfileType | null
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profileReducer.profile
    }
}
export const ProfileContainer = connect(mapStateToProps, {
    setUserProfile
})(ProfileAPIComponent)
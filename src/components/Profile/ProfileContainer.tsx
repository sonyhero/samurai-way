import React, {ComponentType} from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {
    getProfileData,
    getProfileStatus,
    ProfileType,
    updateProfileStatus,
    setUserProfile
} from '../../redux/profile-reducer';
import {RootReducerType} from '../../redux/redux-store';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

type MapStateToPropsType = {
    profile: ProfileType | null
    profileStatus: string
}

type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
    getProfileData: (userId: string) => void
    getProfileStatus: (userId: string) => void
    updateProfileStatus: (status: string) => void
}

type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType

type MatchParamsType = {
    userId: string
}
type ProfileAPIComponentType = RouteComponentProps<MatchParamsType> & ProfileContainerType

export class ProfileAPIComponent extends React.Component<ProfileAPIComponentType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '28817'
        }
        this.props.getProfileData(userId)
        this.props.getProfileStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props}
                     // profile={this.props.profile}
            />
        )
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        profile: state.profileReducer.profile,
        profileStatus: state.profileReducer.profileStatus
    }
}

export const ProfileContainer = compose<ComponentType>(
    connect(mapStateToProps,
        {setUserProfile, getProfileData, getProfileStatus, updateProfileStatus}),
    withRouter,
    withAuthRedirect
)(ProfileAPIComponent)
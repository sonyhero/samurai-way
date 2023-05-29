import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {getProfileData, ProfileType, setUserProfile} from '../../redux/profile-reducer';
import {RootReducerType} from '../../redux/redux-store';
import {RouteComponentProps, withRouter} from 'react-router-dom';

type MapStateToPropsType = {
    profile: ProfileType | null
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
    getProfileData: (userId: string) => void
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
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        profile: state.profileReducer.profile
    }
}

const WithUrlDataProfileContainer = withRouter(ProfileAPIComponent)

export const ProfileContainer = connect(mapStateToProps,
    {setUserProfile, getProfileData})(WithUrlDataProfileContainer)
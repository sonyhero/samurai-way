import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {ProfileType, setUserProfile} from '../../redux/profile-reducer';
import {AppStateType} from '../../redux/redux-store';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {usersAPI} from '../../api/api';

type MapStateToPropsType = {
    profile: ProfileType | null
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
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
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        //     .then(response => {
        //         this.props.setUserProfile(response.data)
        //     })
        usersAPI.getProfile(userId).then(data => {
            this.props.setUserProfile(data)
        })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profileReducer.profile
    }
}

const WithUrlDataProfileContainer = withRouter(ProfileAPIComponent)

export const ProfileContainer = connect(mapStateToProps,
    {setUserProfile})(WithUrlDataProfileContainer)
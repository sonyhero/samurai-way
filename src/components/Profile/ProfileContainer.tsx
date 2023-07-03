import React, {ComponentType} from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {
    getProfileData,
    getProfileStatus,
    ProfileType,
    updateProfileStatus,
    setUserProfile
} from './profile-reducer/profile-reducer';
import {RootReducerType} from '../../app/store';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {getProfile, getStatus} from '../../app/selectors/profile-selector';
import {getIsAuth, getUserId} from '../../app/selectors/auth-selector';

export class ProfileAPIComponent extends React.Component<ProfileAPIComponentType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            if (this.props.authorizedUserId !== null) {
                userId = this.props.authorizedUserId
            } else this.props.history.push('/login')
            // userId = '28817'
        }
        this.props.getProfileData(userId)
        this.props.getProfileStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props}/>
        )
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        profile: getProfile(state),
        profileStatus: getStatus(state),
        authorizedUserId: getUserId(state),
        isAuth: getIsAuth(state)
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps,
        {setUserProfile, getProfileData, getProfileStatus, updateProfileStatus}),
    withRouter,
    withAuthRedirect
)(ProfileAPIComponent)
//Types
type MapStateToPropsType = {
    profile: ProfileType | null
    profileStatus: string
    authorizedUserId: string | null
    isAuth: boolean
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
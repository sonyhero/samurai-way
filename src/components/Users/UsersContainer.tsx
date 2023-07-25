import React, {ComponentType} from 'react';
import {RootReducerType} from '../../app/store';
import {connect} from 'react-redux';
import {
    follow,
    followUsers,
    requestUsers,
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleFollowingProgress,
    toggleIsFetching,
    unFollow,
    unFollowUsers,
    UserType
} from './users-reducer';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../app/selectors/users-selector';

export class UsersAPIComponent extends React.Component<UsersAPIComponentType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize)
    }

    render() {

        return this.props.isFetching
                ? <Preloader/>
                : <Users
                    {...this.props}
                    onPageChanged={this.onPageChanged}
                />
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps,
        {
            follow,
            unFollow,
            setUsers,
            setCurrentPage,
            setUsersTotalCount,
            toggleIsFetching,
            toggleFollowingProgress,
            requestUsers,
            followUsers,
            unFollowUsers
        })
)(UsersAPIComponent)
//Types
type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    setUsersTotalCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    followUsers: (userId: number) => void
    unFollowUsers: (userId: number) => void
}
type MapStateToPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
export type UsersAPIComponentType = MapStateToPropsType & MapDispatchToPropsType
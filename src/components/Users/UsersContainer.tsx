import React, {ComponentType} from 'react';
import {RootReducerType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {
    follow,
    followUsers,
    getUsers,
    setCurrentPage, setUsers, setUsersTotalCount,
    toggleFollowingProgress, toggleIsFetching, unFollow,
    unFollowUsers,
    UsersType
} from '../../redux/users-reducer';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

// type UsersAPIComponentType = {
//     follow: (userId: number) => void
//     unFollow: (userId: number) => void
//     setUsers: (users: UsersType[]) => void
//     setCurrentPage: (currentPage: number) => void
//     setUsersTotalCount: (totalUsersCount: number) => void
//     toggleIsFetching: (isFetching: boolean) => void
//     users: UsersType[]
//     pageSize: number
//     totalUsersCount: number
//     currentPage: number
//     isFetching: boolean
// }

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setUsersTotalCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    followUsers: (userId: number) => void
    unFollowUsers: (userId: number) => void
}

type MapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

export type UsersAPIComponentType = MapStateToPropsType & MapDispatchToPropsType

export class UsersAPIComponent extends React.Component<UsersAPIComponentType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {

        return <>
            {this.props.isFetching
                ? <Preloader/>
                : null
            }
            <Users
                {...this.props}
                onPageChanged={this.onPageChanged}
            />
        </>
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalUsersCount: state.usersReducer.totalUsersCount,
        currentPage: state.usersReducer.currentPage,
        isFetching: state.usersReducer.isFetching,
        followingInProgress: state.usersReducer.followingInProgress
    }
}

export const UsersContainer = compose<ComponentType>(
    connect(mapStateToProps,
        {
            follow,
            unFollow,
            setUsers,
            setCurrentPage,
            setUsersTotalCount,
            toggleIsFetching,
            toggleFollowingProgress,
            getUsers,
            followUsers,
            unFollowUsers
        }),
    withAuthRedirect
)(UsersAPIComponent)
import React from 'react';
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {
    follow,
    setCurrentPage,
    setUsers, setUsersTotalCount, toggleFollowingProgress, toggleIsFetching,
    unFollow,
    UsersType
} from '../../redux/users-reducer';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {usersAPI} from '../../api/api';

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
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
            // Засетал тотал каунт разделенный на 200 так как очень много данных
            this.props.setUsersTotalCount(data.totalCount / 200)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })
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

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalUsersCount: state.usersReducer.totalUsersCount,
        currentPage: state.usersReducer.currentPage,
        isFetching: state.usersReducer.isFetching,
        followingInProgress: state.usersReducer.followingInProgress
    }
}

export const UsersContainer = connect(mapStateToProps,
    {
        follow,
        unFollow,
        setUsers,
        setCurrentPage,
        setUsersTotalCount,
        toggleIsFetching,
        toggleFollowingProgress
    }
)(UsersAPIComponent)
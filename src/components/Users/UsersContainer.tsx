import React from "react";
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {
    follow,
    setCurrentPage,
    setUsers, setUsersTotalCount, toggleIsFetching,
    unFollow,
    UsersType
} from '../../redux/users-reducer';
import axios from 'axios';
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";

type UsersPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setUsersTotalCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

export class UsersAPIComponent extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                // Засетал тотал каунт разделенный на 200 так как очень много данных
                this.props.setUsersTotalCount(response.data.totalCount / 200)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
    }

    render() {

        return <>
            {this.props.isFetching
                ? <Preloader/>
                : null
            }
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                users={this.props.users}
            />
        </>
    }
}


type MapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalUsersCount: state.usersReducer.totalUsersCount,
        currentPage: state.usersReducer.currentPage,
        isFetching: state.usersReducer.isFetching
    }
}

// type MapDispatchToPropsType = {
//     follow: (userId: number) => void
//     unFollow: (userId: number) => void
//     setUsers: (users: UsersType[]) => void
//     setCurrentPage: (currentPage: number) => void
//     setUsersTotalCount: (totalUsersCount: number) => void
//     toggleIsFetching: (isFetching: boolean) => void
// }
//
// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
//     return {
//         follow(userId: number) {
//             dispatch(followAC(userId))
//         },
//         unFollow(userId: number) {
//             dispatch(unFollowAC(userId))
//         },
//         setUsers(users: UsersType[]) {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage(currentPage: number) {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setUsersTotalCount(totalUsersCount: number) {
//             dispatch(setUsersTotalCountAC(totalUsersCount))
//         },
//         toggleIsFetching(isFetching: boolean) {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }

export const UsersContainer = connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setUsersTotalCount,
    toggleIsFetching
})(UsersAPIComponent)
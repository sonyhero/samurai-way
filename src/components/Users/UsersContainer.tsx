import React from "react";
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {
    followAC,
    setCurrentPageAC,
    setUsersAC, setUsersTotalCountAC,
    unFollowAC,
    UsersType
} from '../../redux/users-reducer';
import axios from 'axios';
import {Users} from "./Users";

type UsersPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setUsersTotalCount: (totalUsersCount: number) => void
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

export class UsersAPIComponent extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                // Засетал тотал каунт разделенный на 200 так как очень много данных
                this.props.setUsersTotalCount(response.data.totalCount/200)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {

        // const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        //
        // let pages = []
        // for (let i = 1; i <= pagesCount; i++) {
        //     pages.push(i)
        // }
        // const mappedPages = pages.map((p,index) => {
        //     return (
        //         <span key={index}
        //             onClick={(e)=>this.onPageChanged(p)}
        //             className={(this.props.currentPage === p)
        //             ? s.selectedPage
        //             : s.usualSpan
        //         }> {p} </span>)
        // })
        // const changeFollow = (userId: number) => {
        //     this.props.follow(userId)
        // }
        // const changeUnFollow = (userId: number) => {
        //     this.props.unFollow(userId)
        // }
        //
        // const mappedUsers = this.props.users.map(u => <div key={u.id}>
        // <span>
        //     <div>
        //     <img src={u.photos.small !== null
        //         ? u.photos.small
        //         : userPhoto
        //     } alt={'avatar'} className={s.usersPhoto}/>
        // </div>
        //     <div>{
        //         u.followed
        //             ? <button onClick={() => changeUnFollow(u.id)}>Unfollow</button>
        //             : <button onClick={() => changeFollow(u.id)}>Follow</button>
        //     }
        //     </div>
        // </span><span>
        //     <span>
        //         <div>{u.name}</div>
        //         <div>{u.status}</div>
        //     </span>
        //     <span>
        //         <div>{'el.location.country'}</div>
        //         <div>{'el.location.city'}</div>
        //     </span>
        // </span>
        //
        // </div>)

        return <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            onPageChanged={this.onPageChanged}
            currentPage={this.props.currentPage}
            follow={this.props.follow}
            unFollow={this.props.unFollow}
            users={this.props.users}
        />
    }
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setUsersTotalCount: (totalUsersCount: number) => void
}
type MapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalUsersCount: state.usersReducer.totalUsersCount,
        currentPage: state.usersReducer.currentPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow(userId: number) {
            dispatch(followAC(userId))
        },
        unFollow(userId: number) {
            dispatch(unFollowAC(userId))
        },
        setUsers(users: UsersType[]) {
            dispatch(setUsersAC(users))
        },
        setCurrentPage(currentPage: number) {
            dispatch(setCurrentPageAC(currentPage))
        },
        setUsersTotalCount(totalUsersCount: number) {
            dispatch(setUsersTotalCountAC(totalUsersCount))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)
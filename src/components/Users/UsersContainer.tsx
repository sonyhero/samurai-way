import React from 'react';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {followAC, InitialUsersReducerStateType, setUsersAC, unFollowAC, UsersType} from '../../redux/users-reducer';
import {Users} from './Users';

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
}
type MapStateToPropsType = {
    users: InitialUsersReducerStateType
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersReducer
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
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
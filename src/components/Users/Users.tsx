import React from 'react';
import {InitialUsersReducerStateType, UsersType} from '../../redux/users-reducer';
import s from './UsersCSS.module.css'

type UsersPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    users: InitialUsersReducerStateType
}

export const Users: React.FC<UsersPropsType> = (props) => {
    const {users, setUsers, follow, unFollow} = props

    const changeFollow = (userId: number) => {
        follow(userId)
    }
    const changeUnFollow = (userId: number) => {
        unFollow(userId)
    }

    const mappedUsers = users.users.map(el => <div key={el.id}>
        <span>
            <div>
            <img src={el.photoUrl} alt={'avatar'} className={s.usersPhoto}/>
        </div>
            <div>{
                el.followed
                    ? <button onClick={() => changeUnFollow(el.id)}>Unfollow</button>
                    : <button onClick={() => changeFollow(el.id)}>Follow</button>
            }
            </div>
        </span><span>
            <span>
                <div>{el.fullName}</div>
                <div>{el.status}</div>
            </span>
            <span>
                <div>{el.location.country}</div>
                <div>{el.location.city}</div>
            </span>
        </span>

    </div>)
    return (
        <div>
            {mappedUsers}
        </div>
    );
};
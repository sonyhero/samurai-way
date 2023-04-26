import React from 'react';
import {InitialUsersReducerStateType, UsersType} from '../../redux/users-reducer';
import s from './UsersCSS.module.css'
import axios from 'axios';
import userPhoto from '../../assets/img/user.png'

type UsersPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    users: InitialUsersReducerStateType
}
export class Users extends React.Component<UsersPropsType> {

    constructor(props: UsersPropsType) {
        super(props);

            axios.get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response=>{
                    this.props.setUsers(response.data.items)
                })

    }

    render() {
        const changeFollow = (userId: number) => {
            this.props.follow(userId)
        }
        const changeUnFollow = (userId: number) => {
            this.props.unFollow(userId)
        }

        const mappedUsers = this.props.users.users.map(el => <div key={el.id}>
        <span>
            <div>
            <img src={el.photos.small !== null
                ? el.photos.small
                : userPhoto
            } alt={'avatar'} className={s.usersPhoto}/>
        </div>
            <div>{
                el.followed
                    ? <button onClick={() => changeUnFollow(el.id)}>Unfollow</button>
                    : <button onClick={() => changeFollow(el.id)}>Follow</button>
            }
            </div>
        </span><span>
            <span>
                <div>{el.name}</div>
                <div>{el.status}</div>
            </span>
            <span>
                <div>{'el.location.country'}</div>
                <div>{'el.location.city'}</div>
            </span>
        </span>

        </div>)
        return (
            <div>
                {mappedUsers}
            </div>
        )
    }
}
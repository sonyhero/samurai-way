import React from 'react';
import s from './UsersCSS.module.css';
import userPhoto from '../../assets/img/user.png';
import {NavLink} from 'react-router-dom';
import {UsersAPIComponentType} from './UsersContainer';
import {Pagination} from '../common/Pagination/Pagination';

type UsersProps = {
    onPageChanged: (pageNumber: number) => void
}

type UsersPropsType = UsersProps & UsersAPIComponentType
export const Users: React.FC<UsersPropsType> = (props) => {

    const {
        totalUsersCount,
        pageSize,
        currentPage,
        users,
        followingInProgress,
        onPageChanged,
        followUsers,
        unFollowUsers
    } = props

    const changeFollow = (userId: number) => {
        followUsers(userId)
    }

    const changeUnFollow = (userId: number) => {
        unFollowUsers(userId)
    }

    const mappedUsers = users.map(u => <div key={u.id}>
        <span>
            <div>
                <NavLink to={`/profile/${u.id}`}>
                    <img src={u.photos.small !== null
                        ? u.photos.small
                        : userPhoto
                    } alt={'avatar'} className={s.usersPhoto}/>
                </NavLink>
        </div>
            <div>{
                u.followed
                    ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => changeUnFollow(u.id)}>Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => changeFollow(u.id)}>Follow</button>
            }
            </div>
        </span><span>
            <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
            </span>
            <span>
                <div>{'el.location.country'}</div>
                <div>{'el.location.city'}</div>
            </span>
        </span>
    </div>)

    return (
        <div>
            <Pagination pageSize={pageSize} totalUsersCount={totalUsersCount} currentPage={currentPage} onPageChanged={onPageChanged}/>
            {mappedUsers}
        </div>
    )
}
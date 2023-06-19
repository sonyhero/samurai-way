import React from 'react';
import s from './UsersCSS.module.css';
import userPhoto from '../../assets/img/user.png';
import {NavLink} from 'react-router-dom';
import {UsersAPIComponentType} from './UsersContainer';

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

    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const mappedPages = pages.map((p, index) => {
        return (
            <span key={index}
                  onClick={() => onPageChanged(p)}
                  className={(currentPage === p)
                      ? s.selectedPage
                      : s.usualSpan
                  }> {p} </span>)
    })

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
            {mappedPages}
            {mappedUsers}
        </div>
    )
}
import React from 'react';
import s from "./UsersCSS.module.css";
import userPhoto from "../../assets/img/user.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    users: UsersType[]
}
export const Users: React.FC<UsersPropsType> = (props) => {

    const {
        totalUsersCount,
        pageSize,
        onPageChanged,
        currentPage,
        follow,
        unFollow,
        users,
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
        follow(userId)
    }
    const changeUnFollow = (userId: number) => {
        unFollow(userId)
    }

    const mappedUsers = users.map(u => <div key={u.id}>
        <span>
            <div>
                <NavLink to={'/profile/'}>
                    <img src={u.photos.small !== null
                        ? u.photos.small
                        : userPhoto
                    } alt={'avatar'} className={s.usersPhoto}/>
                </NavLink>
        </div>
            <div>{
                u.followed
                    ? <button onClick={() => changeUnFollow(u.id)}>Unfollow</button>
                    : <button onClick={() => changeFollow(u.id)}>Follow</button>
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
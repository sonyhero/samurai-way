import React from 'react';
import s from './UsersCSS.module.css';
import userPhoto from '../../assets/img/user.png';
import {NavLink} from 'react-router-dom';
import {UsersAPIComponentType} from './UsersContainer';
import {usersAPI} from '../../api/api';

// type UsersPropsType = {
//     totalUsersCount: number
//     pageSize: number
//     currentPage: number
//     follow: (userId: number) => void
//     unFollow: (userId: number) => void
//     users: UsersType[]
//     onPageChanged: (pageNumber: number) => void
// }

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
        follow,
        unFollow,
        onPageChanged,
        toggleFollowingProgress
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

    // const changeFollow = (userId: number) => {
    //     toggleFollowingProgress(true, userId)
    //     usersAPI.followUsers(userId)
    //         // lesson62
    //         .then(data => {
    //             if (data.resultCode === 0) {
    //                 follow(userId)
    //             }
    //             toggleFollowingProgress(false, userId)
    //         })
    // }

    // const changeUnFollow = (userId: number) => {
    //     toggleFollowingProgress(true, userId)
    //     usersAPI.unFollowUsers(userId)
    //         // lesson62
    //         .then(data => {
    //             if (data.resultCode === 0) {
    //                 unFollow(userId)
    //             }
    //             toggleFollowingProgress(false, userId)
    //         })
    //
    // }

    const changeFollow = async (userId: number) => {
        try {
            toggleFollowingProgress(true, userId)
            let data = await  usersAPI.followUsers(userId)
            if (data.resultCode === 0) {
                follow(userId)
            }
        } catch (e) {
            console.log(e)
        } finally {
            toggleFollowingProgress(false, userId)
        }
    }

    const changeUnFollow = async (userId: number) => {
        try {
            toggleFollowingProgress(true, userId)
            let data = await usersAPI.unFollowUsers(userId)
            if (data.resultCode === 0) {
                unFollow(userId)
            }
        } catch (e) {
            console.log(e)
        } finally {
            toggleFollowingProgress(false, userId)
        }
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
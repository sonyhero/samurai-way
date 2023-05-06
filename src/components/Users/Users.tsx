import React from 'react';
import {UsersType} from '../../redux/users-reducer';
import s from './UsersCSS.module.css'
import axios from 'axios';
import userPhoto from '../../assets/img/user.png'

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

export class Users extends React.Component<UsersPropsType> {

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

        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        const mappedPages = pages.map((p,index) => {
            return (
                <span key={index}
                    onClick={(e)=>this.onPageChanged(p)}
                    className={(this.props.currentPage === p)
                    ? s.selectedPage
                    : s.usualSpan
                }> {p} </span>)
        })
        const changeFollow = (userId: number) => {
            this.props.follow(userId)
        }
        const changeUnFollow = (userId: number) => {
            this.props.unFollow(userId)
        }

        const mappedUsers = this.props.users.map(el => <div key={el.id}>
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
                {mappedPages}
                {mappedUsers}
            </div>
        )
    }
}
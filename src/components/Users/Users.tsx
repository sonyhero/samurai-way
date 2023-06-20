import React from 'react';
import {UsersAPIComponentType} from './UsersContainer';
import {Pagination} from '../common/Pagination/Pagination';
import {User} from './User/User';

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

    const mappedUsers = users.map(u =>
        <User
            key={u.id}
            user={u}
            followUsers={followUsers}
            unFollowUsers={unFollowUsers}
            followingInProgress={followingInProgress}
        />)

    return (
        <div>
            <Pagination pageSize={pageSize} totalUsersCount={totalUsersCount} currentPage={currentPage}
                        onPageChanged={onPageChanged}/>
            {mappedUsers}
        </div>
    )
}
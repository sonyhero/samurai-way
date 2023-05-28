import axios from 'axios';
import {ProfileType} from '../redux/profile-reducer';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '275a40de-010f-4090-ae39-5e228c881a39'
    }
})

type FollowResponse<D> = {
    resultCode: number
    messages: string[]
    data: D
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=
        ${currentPage}&count=
        ${pageSize}`
        )
            .then(response => response.data)
    },
    //----------------------------------------------------
    followUsers(userId: number) {
        return instance.post<FollowResponse<{}>>(`follow/${userId}`)
            .then(response => response.data)
    },
    unFollowUsers(userId: number) {
        return instance.delete<FollowResponse<{}>>(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId: string) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data)
    }
}

// Получение пользователей в компоненте UsersContainer
// export const getUsers = (currentPage: number, pageSize: number) => {
//     return instance.get(`users?page=
//         ${currentPage}&count=
//         ${pageSize}`
//     )
//         .then(response => response.data)
// }
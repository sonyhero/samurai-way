import axios from 'axios';
import {ProfileType} from '../redux/profile-reducer';
import {UsersType} from '../redux/users-reducer';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '275a40de-010f-4090-ae39-5e228c881a39'
    }
})

type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}


export type UsersResponseDataType = {
    items: UsersType[]
    totalCount: number
    error: string
}


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<UsersResponseDataType>(`users?page=
        ${currentPage}&count=
        ${pageSize}`
        )
            .then(res => res.data)
    },
    //----------------------------------------------------
    followUsers(userId: number) {
        return instance.post<ResponseType<{}>>(`follow/${userId}`)
            .then(res => res.data)
    },
    unFollowUsers(userId: number) {
        return instance.delete<ResponseType<{}>>(`follow/${userId}`)
            .then(res => res.data)
    },
    getProfile(userId: string) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(res => res.data)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
            .then(res => res.data)
    },
    setStatus(status: string) {
        return instance.put<ResponseType<{}>>('profile/status', {status})
        // .then(res => res.data)
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(res => res.data)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType<{}>>('profile/status', {status})
            .then(res => res.data)
    }
}

type AuthResponseData = {
    id: number
    email: string
    login: string
}

export const authAPI = {
    getAuthMe() {
        return instance.get<ResponseType<AuthResponseData>>(`auth/me`)
            .then(res => res.data)
    },
    logIn(email: string, password: string, rememberMe: boolean, captcha: boolean) {
        return instance.post<ResponseType<{ userId: number }>>(`auth/login`, {
            email, password, rememberMe, captcha
        })
            .then(res => res.data)
    },
    logOut() {
        return instance.delete<ResponseType<{}>>(`auth/login`)
            .then(res => res.data)
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
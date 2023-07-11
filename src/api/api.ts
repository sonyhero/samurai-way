import axios from 'axios';
import {PhotosType, ProfileType} from '../components/Profile/profile-reducer/profile-reducer';
import {UserType} from '../components/Users/users-reducer';
import {ProfileFormType} from "../components/Profile/ProfileInfo/ProfileForm/ProfileForm";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '275a40de-010f-4090-ae39-5e228c881a39'
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<UsersResponseDataType>(`users?page=
        ${currentPage}&count=
        ${pageSize}`)
            .then(res => res.data)
    },
    //----------------------------------------------------
    followUsers(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(res => res.data)
    },
    unFollowUsers(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(res => res.data)
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
        return instance.put<ResponseType>('profile/status', {status})
            .then(res => res.data)
    },
    updatePhoto(file: File) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<ResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    updateProfile(profile: ProfileFormType) {
        return instance.put<ResponseType>(`profile`, profile)
            .then(res => res.data)
    }
}
export const securityAPI = {
    getCaptchaUrl(){
        return instance.get<{url: string}>(`/security/get-captcha-url`)
            .then(res=> res.data)
    }
}

export const authAPI = {
    getAuthMe() {
        return instance.get<ResponseType<AuthResponseData>>(`auth/me`)
            .then(res => res.data)
    },
    logIn(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<ResponseType<{ userId: number }>>(`auth/login`, {
            email, password, rememberMe, captcha
        })
            .then(res => res.data)
    },
    logOut() {
        return instance.delete<ResponseType>(`auth/login`)
            .then(res => res.data)
    }
}

//Types
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export type UsersResponseDataType = {
    items: UserType[]
    totalCount: number
    error: string
}
type AuthResponseData = {
    id: number
    email: string
    login: string
}

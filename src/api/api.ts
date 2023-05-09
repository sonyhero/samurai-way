import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
    // headers: {
    //    'API-KEY' : '275a40de-010f-4090-ae39-5e228c881a39'
    // }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=
        ${currentPage}&count=
        ${pageSize}`
        )
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


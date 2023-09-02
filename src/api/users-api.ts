import { UserType } from '../components/Pages/Users/user-reducer/users-reducer'
import { instance, ResponseAppType } from './api'

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get<UsersResponseDataType>(
        `users?page=
        ${currentPage}&count=
        ${pageSize}`,
      )
      .then((res) => res.data)
  },
  //----------------------------------------------------
  followUsers(userId: number) {
    return instance.post<ResponseAppType>(`follow/${userId}`).then((res) => res.data)
  },
  unFollowUsers(userId: number) {
    return instance.delete<ResponseAppType>(`follow/${userId}`).then((res) => res.data)
  },
}
export type UsersResponseDataType = {
  items: UserType[]
  totalCount: number
  error: string
}

import { UserType } from '../components/Users/user-reducer/users-reducer'
import { instance, ResponseType } from './api'

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
    return instance.post<ResponseType>(`follow/${userId}`).then((res) => res.data)
  },
  unFollowUsers(userId: number) {
    return instance.delete<ResponseType>(`follow/${userId}`).then((res) => res.data)
  },
}
export type UsersResponseDataType = {
  items: UserType[]
  totalCount: number
  error: string
}

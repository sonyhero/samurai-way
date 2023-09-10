import { UserType } from '../model/users-reducer'
import { instance, ResponseAppType } from '../../../../app/api/api'

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number, term: string, friend: null | boolean) {
    return instance
      .get<UsersResponseDataType>(
        `users?page=
        ${currentPage}&count=
        ${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`),
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

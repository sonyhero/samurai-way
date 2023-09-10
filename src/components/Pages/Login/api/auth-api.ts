import { instance, ResponseAppType } from '../../../../api/api'

export const authAPI = {
  getAuthMe() {
    return instance.get<ResponseAppType<AuthResponseData>>(`auth/me`).then((res) => res.data)
  },
  logIn(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
    return instance
      .post<ResponseAppType<{ userId: number }>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data)
  },
  logOut() {
    return instance.delete<ResponseAppType>(`auth/login`).then((res) => res.data)
  },
}
type AuthResponseData = {
  id: number
  email: string
  login: string
}

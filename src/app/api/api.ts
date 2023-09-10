import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '275a40de-010f-4090-ae39-5e228c881a39',
  },
})

//Types
export type ResponseAppType<D = {}> = {
  resultCode: ResultCodesEnum | ResultCodeForCapctha
  messages: string[]
  fieldsErrors: FieldErrorType
  data: D
}
export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCapctha {
  CaptchaIsRequired = 10,
}
type FieldErrorType = {
  error: string
  field: string
}

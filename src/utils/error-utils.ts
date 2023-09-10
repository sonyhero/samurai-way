import { ResponseAppType } from '../app/api/api'
import { toast } from 'react-toastify'
import NProgress from 'nprogress'
import axios, { AxiosError } from 'axios'

export const handleServerAppError = <D>(data: ResponseAppType<D>) => {
  toast.error({ error: data.messages.length ? data.messages[0] : 'Some error occurred' })
  NProgress.done()
}

export const handleServerNetworkError = (e: unknown) => {
  const err = e as Error | AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : 'Some error occurred'
    toast.error(error)
    NProgress.done()
  } else {
    toast.error(`Native error ${err.message}`)
    NProgress.done()
  }
}

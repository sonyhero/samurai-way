import { PhotosType, ProfileType } from '../components/Pages/Profile/profile-reducer/profile-reducer'
import { ProfileFormType } from '../components/Pages/Profile/ProfileInfo/ProfileForm/ProfileForm'
import { instance, ResponseAppType } from './api'

export const profileAPI = {
  getProfile(userId: string) {
    return instance.get<ProfileType>(`profile/${userId}`).then((res) => res.data)
  },
  getStatus(userId: string) {
    return instance.get(`profile/status/${userId}`).then((res) => res.data)
  },
  updateStatus(status: string) {
    return instance.put<ResponseAppType>('profile/status', { status }).then((res) => res.data)
  },
  updatePhoto(file: File) {
    const formData = new FormData()
    formData.append('image', file)
    return instance
      .put<ResponseAppType<{ photos: PhotosType }>>(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
  },
  updateProfile(profile: ProfileFormType) {
    return instance.put<ResponseAppType>(`profile`, profile).then((res) => res.data)
  },
}

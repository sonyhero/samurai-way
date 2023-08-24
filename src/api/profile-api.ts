import { PhotosType, ProfileType } from '../components/Profile/profile-reducer/profile-reducer'
import { ProfileFormType } from '../components/Profile/ProfileInfo/ProfileForm/ProfileForm'
import { instance, ResponseType } from './api'

export const profileAPI = {
  getProfile(userId: string) {
    return instance.get<ProfileType>(`profile/${userId}`).then((res) => res.data)
  },
  getStatus(userId: string) {
    return instance.get(`profile/status/${userId}`).then((res) => res.data)
  },
  updateStatus(status: string) {
    return instance.put<ResponseType>('profile/status', { status }).then((res) => res.data)
  },
  updatePhoto(file: File) {
    const formData = new FormData()
    formData.append('image', file)
    return instance
      .put<ResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
  },
  updateProfile(profile: ProfileFormType) {
    return instance.put<ResponseType>(`profile`, profile).then((res) => res.data)
  },
}

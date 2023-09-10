import { PhotosType, ProfileType } from '../model/profile-reducer'
import { ProfileFormType } from '../ui/ProfileInfo/ProfileForm/ProfileForm'
import { instance, ResponseAppType } from '../../../../app/api/api'

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

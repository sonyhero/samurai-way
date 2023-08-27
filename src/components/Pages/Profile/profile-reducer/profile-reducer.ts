import { AppThunk, InferActionsTypes } from '../../../../app/store'
import { ProfileFormType } from '../ProfileInfo/ProfileForm/ProfileForm'
import { stopSubmit } from 'redux-form'
import { profileAPI } from '../../../../api/profile-api'
import { ResultCodesEnum } from '../../../../api/api'

const initialState = {
  posts: [
    { id: 1, postText: 'Hi, how are you?', likesCount: 23 },
    { id: 2, postText: "It's my first post!", likesCount: 100 },
  ],
  profile: {
    aboutMe: '',
    contacts: {
      facebook: '',
      website: '',
      vk: '',
      twitter: '',
      instagram: '',
      youtube: '',
      github: '',
      mainLink: '',
    },
    lookingForAJob: true,
    lookingForAJobDescription: '',
    fullName: '',
    userId: 28769,
    photos: {
      small: '',
      large: '',
    },
  },
  profileStatus: '',
}

export const profileReducer = (
  state: InitialProfileReducerStateType = initialState,
  action: ProfileReducerType,
): InitialProfileReducerStateType => {
  switch (action.type) {
    case 'PROFILE/ADD_POST':
      const newPost: PostsType = {
        id: new Date().getTime(),
        postText: action.newPostText,
        likesCount: 0,
      }
      return { ...state, posts: [...state.posts, newPost] }
    case 'PROFILE/SET_USER_PROFILE': {
      return { ...state, profile: action.profile }
    }
    case 'PROFILE/SET_USER_PROFILE_STATUS':
      return { ...state, profileStatus: action.status }
    case 'PROFILE/DELETE_POST':
      return { ...state, posts: state.posts.filter((p) => p.id !== action.id) }
    case 'PROFILE/SAVE_PHOTO':
      return { ...state, profile: { ...state.profile, photos: action.photos } }
    default:
      return state
  }
}
//Actions
export const profileActions = {
  addPost: (newPostText: string) => ({ type: 'PROFILE/ADD_POST', newPostText }) as const,
  setUserProfile: (profile: ProfileType) => ({ type: 'PROFILE/SET_USER_PROFILE', profile }) as const,
  setUserProfileStatus: (status: string) => ({ type: 'PROFILE/SET_USER_PROFILE_STATUS', status }) as const,
  deletePost: (id: number) => ({ type: 'PROFILE/DELETE_POST', id }) as const,
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'PROFILE/SAVE_PHOTO', photos }) as const,
}
//Thunks
export const getProfileData =
  (userId: string): AppThunk =>
  async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(profileActions.setUserProfile(data))
  }
export const getProfileStatus =
  (userId: string): AppThunk =>
  async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setUserProfileStatus(data))
  }
export const updateProfileStatus =
  (status: string): AppThunk =>
  async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.setUserProfileStatus(status))
    }
  }
export const savePhoto =
  (file: File): AppThunk =>
  async (dispatch) => {
    const data = await profileAPI.updatePhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.savePhotoSuccess(data.data.photos))
    }
  }
export const saveProfile =
  (profile: ProfileFormType): AppThunk =>
  async (dispatch, getState) => {
    try {
      const userId = getState().authReducer.userId
      const data = await profileAPI.updateProfile(profile)
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getProfileData(`${userId}`))
      } else {
        const key = data.messages[0].match(/(?<=->)[^)]+/)
        key && dispatch(stopSubmit('editProfile', { contacts: { [key[0].toLocaleLowerCase()]: data.messages[0] } }))
        return Promise.reject(data.messages[0])
      }
    } catch (e) {
      console.warn(e)
    }
  }
//Types
export type InitialProfileReducerStateType = {
  posts: PostsType[]
  profile: ProfileType
  profileStatus: string
}
type PostsType = {
  id: number
  postText: string
  likesCount: number
}
export type ContactsType = {
  facebook: string
  website: string
  vk: string
  twitter: string
  instagram: string
  youtube: string
  github: string
  mainLink: string
}
export type PhotosType = {
  small: string
  large: string
}
export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  photos: PhotosType
  aboutMe: string
}
// export type ProfileReducerType =
//     | ReturnType<typeof addPost>
//     | ReturnType<typeof setUserProfile>
//     | ReturnType<typeof setUserProfileStatus>
//     | ReturnType<typeof deletePost>
//     | ReturnType<typeof savePhotoSuccess>
export type ProfileReducerType = InferActionsTypes<typeof profileActions>
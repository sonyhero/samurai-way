import { AppThunk, InferActionsTypes } from '../../../../app/store'
import { ProfileFormType } from '../ui/ProfileInfo/ProfileForm/ProfileForm'
import { stopSubmit } from 'redux-form'
import { profileAPI } from '../api/profile-api'
import { ResultCodesEnum } from '../../../../api/api'
import NProgress from 'nprogress'
import { handleServerAppError, handleServerNetworkError } from '../../../../utils/error-utils'

const initialState = {
  posts: [
    {
      id: 1,
      date: new Date(2021, 11, 31, 12, 0, 3),
      postText: "It's my first post!",
      likesCount: 100,
      isLiked: false,
    },
    {
      id: 2,
      date: new Date(2023, 1, 1, 9, 5, 23),
      postText: 'Hi, how are you?',
      likesCount: 23,
      isLiked: false,
    },
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
        date: new Date(),
        postText: action.newPostText,
        likesCount: 0,
        isLiked: false,
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
    case 'PROFILE/LIKE_POST': {
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.id
            ? {
                ...p,
                likesCount: p.likesCount + 1,
                isLiked: true,
              }
            : p,
        ),
      }
    }
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
  setLikePost: (id: number, isLike: boolean) => ({ type: 'PROFILE/LIKE_POST', id, isLike }) as const,
}
//Thunks
export const getProfileData =
  (userId: string): AppThunk =>
  async (dispatch) => {
    try {
      NProgress.start()
      const data = await profileAPI.getProfile(userId)
      dispatch(profileActions.setUserProfile(data))
      NProgress.done()
    } catch (e) {
      handleServerNetworkError(e)
    }
  }
export const getProfileStatus =
  (userId: string): AppThunk =>
  async (dispatch) => {
    try {
      NProgress.start()
      const data = await profileAPI.getStatus(userId)
      dispatch(profileActions.setUserProfileStatus(data))
      NProgress.done()
    } catch (e) {
      handleServerNetworkError(e)
    }
  }
export const updateProfileStatus =
  (status: string): AppThunk =>
  async (dispatch) => {
    try {
      NProgress.start()
      const data = await profileAPI.updateStatus(status)
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(profileActions.setUserProfileStatus(status))
        NProgress.done()
      } else {
        handleServerAppError(data)
      }
    } catch (e) {
      handleServerNetworkError(e)
    }
  }
export const savePhoto =
  (file: File): AppThunk =>
  async (dispatch) => {
    try {
      NProgress.start()
      const data = await profileAPI.updatePhoto(file)
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(profileActions.savePhotoSuccess(data.data.photos))
        NProgress.done()
      } else {
        handleServerAppError(data)
      }
    } catch (e) {
      handleServerNetworkError(e)
    }
  }
export const saveProfile =
  (profile: ProfileFormType): AppThunk =>
  async (dispatch, getState) => {
    try {
      NProgress.start()
      const userId = getState().authReducer.userId
      const data = await profileAPI.updateProfile(profile)
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getProfileData(`${userId}`))
        NProgress.done()
      } else {
        const key = data.messages[0].match(/(?<=->)[^)]+/)
        key && dispatch(stopSubmit('editProfile', { contacts: { [key[0].toLocaleLowerCase()]: data.messages[0] } }))
        NProgress.done()
        return Promise.reject(data.messages[0])
      }
    } catch (e) {
      handleServerNetworkError(e)
    }
  }
//Types
export type InitialProfileReducerStateType = {
  posts: PostsType[]
  profile: ProfileType
  profileStatus: string
}
export type PostsType = {
  id: number
  date: Date
  postText: string
  likesCount: number
  isLiked: boolean
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
export type ProfileReducerType = InferActionsTypes<typeof profileActions>

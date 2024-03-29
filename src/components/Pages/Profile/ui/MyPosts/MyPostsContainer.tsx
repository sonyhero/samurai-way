import { InitialProfileReducerStateType, profileActions } from '../../model/profile-reducer'
import { MyPosts } from './MyPosts'
import { connect } from 'react-redux'
import { RootReducerType } from '../../../../../app/store'

const { addPost, deletePost, setLikePost } = profileActions

export type MapStateToPropsType = {
  profilePage: InitialProfileReducerStateType
}

export type MapDispatchToPropsType = {
  addPost: (newPostText: string) => void
  deletePost: (id: number) => void
  setLikePost: (id: number, isLike: boolean) => void
}
const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
  return {
    profilePage: state.profileReducer,
  }
}

export const MyPostsContainer = connect(mapStateToProps, {
  addPost,
  deletePost,
  setLikePost,
})(MyPosts)

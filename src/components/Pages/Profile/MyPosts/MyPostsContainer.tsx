import { InitialProfileReducerStateType, profileActions } from '../profile-reducer/profile-reducer'
import { MyPosts } from './MyPosts'
import { connect } from 'react-redux'
import { RootReducerType } from '../../../../app/store'

const { addPost, deletePost } = profileActions

export type MapStateToPropsType = {
  profilePage: InitialProfileReducerStateType
}

export type MapDispatchToPropsType = {
  addPost: (newPostText: string) => void
  deletePost: (id: number) => void
}
const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
  return {
    profilePage: state.profileReducer,
  }
}

export const MyPostsContainer = connect(mapStateToProps, {
  addPost,
  deletePost,
})(MyPosts)
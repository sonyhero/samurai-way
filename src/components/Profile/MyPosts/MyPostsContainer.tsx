import {addPostAC, InitialProfileReducerStateType, updateNewPostTextAC} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppStateType} from '../../../redux/redux-store';

type MapStateToPropsType = {
    profilePage: InitialProfileReducerStateType
}

type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newPostText: string) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profilePage: state.profileReducer
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        updateNewPostText: (newPostText: string) => {
            dispatch(updateNewPostTextAC(newPostText))
        }
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
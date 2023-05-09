import {addPost, InitialProfileReducerStateType, updateNewPostText} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';

export type MapStateToPropsType = {
    profilePage: InitialProfileReducerStateType
}

export type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newPostText: string) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profilePage: state.profileReducer
    }
}

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
//     return {
//         addPost: () => {
//             dispatch(addPostAC())
//         },
//         updateNewPostText: (newPostText: string) => {
//             dispatch(updateNewPostTextAC(newPostText))
//         }
//     }
// }
export const MyPostsContainer = connect(mapStateToProps, {
    addPost,
    updateNewPostText
})(MyPosts)
import React from 'react';
import {addPostAC, InitialProfileReducerStateType, updateNewPostTextAC} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppStateType} from '../../../redux/redux-store';

// type MyPostsContainerPropsType = {
//     posts: PostsType[]
//     dispatch: (action: ActionsTypes) => void
//     newPostText: string
//     store: StoreType
// }

// export const MyPostsContainer = () => {
//
//     const state = store.getState()
//     // const postDataMap = props.posts.map(p =>
//     //     <Post id={p.id} postText={p.postText} likesCount={p.likesCount}/>
//     // )
//
//     const addPost = () => {
//         if (state.profilePage.newPostText.trim() !== '')
//             store.dispatch(addPostAC())
//     }
//
//     const onChangePost = (newPostText: string) => {
//        store.dispatch(updateNewPostTextAC(newPostText))
//     }
//
//     // const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
//     //     if (e.key === 'Enter') {
//     //         addPost()
//     //     }
//     // }
//
//     return (
//         <MyPosts
//             addPost={addPost}
//             updateNewPostText={onChangePost}
//             newPostText={state.profilePage.newPostText}
//             posts={state.profilePage.posts}
//         />
//     )
// }

type MapStateToPropsType = {
    // newPostText: string
    // posts: PostsType[]
    profilePage: InitialProfileReducerStateType
}
// type MapDispatchToPropsType = Dispatch
type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newPostText: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        // newPostText: state.profileReducer.newPostText,
        // posts: state.profileReducer.posts
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
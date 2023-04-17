import React from 'react';
import {StoreType} from '../../../redux/state';
import {addPostAC, updateNewPostTextAC} from '../../../redux/profile-reducer';
import {MyPosts} from "./MyPosts";

type MyPostsContainerPropsType = {
    // posts: PostsType[]
    // dispatch: (action: ActionsTypes) => void
    // newPostText: string
    store: StoreType
}

export const MyPostsContainer = (props: MyPostsContainerPropsType) => {

    const state = props.store.getState()
    // const postDataMap = props.posts.map(p =>
    //     <Post id={p.id} postText={p.postText} likesCount={p.likesCount}/>
    // )

    const addPost = () => {
        if (state.profilePage.newPostText.trim() !== '')
            props.store.dispatch(addPostAC())
    }

    const onChangePost = (newPostText: string) => {
        props.store.dispatch(updateNewPostTextAC(newPostText))
    }

    // const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    //     if (e.key === 'Enter') {
    //         addPost()
    //     }
    // }

    return (
        <MyPosts
            addPost={addPost}
            updateNewPostText={onChangePost}
            newPostText={state.profilePage.newPostText}
            posts={state.profilePage.posts}
        />
    )
}
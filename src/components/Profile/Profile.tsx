import React from 'react';
import {MyPosts,} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {
    AddMessageActionType,
    AddPostActionType,
    PostsType,
    UpdateNewMessageTextActionType,
    UpdateNewPostTextActionType
} from '../../redux/state';

export type ProfilePropsType = {
    profilePage: ProfileStateType
    dispatch: (action: AddPostActionType | UpdateNewPostTextActionType | AddMessageActionType | UpdateNewMessageTextActionType) => void
    //addPost: (postMessage: string) => void
    // addPost: () => void
    // updateNewPostText: (newText: string) => void
}

export type ProfileStateType = {
    posts: PostsType[]
    newPostText: string
}
export const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts newPostText={props.profilePage.newPostText}
                     posts={props.profilePage.posts}
                     dispatch={props.dispatch}
                // addPost={props.addPost}
                // updateNewPostText={props.updateNewPostText}
            />
        </div>
    )
}
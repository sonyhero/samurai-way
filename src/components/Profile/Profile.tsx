import React from 'react';
import {MyPosts,} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {
    ActionsTypes,
    PostsType,
} from '../../redux/state';

export type ProfilePropsType = {
    profilePage: ProfileStateType
    dispatch: (action: ActionsTypes) => void
}

export type ProfileStateType = {
    posts: PostsType[]
    newPostText: string
}
export const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                newPostText={props.profilePage.newPostText}
                posts={props.profilePage.posts}
                dispatch={props.dispatch}
            />
        </div>
    )
}
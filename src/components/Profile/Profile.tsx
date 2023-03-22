import React from 'react';
import {MyPosts,} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostsType} from '../../App';

export type ProfilePropsType = {
    state: ProfileStateType
    addPost: (postMessage: string)=>void
}

export type ProfileStateType = {
    posts: PostsType[]
}
export const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.state.posts} addPost={props.addPost}/>
        </div>
    )
}
import React from 'react';
import {MyPosts,} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostsType} from './MyPosts/Post/Post';

export type ProfilePropsType = {
    posts: PostsType[]
}
export const Profile = (props: ProfilePropsType) => {

    // let [posts, setPosts] = useState<PostsType[]>([
    //     {id: 1, message: 'Hi, how are you?', likesCount: 23},
    //     {id: 2, message: 'It\'s my first post!', likesCount: 100}
    // ])

    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts}/>
        </div>
    )
}
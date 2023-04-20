import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

// export type ProfilePropsType = {
//     profilePage: ProfileStateType
//     dispatch: (action: ActionsTypes) => void
//     store: StoreType
// }

// export type ProfileStateType = {
//     posts: PostsType[]
//     newPostText: string
// }
export const Profile = () => {

    return (
        <div>
            <ProfileInfo/>
            {/*<MyPostsContainer*/}
            {/*    newPostText={props.profilePage.newPostText}*/}
            {/*    posts={props.profilePage.posts}*/}
            {/*    dispatch={props.dispatch}*/}
            {/*/>*/}
            <MyPostsContainer
                // store={props.store}
            />
        </div>
    )
}
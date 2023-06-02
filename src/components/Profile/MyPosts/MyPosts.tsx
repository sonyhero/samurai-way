import React from 'react';
import s from './MyPostsCSS.module.css'
import {Post} from './Post/Post';
import {MapDispatchToPropsType, MapStateToPropsType} from './MyPostsContainer';
import {AddPostReduxForm} from "./AddPostForm";

// type MyPostsPropsType = {
//     addPost: () => void
//     updateNewPostText: (newPostText: string) => void
//     profilePage: InitialProfileReducerStateType
// }

type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType
export const MyPosts = (props: MyPostsPropsType) => {

    const postDataMap = props.profilePage.posts.map(p =>
        <Post key={p.id} id={p.id} postText={p.postText} likesCount={p.likesCount}/>
    )

    const onAddPost = (data: { postText: string }) => {
        console.log(data.postText)
        // if (props.profilePage.newPostText.trim() !== '')

        props.addPost(data.postText)
    }

    // const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     const newPostText = e.currentTarget.value
    //     props.updateNewPostText(newPostText)
    // }

    // const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    //     if (e.key === 'Enter') {
    //         onAddPost()
    //     }
    // }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                {/*<div>*/}
                {/*    <textarea*/}
                {/*        placeholder={'Enter post text'}*/}
                {/*        value={props.profilePage.newPostText}*/}
                {/*        onChange={onPostChange}*/}
                {/*        onKeyDown={onKeyDownHandler}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <button onClick={onAddPost}>Add post</button>*/}
                {/*</div>*/}
                <AddPostReduxForm onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {postDataMap}
            </div>
        </div>
    )
}
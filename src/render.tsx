import React from 'react';
import ReactDOM from 'react-dom';
import App, {StateType} from './App';
import {addPost, updateNewPostText} from './redux/state';


export const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <App
            state={state}
            addPost={addPost}
            updateNewPostText={updateNewPostText}
        />,
        document.getElementById('root')
    );
}


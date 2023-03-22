import React from 'react';
import ReactDOM from 'react-dom';
import App, {StateType} from './App';
import {addMessage, addPost, updateNewMessageText, updateNewPostText} from './redux/state';


export const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <App
            state={state}
            addPost={addPost}
            updateNewPostText={updateNewPostText}
            addMessage={addMessage}
            updateNewMessageText={updateNewMessageText}
        />,
        document.getElementById('root')
    );
}


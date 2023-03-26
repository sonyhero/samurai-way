import React from 'react';
import ReactDOM from 'react-dom';
import App, {StateType} from './App';
import {addMessage, addPost, subscribe, updateNewMessageText, updateNewPostText} from './redux/state';
import state from './redux/state';

const rerenderEntireTree = (state: StateType) => {
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

rerenderEntireTree(state)

subscribe(()=>rerenderEntireTree(state))
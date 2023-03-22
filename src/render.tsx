import React from 'react';
import ReactDOM from 'react-dom';
import App, {StateType} from './App';
import {addPost} from './redux/state';


export const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <App
            state={state}
            addPost={addPost}
        />,
        document.getElementById('root')
    );
}


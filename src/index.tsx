import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/state';
// import {addMessage, addPost, subscribe, updateNewMessageText, updateNewPostText} from './redux/state';

const rerenderEntireTree = () => {
    ReactDOM.render(
        <App
            state={store.getState()}
            dispatch={store.dispatch.bind(store)}
            // updateNewPostText={store.updateNewPostText.bind(store)}
            // addMessage={store.addMessage.bind(store)}
            // updateNewMessageText={store.updateNewMessageText.bind(store)}
        />,
        document.getElementById('root')
    );
}

rerenderEntireTree()

store.subscribe(rerenderEntireTree)
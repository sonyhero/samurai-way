import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Props Dialogs-DialogsItem
let dialogs = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Sveta'},
    {id: 3, name: 'Viktor'},
    {id: 4, name: 'Maks'},
    {id: 5, name: 'Igor'},
]
//Props Dialogs-Message
let messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'Anton'},
    {id: 3, message: 'How are you'},
]
//Props Profile-MyPosts
let posts =  [
    {id: 1, message: 'Hi, how are you?', likesCount: 23},
    {id: 2, message: 'It\'s my first post!', likesCount: 100}
]

// let data = {
//     dialogs,
//     messages,
//     posts
// }

ReactDOM.render(
    <App
        //data={data}
        posts={posts}
        dialogs={dialogs}
        messages={messages}
    />,
  document.getElementById('root')
);
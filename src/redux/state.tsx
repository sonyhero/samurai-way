let state = {
    profilePage: {
        posts: [ //Props Profile-MyPosts
            {id: 1, message: 'Hi, how are you?', likesCount: 23},
            {id: 2, message: 'It\'s my first post!', likesCount: 100}
        ]
    },
    dialogsPage: {
        dialogs: [ // Props Dialogs-DialogsItem
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Sveta'},
            {id: 3, name: 'Viktor'},
            {id: 4, name: 'Maks'},
            {id: 5, name: 'Igor'},
        ],
        messages: [ //Props Dialogs-Message
            {id: 1, message: 'Hi'},
            {id: 2, message: 'Anton'},
            {id: 3, message: 'How are you'},
        ]
    },
    sidebar: {
        friends: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Nikita'},
            {id: 3, name: 'Eugenia'}
        ]
    }
}


export default state;
import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {DialogItemType} from './components/Dialogs/DialogItem/DialogsItem';
import {MessageType} from './components/Dialogs/Message/Message';
import {PostsType} from './components/Profile/MyPosts/Post/Post';

type AppPropsType = {
    dialogs: DialogItemType[]
    messages: MessageType[]
    posts: PostsType[]
}

type PropsType = {
    data: AppPropsType
}

const App = (props: PropsType) => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    {/*<Route path="/dialogs" component={Dialogs}/>*/}
                    {/*<Route path="/profile" component={Profile}/>*/}
                    {/*<Route path="/news" component={News}/>*/}
                    {/*<Route path="/music" component={Music}/>*/}
                    {/*<Route path="/settings" component={Settings}/>*/}

                    <Route path="/dialogs" render={()=> <Dialogs
                        dialogs={props.data.dialogs}
                        messages={props.data.messages}
                    />}/>
                    <Route path="/profile" render={()=> <Profile
                        posts={props.data.posts}
                    />}/>
                    <Route path="/news" render={()=> <News/>}/>
                    <Route path="/music" render={()=> <Music/>}/>
                    <Route path="/settings" render={()=> <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

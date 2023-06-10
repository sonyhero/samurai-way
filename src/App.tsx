import React, {ComponentType} from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {Route, withRouter} from 'react-router-dom';
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {UsersContainer} from './components/Users/UsersContainer';
import {ProfileContainer} from './components/Profile/ProfileContainer';
import {HeaderContainer} from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {getAuthUserData} from './redux/auth-reducer';
import {compose} from 'redux';

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" render={() => <DialogsContainer
                    />}/>
                    <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>
                    <Route path="/login" render={() => <Login/>}/>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
//     return {
//         isAuth: state.authReducer.isAuth,
//         login: state.authReducer.login,
//     }
// }

export default compose<ComponentType>(
    withRouter,
    connect(null, {getAuthUserData}))(App)

// type MapStateToPropsType = {
//     isAuth: boolean
//     login: string | null
// }

type MapDispatchToPropsType = {
    getAuthUserData: () => void
}

type AppPropsType = MapDispatchToPropsType



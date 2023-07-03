import React, {ComponentType} from 'react';
import './App.css';
import {Navbar} from '../components/Navbar/Navbar';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import {News} from '../components/News/News';
import {Music} from '../components/Music/Music';
import {Settings} from '../components/Settings/Settings';
import {HeaderContainer} from '../components/Header/HeaderContainer';
import Login from '../components/Login/Login';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './app-reducer';
import {RootReducerType, store} from './store';
import {Preloader} from '../components/common/Preloader/Preloader';
import {withSuspense} from '../hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('../components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('../components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('../components/Users/UsersContainer'))

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        return (!this.props.initialized)
            ? <Preloader/>
            : (
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Switch>
                            {/*<Route path="/dialogs" render={() => <DialogsContainer/>}/>*/}
                            {/*<Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>*/}
                            {/*<Route path="/users" render={() => <UsersContainer/>}/>*/}
                            {/*<Route exact path="/" render={() => <ProfileContainer/>}/>*/}

                            <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                            <Route path="/users" render={withSuspense(UsersContainer)}/>
                            <Route exact path="/" render={withSuspense(ProfileContainer)}/>

                            <Route path="/news" render={() => <News/>}/>
                            <Route path="/music" render={() => <Music/>}/>
                            <Route path="/settings" render={() => <Settings/>}/>
                            <Route path="/login" render={() => <Login/>}/>
                            <Route path="*" render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                        </Switch>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        initialized: state.appReducer.initialized
    }
}

const AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

export const AppMain = () => <BrowserRouter>
    <Provider store={store}>
        <AppContainer/>
    </Provider>
</BrowserRouter>

type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}
type AppPropsType = MapDispatchToPropsType & MapStateToPropsType



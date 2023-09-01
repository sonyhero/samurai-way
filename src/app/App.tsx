import React, { ComponentType } from 'react'
import s from './App.module.scss'
import { Navbar } from '../components/Navbar/Navbar'
import { HashRouter, withRouter } from 'react-router-dom'
import { HeaderContainer } from '../components/Header/HeaderContainer'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './app-reducer'
import { RootReducerType, store } from './store'
import { Preloader } from '../components/common/Preloader/Preloader'
import { Routing } from './Routing'
import 'nprogress/nprogress.css'

class App extends React.Component<AppPropsType> {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    return !this.props.initialized ? (
      <Preloader />
    ) : (
      <div>
        <HeaderContainer />
        <div className={s.appBox}>
          {this.props.isAuth && <Navbar />}
          <Routing />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
  return {
    initialized: state.appReducer.initialized,
    isAuth: state.authReducer.isAuth,
  }
}

const AppContainer = compose<ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App)

export const AppMain = () => (
  <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
)

//Types
type MapStateToPropsType = {
  initialized: boolean
  isAuth: boolean
}
type MapDispatchToPropsType = {
  initializeApp: () => void
}
type AppPropsType = MapDispatchToPropsType & MapStateToPropsType

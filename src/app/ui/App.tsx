import React, { ComponentType } from 'react'
import s from './App.module.scss'
import { Navbar } from '../../components/ui/navbar/Navbar'
import { HashRouter, withRouter } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from '../model/app-reducer'
import { RootReducerType, store } from '../store'
import { Preloader } from '../../components/ui/preloader/Preloader'
import { Routing } from '../../components/routing/Routing'
import 'nprogress/nprogress.css'
import 'react-toastify/dist/ReactToastify.css'
import { Toast } from '../../components/ui/toast-notification/Toast'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5'
import queryString from 'query-string'
import { Header } from '../../components/ui/header/Header'

class App extends React.Component<AppPropsType> {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    return (
      <>
        <Toast />
        <Header />
        {!this.props.initialized ? (
          <Preloader />
        ) : (
          <div className={s.appBox}>
            {this.props.isAuth && <Navbar />}
            <Routing />
          </div>
        )}
      </>
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
    <QueryParamProvider
      adapter={ReactRouter5Adapter}
      options={{
        searchStringToObject: queryString.parse,
        objectToSearchString: queryString.stringify,
      }}
    >
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </QueryParamProvider>
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

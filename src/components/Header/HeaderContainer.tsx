import React from 'react'
import { Header } from './Header'
import { connect } from 'react-redux'
import { RootReducerType } from '../../app/store'
import { logout } from '../Pages/Login/auth-reducer'

export class HeaderAPIComponent extends React.Component<HeaderAPIComponentType> {
  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
  return {
    isAuth: state.authReducer.isAuth,
    login: state.authReducer.login,
  }
}

export const HeaderContainer = connect(mapStateToProps, {
  logout,
})(HeaderAPIComponent)
//Types
type MapStateToPropsType = {
  isAuth: boolean
  login: string | null
}
type MapDispatchToPropsType = {
  // getAuthUserData: () => void
  logout: () => void
}
export type HeaderAPIComponentType = MapStateToPropsType & MapDispatchToPropsType

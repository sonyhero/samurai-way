import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {RootReducerType} from '../../redux/redux-store';
import {getAuthUserData} from '../../redux/auth-reducer';

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchToPropsType = {
    // setAuthUserData: (userId: string, email: string, login: string) => void
    getAuthUserData: () => void
}

export type HeaderAPIComponentType = MapStateToPropsType & MapDispatchToPropsType

export class HeaderAPIComponent extends React.Component<HeaderAPIComponentType> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        isAuth: state.authReducer.isAuth,
        login: state.authReducer.login,
    }
}

export const HeaderContainer = connect(mapStateToProps, {
    // setAuthUserData,
    getAuthUserData
})(HeaderAPIComponent)
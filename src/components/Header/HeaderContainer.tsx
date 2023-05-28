import React from 'react';
import {Header} from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {RootReducerType} from '../../redux/redux-store';
import {setAuthUserData} from '../../redux/auth-reducer';

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchToPropsType = {
    setAuthUserData: (userId: string, email: string, login: string) => void
}

export type HeaderAPIComponentType = MapStateToPropsType & MapDispatchToPropsType

export class HeaderAPIComponent extends React.Component<HeaderAPIComponentType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    const {id, email, login} = response.data.data
                    this.props.setAuthUserData(String(id), email, login)
                }
            })
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

export const HeaderContainer = connect(mapStateToProps, {setAuthUserData})(HeaderAPIComponent)
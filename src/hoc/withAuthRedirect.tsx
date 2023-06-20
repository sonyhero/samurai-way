import React, {ComponentType} from 'react';
import {Redirect} from 'react-router-dom';
import {RootReducerType} from '../app/store';
import {connect} from 'react-redux';

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        isAuth: state.authReducer.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>){

    const RedirectComponent = (props: MapStateToPropsType) => {

        const {isAuth, ...restProps} = props

        if (!isAuth) {
            return <Redirect to={'/login'}/>
        }
        return <Component {...restProps as T}/>
    }

    return connect(mapStateToProps)(RedirectComponent)
}




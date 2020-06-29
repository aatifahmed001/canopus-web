import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { WrapLayout } from '../components';

export const PrivateRoute = ({ component: Component,userLoggedIn, ...rest }) => {

    return (<Route
        {...rest}
        render={props =>
            userLoggedIn ? <WrapLayout component={Component} renderProps={props} /> : <Redirect to={"/login"} />
        }
    />);
};
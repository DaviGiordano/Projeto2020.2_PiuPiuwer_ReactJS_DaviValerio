import React from 'react';
import { Route as ReactRouter, RouteProps as ReactRouteProps, Redirect } from 'react-router-dom';

import {useAuth} from '../contexts/auth';
interface RouteProps extends ReactRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate= false, component:Component, ...rest }) => {
    const { token } = useAuth();
    return(
        <ReactRouter 
        {...rest}
        render={({ location }) => { 
            return isPrivate === !!token
            ? (
                <Component/>
            ) : (
                <Redirect
                    to={{
                        pathname: isPrivate? '/login' : 'feed',
                        state: { from: location }
                    }}
                />
            );
        }}
    />

    )

};

export default Route;

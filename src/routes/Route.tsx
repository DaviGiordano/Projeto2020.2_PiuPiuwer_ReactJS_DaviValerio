import React, { useContext } from 'react';
import { Route as ReactRouter, RouteProps as ReactRouteProps, Redirect } from 'react-router-dom';

import AuthContext from '../contexts/auth';
//import { useAuth } from '../hooks/auth';
//ainda não criei a função useAuth, que retorna em seu context o objeto user.
interface RouteProps extends ReactRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate= false, component:Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    return(
        <ReactRouter //em return utilizaremos o componente ReactRouter, que receberá todas as props passadas para Route e a propriedades render
        {...rest}
        render={({ location }) => { //render: função executada quando o endpoint da URL correspode ao path, ou seja, no lugar de renderizarmos um component, executaremos uma função que retornará o componente a ser renderizado
            return isPrivate === !!user //dupla negação
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

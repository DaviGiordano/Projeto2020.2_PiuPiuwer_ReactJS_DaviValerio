import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Feed from '../pages/Feed';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/feed" component={Feed} />
            <Route path="/login" component={Login} />
        </Switch>
    );
}

export default Routes;
/**/

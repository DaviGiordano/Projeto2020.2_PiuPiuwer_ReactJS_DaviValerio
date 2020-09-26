import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Feed from '../pages/Feed';
import Redirection from './redirect';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/feed" component={Feed} isPrivate />
            <Route component={Redirection}/>
        </Switch>
    );
}

export default Routes;
/**/

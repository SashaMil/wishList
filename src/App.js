import React from 'react';
import axios from 'axios';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Register from './containers/Register/Register';
import Login from './containers/Login/Login'
import Home from './components/Home/Home';

const App = () => (
    <div>
        <Router>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route
                    path="/login"
                    component={Login}
                />
                <Route
                    path="/register"
                    component={Register}
                />
                <Route
                    path="/home"
                    component={Home}
                />
                <Route render={() => <h1>404</h1>} />
            </Switch>
        </Router>
    </div>
);

export default App;

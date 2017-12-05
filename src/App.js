import React, {Component} from 'react';
import HomePage from './components/homePage/HomePage';
import LoginPage from './containers/logon_container';
import NoMatch from './components/common/NoMatch';
import {
    Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {checkUser} from './util/UserStore';
import {setCookie} from './util/CookieUtil';

const history = createHistory();

class App extends Component {
    constructor() {
        super();
        checkUser(history);
        setCookie('client_secret', 'NjkyZGQxODc4MzhhOGZiZTFmM2ViNDhlZjZiNjgxMDU');
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route exact path="/" render={() => (
                            <Redirect to="/login"/>
                        )}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/home" component={HomePage}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

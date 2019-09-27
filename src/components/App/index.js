import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../.app-login-components/SignUp';
import SignInPage from '../.app-login-components/SignIn';
import PasswordForgetPage from '../.app-login-components/PasswordForget';
import PasswordChangePage from '../.app-login-components/PasswordChange';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import NoAccess from '../.app-core/no-access';

import * as ROUTES from '../../constants/routes';
//import { withFirebase } from '../Firebase';

import { withAuthentication } from '../.app-core/Session';
import { Container } from 'reactstrap';

class App extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            authUser: null,
        }
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        });
    }

    //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
    componentWillUnmount() {
        this.listener();   
    }

    render() {
        return(
            <Router>
                <div>
                    <Navigation />
                    <Container>
                        <Route exact path={ROUTES.LANDING} component={HomePage} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route
                            path={ROUTES.PASSWORD_FORGET}
                            component={PasswordForgetPage}
                        />
                        <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChangePage} />
                        <Route path={ROUTES.HOME} component={HomePage} />
                        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                        <Route path={ROUTES.ADMIN} component={AdminPage} />
                        <Route path={ROUTES.DENY} component={NoAccess} />
                    </Container>
                </div>
            </Router>
        );
    }
}

export default withAuthentication(App);
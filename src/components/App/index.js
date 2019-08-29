import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
//import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
//import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
//import { withFirebase } from '../Firebase';

import { withAuthentication } from '../Session';
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

                    <hr />
                    <Container>
                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.HOME} component={HomePage} />
                        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                        <Route path={ROUTES.ADMIN} component={AdminPage} />
                    </Container>
                </div>
            </Router>
        );
    }
}

export default withAuthentication(App);
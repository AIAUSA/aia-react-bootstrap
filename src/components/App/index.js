import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignInPage from '../.app-login-components/SignIn';
import NoAccess from '../.app-core/no-access';

//import { withFirebase } from '../Firebase';

import { withAuthentication } from '../.app-core/Session';


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('../.coreui/containers/DefaultLayout'));

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
                <React.Suspense fallback={loading()}>
                <Switch>
                    <Route exact path="/sign-in" component={SignInPage} />
                    <Route exact path="/deny" component={NoAccess} />
                    <Route path="/"  render={props => <DefaultLayout {...props}/>} />
                </Switch>
                </React.Suspense>
            </Router>
        );
    }
}

export default withAuthentication(App);
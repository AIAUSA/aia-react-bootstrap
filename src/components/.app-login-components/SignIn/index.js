import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../../.app-core/Firebase';
import * as ROUTES from '../../../constants/routes'
import * as ROLES from '../../../constants/roles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'

const SignInPage = () => (
  <div className="center-text h-100 row align-items-center mt-5">
    <div className="form-base">
      <img className="mb-4" src="aia-logo.png" alt="" width="156" />
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      {/* <SignInForm /> */}
      <SignInGoogle />
      {/* <SignInFacebook />  */}
      <p class="mt-5 mb-3 text-muted">©2019</p>
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};


const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/dashboard');
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
      <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" /> 
      <label htmlFor="inputPassword" className="sr-only">Password</label>
      <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button disabled={isInvalid} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      {error && <p>{error.message}</p>}
      <PasswordForgetLink />
      <SignUpLink />
      <p className="text-muted mt-1">--------------- OR ---------------</p>
      
      </form>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        if (socialAuthUser.additionalUserInfo.isNewUser) {
          var role = '';
          this.props.firebase.checkRole(socialAuthUser.user.email.replace("@","").replace(/\./g,""))
            .on('value', snapshot => {
              const dbrole = snapshot.val();
              if (dbrole === undefined || dbrole === null || dbrole === '') { 
                //Set DEFAULT ROLE
                role = ROLES.REGISTERED 
                // OR DENY ANY ACCESS
                //this.props.history.push(ROUTES.DENY)
              } else {
                role = dbrole.role;
              }

              // Create a user in your Firebase Realtime Database too
              return this.props.firebase
                .user(socialAuthUser.user.uid)
                .set({
                  username: socialAuthUser.user.displayName,
                  email: socialAuthUser.user.email,
                  roles: role,
              });
            });
        }
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push('/dashboard');
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <div className="mt-2">
        <button onClick={this.onSubmit} className="btn btn-lg btn-block btn-social btn-google">
          <FontAwesomeIcon icon={faGoogle} />    Sign In with Google
        </button>

        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        if (socialAuthUser.additionalUserInfo.isNewUser) {
          var role = '';
          this.props.firebase.checkRole(socialAuthUser.user.email.replace("@","").replace(/\./g,""))
            .on('value', snapshot => {
              const dbrole = snapshot.val();
              if (dbrole === undefined || dbrole === null || dbrole === '') { 
                //Set DEFAULT ROLE
                role = ROLES.REGISTERED 
                // OR DENY ANY ACCESS
                //this.props.history.push(ROUTES.DENY)
              } else {
                role = dbrole.role;
              }

              // Create a user in your Firebase Realtime Database too
              return this.props.firebase
                .user(socialAuthUser.user.uid)
                .set({
                  username: socialAuthUser.user.displayName,
                  email: socialAuthUser.user.email,
                  roles: role,
              });
            });
        }
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push('/dashboard');
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <div className="mt-2">
        <button onClick={this.onSubmit} className="btn btn-lg btn-block btn-social btn-facebook">
          <FontAwesomeIcon icon={faFacebook} />    Sign In with Facebook
        </button>

        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

export default SignInPage;
export { SignInForm, SignInGoogle, SignInFacebook };
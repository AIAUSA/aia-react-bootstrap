import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'

const formClass = {
  width: '100%',
  maxWidth: '330px',
  padding: '15px',
  margin: 'auto'
}

const bodyClass = { textAlign: 'center' }

const SignInPage = () => (
  <div style={bodyClass} className="h-100 row align-items-center">
    <form style={formClass}>
      <img class="mb-4" src="/aia-logo.png" alt="" width="156" />
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <SignInForm />
      <SignInGoogle />
      <SignInFacebook /> 
      {/* <PasswordForgetLink />
      <SignUpLink /> */}
      <p class="mt-5 mb-3 text-muted">©2019</p>
    </form>
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
        this.props.history.push(ROUTES.HOME);
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
        <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" /> 
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p className="text-muted mt-1">--------------- OR ---------------</p>
        {error && <p>{error.message}</p>}
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
              console.log(dbrole);
              if (dbrole === undefined || dbrole === null || dbrole === '') { 
                //Set DEFAULT ROLE
                role = ROLES.REGISTERED 
                // OR DENY ANY ACCESS
                //this.props.history.push(ROUTES.DENY)
              } else {
                role = dbrole.role;
              }

              console.log(role);
         
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
        this.props.history.push(ROUTES.HOME);
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
        <a onClick={this.onSubmit} className="btn btn-lg btn-block btn-social btn-google">
          <FontAwesomeIcon icon={faGoogle} />    Sign In with Google
        </a>

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
              console.log(dbrole);
              if (dbrole === undefined || dbrole === null || dbrole === '') { 
                //Set DEFAULT ROLE
                role = ROLES.REGISTERED 
                // OR DENY ANY ACCESS
                //this.props.history.push(ROUTES.DENY)
              } else {
                role = dbrole.role;
              }

              console.log(role);
         
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
        this.props.history.push(ROUTES.HOME);
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
        <a onClick={this.onSubmit} className="btn btn-lg btn-block btn-social btn-facebook">
          <FontAwesomeIcon icon={faFacebook} />    Sign In with Facebook
        </a>

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
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInGoogle />
  </div>
);

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
          var role = {};
          //See if a pre-determined role exist
          this.props.firebase.checkRole(socialAuthUser.user.email.replace("@",""))
            .once('value')
            .then(snapshot => {
              console.log(snapshot.val());
              role = snapshot.val();
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
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

export default SignInPage;
export { SignInGoogle }; 
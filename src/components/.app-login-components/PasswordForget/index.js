import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../.app-core/Firebase';
import * as ROUTES from '../../../constants/routes';

const PasswordForgetPage = () => (
  <div className="center-text h-100 row align-items-center">
    <form className="form-base">
      <img class="mb-4" src="/aia-logo.png" alt="" width="156" />
      <h1 class="h3 mb-3 font-weight-normal">Forget Your Password?</h1>
      <PasswordForgetForm />
    </form>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          className="form-control mb-3"
        />
        <button disabled={isInvalid} type="submit" className="btn btn-large btn-primary btn-block mb-3">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
        <a href="/signin"> Return to login page</a>
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
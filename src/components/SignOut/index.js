import React from 'react';

import { withFirebase } from '../Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const SignOutButton = ({ firebase }) => (
  <a className="nav-link" onClick={firebase.doSignOut}>
    <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
  </a>
);

export default withFirebase(SignOutButton);
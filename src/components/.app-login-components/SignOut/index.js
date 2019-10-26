import React from 'react';
import { DropdownItem } from 'reactstrap';
import { withFirebase } from '../../.app-core/Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const SignOutButton = ({ firebase }) => (
  <DropdownItem><a href="#" className="nav-link" onClick={firebase.doSignOut}><i className="fa fa-lock"></i> Logout</a></DropdownItem>
);

export default withFirebase(SignOutButton);
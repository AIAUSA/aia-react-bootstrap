import React, { Component } from 'react';
import { compose } from 'recompose';
import * as ROLES from '../../../../constants/roles';
import { withFirebase } from '../../../.app-core/Firebase';
import { AuthUserContext, withAuthorization } from '../../../.app-core/Session';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import SignOutButton from '../../../.app-login-components/SignOut';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
//import logo from '../../assets/img/brand/logo.svg'
//import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    var condition = authUser => authUser && authUser.roles && authUser.roles.length > 0;

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <AuthUserContext.Consumer>
        { authUser => 
            condition(authUser) ? (
              <React.Fragment>
                <Nav className="d-md-down-none" navbar>
                  <NavItem className="px-3">
                    <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
                  </NavItem>
                  <NavItem className="px-3">
                    <Link to="/account" className="nav-link">Account</Link>
                  </NavItem>
                  <NavItem className="px-3">
                    <NavLink to="/admin" className="nav-link">Site Administration</NavLink>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto mr-5" navbar>
                  <UncontrolledDropdown nav direction="down">
                    <DropdownToggle nav>
                      { authUser.username }
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem><Link to="/admin"><i className="fa fa-wrench"></i> Admin</Link></DropdownItem>
                      <DropdownItem divider />
                      <SignOutButton />
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                {/*<AppAsideToggler className="d-lg-none" mobile />*/}
              </React.Fragment>
            ) : <div></div>
        }
      </AuthUserContext.Consumer>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const condition = authUser => authUser && authUser.roles.length > 0 && (!!authUser.roles.includes(ROLES.ADMIN)|| !!authUser.roles.includes(ROLES.SUPERADMIN));
export default compose(withAuthorization(condition), withFirebase)(DefaultHeader);

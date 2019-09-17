import React from 'react';
import { NavLink } from 'react-router-dom';

import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {AuthUserContext} from '../Session';
//import { withFirebase } from '../Firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser, faHome } from '@fortawesome/free-solid-svg-icons'


import { Container, Nav, NavItem, Navbar, NavbarToggler, Collapse } from 'reactstrap';

class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    var condition = authUser => authUser && authUser.roles && authUser.roles.length > 0;

    return (
      <div>
        <AuthUserContext.Consumer>
          { authUser => 
            condition(authUser) ? 
              <NavigationAuth isOpen={this.state.isOpen} toggle={this.toggle} /> 
              : <NavigationNonAuth />
          }
        </AuthUserContext.Consumer>
      </div>
    )
  }

}

  
  const NavigationAuth = ({isOpen, toggle}) => (
      <Navbar className="header navbar navbar-expand-md navbar-dark bg-dark">
        <Container>
          <a className="mr-auto navbar-brand" href="/">AIA React</a>
          <NavbarToggler onClick={toggle} />
          <Collapse className="navbar-collapse" isOpen={isOpen}>
            <Nav className="navbar-nav ml-sm-auto">
              <NavItem>
                <NavLink className="nav-link" to={ROUTES.HOME}>
                <FontAwesomeIcon icon={faHome} />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to={ROUTES.ACCOUNT}>
                <FontAwesomeIcon icon={faUser} />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to={ROUTES.ADMIN}>
                  <FontAwesomeIcon icon={faCog} />
                </NavLink>
              </NavItem>
              <NavItem>
                <SignOutButton />
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    
  );
  
  const NavigationNonAuth = () => (
      <div></div>
    // <Nav className="header navbar navbar-expand-md navbar-light bg-faded">
    //     <Container>
    //       <a className="mr-auto navbar-brand" href="/">AIA React</a>
    //       <NavbarToggler />
    //       <Collapse>
    //         <Navbar className="navbar-nav ml-small-auto">
    //           <NavItem>
    //             <NavLink className="nav-link" to={ROUTES.LANDING}>Landing</NavLink>
    //           </NavItem>
    //           <NavItem>
    //             <NavLink className="nav-link" to={ROUTES.SIGN_IN}>Log In</NavLink>
    //           </NavItem>
    //         </Navbar>
    //       </Collapse>
    //     </Container>
    //   </Nav>
  );
  
  export default Navigation;
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';
import {AuthUserContext} from '../Session';
//import { withFirebase } from '../Firebase';

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
    return (
      <div>
        <AuthUserContext.Consumer>
          { authUser => 
            authUser ? <NavigationAuth isOpen={this.state.isOpen} toggle={this.toggle} /> : <NavigationNonAuth />
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
                <NavLink className="nav-link" to={ROUTES.LANDING}>Landing</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to={ROUTES.HOME}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to={ROUTES.ACCOUNT}>Account</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to={ROUTES.ADMIN}>Admin</NavLink>
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
    <Nav className="header navbar navbar-expand-md navbar-light bg-faded">
        <Container>
          <a className="mr-auto navbar-brand" href="/">AIA React</a>
          <NavbarToggler />
          <Collapse>
            <Navbar className="navbar-nav ml-small-auto">
              <NavItem>
                <NavLink className="nav-link" to={ROUTES.LANDING}>Landing</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to={ROUTES.SIGN_IN}>Log In</NavLink>
              </NavItem>
            </Navbar>
          </Collapse>
        </Container>
      </Nav>
  );
  
  export default Navigation;
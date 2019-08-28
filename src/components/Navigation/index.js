import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';
import {AuthUserContext} from '../Session';
//import { withFirebase } from '../Firebase';

import { Container, Nav, NavItem, Navbar } from 'reactstrap';

const Navigation = () => (
    <div>
      <AuthUserContext.Consumer>
        { authUser => 
           authUser ? <NavigationAuth /> : <NavigationNonAuth />
        }
      </AuthUserContext.Consumer>
    </div>

  );
  
  const NavigationAuth = () => (
      <Nav className="header navbar navbar-expand-md navbar-light bg-faded">
        <Container>
          <a class="mr-auto navbar-brand" href="/">AIA React</a>
          <Navbar className="navbar-nav ml-small-auto">
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
          </Navbar>
        </Container>
      </Nav>
    
  );
  
  const NavigationNonAuth = () => (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  );
  
  export default Navigation;
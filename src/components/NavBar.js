import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/Auth';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authenticated = () => (
    <Nav className="ml-auto" navbar>
      <NavItem><Link className="nav-link mr-3" to="/boards">Projects</Link></NavItem>
      <NavItem><Link className="nav-link mr-3" to="/add-pins">Actors</Link></NavItem>
    </Nav>
  );

  return (
    <div className="navbar-container mx-auto">
      <Navbar color="dark" light expand="xl" sticky="top">
        <Nav className="mr-auto" navbar>
          <NavbarBrand href="/">AR</NavbarBrand>
          <NavItem><a className="nav-link mr-3 ml-3" to="/">Home</a></NavItem>
        </Nav>
        <NavbarToggler onClick={toggle} /><Collapse isOpen={isOpen} navbar>
          { user && authenticated()}

          {user !== null && <div className='auth-btn-container ml-2 mr-4'>
            {user ? <Button className="signOut-btn ml-3" color='danger' size="sm" onClick={signOutUser}>Sign Out</Button>
              : <Button className="sign-in-btn ml-3" color='danger' size="sm" onClick={signInUser}>Sign In</Button>
            }
          </div>
          }
        </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any
};

export default NavBar;

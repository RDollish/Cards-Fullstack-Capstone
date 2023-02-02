import React from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logout } from '../modules/authManager';
import './Header.css'

export default function Header({ isLoggedIn }) {

  return (
    <div>
      <Navbar color="light" light>
        <NavbarBrand tag={RRNavLink} to="/">lousy cards</NavbarBrand>
          <Nav className="ml-auto" navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/usercards">My Cards</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/addcard">Make a Card</NavLink>
                </NavItem>
              </>
            }
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
      </Navbar>
    </div>
  );
}

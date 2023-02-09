import React from 'react';
import { Link } from "react-router-dom";
import { logout } from '../modules/authManager';
import './Header.css'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Header({ isLoggedIn }) {


  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="a" href="/" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }} className="logo">
            Logo Here
          </Typography>
          <Typography variant="h6" component="a" href="/" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }} className="title">
            lousy cards
          </Typography>
          {isLoggedIn ? (
            <>
              <Link to="/">
                <Button color="inherit" className="home" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', textDecoration: 'none' }}>Home</Button>
              </Link>
              <Link to="/usercards">
                <Button color="inherit" className="profile" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', textDecoration: 'none' }}>My Cards</Button>
              </Link>
              <Link to="/addcard">
                <Button color="inherit" className="make" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', textDecoration: 'none' }}>Make a Card</Button>
              </Link>
              <Typography variant="h6" component="a" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }} className="blank">
                lousy cards
              </Typography>
              <Button color="inherit" className="logout" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', textDecoration: 'none' }} onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" component="a" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }} className="blank">
                lousy cards
              </Typography>
              <Link to="/login">
                <Button color="inherit" className="login" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', textDecoration: 'none' }}>Login</Button>
              </Link>
              <Link to="/register">
                <Button color="inherit" className="register" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', textDecoration: 'none' }}>Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
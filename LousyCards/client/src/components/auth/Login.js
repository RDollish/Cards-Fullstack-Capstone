import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../modules/authManager";
import "./Login.css"
import { LoginCanvas } from "./LoginCanvas";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { register } from "../../modules/authManager";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password"));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        displayName,
        email,
      };
      register(userProfile, password).then(() => navigate("/"));
    }
  };

  return (
    <div className="envelope">
      <Form className="login-form" onSubmit={loginSubmit}>
        <fieldset className="login">
          <FormGroup className="email">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="text"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="password">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button className="login">Login</Button>
          </FormGroup>
          <em>
            Not registered? <span onClick={handleClickOpen} style={{cursor: "pointer"}}>Register</span>
          </em>
        </fieldset>
      </Form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <Form className="register-form" onSubmit={registerSubmit}>
            <fieldset className="register">
              <FormGroup>
                <Label htmlFor="userName">Username</Label>
                <Input
                  id="userName"
                  type="text"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Button className="register">Register</Button>
              </FormGroup>
            </fieldset>
          </Form>
        </DialogContent>
      </Dialog>
      <LoginCanvas/>
    </div>
  )
};

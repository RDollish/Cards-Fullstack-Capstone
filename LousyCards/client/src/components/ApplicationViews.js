import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserDetails from "./user/UserDetails";
import CardList from "./card/CardList";
import CardForm from "./card/CardForm"
import CardEdit from "./card/CardEdit"

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <CardList /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />



          <Route path="users">
            <Route index
              element={isLoggedIn ? <CardList />
                : <Navigate to="/login" />} />
          </Route>
          <Route path="usercards" element={isLoggedIn ? <UserDetails /> : <Navigate to="/login"/>} />
          <Route path="addcard" element={isLoggedIn ? <CardForm /> : <Navigate to="/login" />} />
          <Route path="edit/*" element={isLoggedIn ? <CardEdit /> : <Navigate to="/login" />} />

          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};

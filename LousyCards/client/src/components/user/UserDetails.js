import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { getUserDetailsById } from "../../modules/userProfileManager";
import { Typography, Tabs, Tab, Grid } from "@mui/material";
import UserCard from "../card/UserCard";
import UserFavorite from "../card/UserFavorite";
import { getLastFiveCommentsByUserId } from "../../modules/commentManager";
import './UserDetails.css'

const UserDetails = () => {
  const [value, setValue] = useState(0);
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState({});
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    setUserId(Number(userIdFromLocalStorage));
  }, []);


  useEffect(() => {
    if (userId > 0) {
      getUserDetailsById(userId)
        .then((userData) => {
          setUser(userData);
          getLastFiveCommentsByUserId(userId)
            .then((comments) => {
              setUserComments(comments);
            });
        });
    }
  }, [userId]);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
<Grid container spacing={1}>
  <Grid item xs={2.5}>
    <Table>
      <tbody>
        <tr>
          <th style={{ fontFamily: "monospace, sans-serif"}}>Username</th>
          <td style={{ fontFamily: "monospace, sans-serif"}}>{user.displayName}</td>
        </tr>
        <tr>
          <th style={{ fontFamily: "monospace, sans-serif"}}>Email</th>
          <td style={{ fontFamily: "monospace, sans-serif"}}>{user.email}</td>
        </tr>
        <tr>
          <td colSpan={2} style={{ fontFamily: "monospace, sans-serif"}}><b>Your Recent Comments:</b></td>
        </tr>
        {userComments.map((comment) => (
          <tr key={comment.id}>
            <td colSpan={2} className="comments" style={{ fontFamily: "monospace, sans-serif"}}>{comment.comment}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={2} className="comments" style={{ fontFamily: "monospace, sans-serif"}}>Wow, I should hire Renée Doll!</td>
        </tr>
        <tr>
          <td colSpan={2} className="comments" style={{ fontFamily: "monospace, sans-serif"}}>Here's how to reach her:</td>
        </tr>
        <tr>
          <td colSpan={2} className="comments" style={{ fontFamily: "monospace, sans-serif"}}>
            <a href="https://www.linkedin.com/in/ren%C3%A9e-doll/">LinkedIn</a>
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="comments" style={{ fontFamily: "monospace, sans-serif"}}>
            <a href="https://github.com/RDollish">Github</a>
          </td>
        </tr>
      </tbody>
    </Table>
  </Grid>
      <Grid item xs={8}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="My Cards" />
          <Tab label="Favorited Cards" />
        </Tabs>
        {value === 0 && (
          <div className="tabContainer">
            <UserCard />
          </div>
        )}
        {value === 1 && (
          <div className="tabContainer">
            <UserFavorite/>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default UserDetails

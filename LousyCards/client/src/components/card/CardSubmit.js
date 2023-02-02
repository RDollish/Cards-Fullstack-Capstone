import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { AddCard } from "../../modules/cardManager";
import { getAllOccasions } from "../../modules/occasionManager";

export default function SaveCard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("Untitled");
  const [description, setDescription] = useState("No description provided.");
  const [imageUrl, setImageUrl] = useState();
  const [occasions, setOccasions] = useState([]);
  const [occasion, setOccasion] = useState();
  const [userId, setUserId] = useState();
  
  useEffect(() => {
    getAllOccasions().then(results => {
      setOccasions(results);
    });
  }, []);

  const registerClick = (e) => {
    e.preventDefault();
      const Card = {
        title,
        description,
        imageUrl,
        occasion,
        userId
      };
      AddCard(Card).then(() => navigate("/"));
  };

    return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
  <Input type="select" id="occasion" onChange={(e) => setOccasion(e.target.value)}>
  <option value="">Select an Occasion</option>
    {occasions.map(occ => (
    <option key ={occ.id} value={occ.id}>{occ.name}</option>
    ))}
  </Input>
</FormGroup>
        <FormGroup>
          <Button id="save">Save</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}


import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { addCard, editCard } from "../../modules/cardManager";
import { getAllOccasions } from "../../modules/occasionManager";


export default function SaveCard(props) {
  const navigate = useNavigate();
  const { cardId, canvas, card } = props;
  

  const [title, setTitle] = useState("Untitled");
  const [description, setDescription] = useState("No description provided.");
  const [imageUrl, setImageUrl] = useState("");
  const [occasions, setOccasions] = useState([]);
  const [occasionId, setOccasion] = useState("");
  const [userId, setUserId] = useState();
  const [cardDetails, setCardDetails] = useState();

  useEffect(() => {
    if (card?.title.length > 1)
    {
    setTitle(card.title)
    setDescription(card.description)
    setOccasion(card.occasionId)
  }
  }, [card]);

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    setUserId(Number(userIdFromLocalStorage));
  }, []);
  
  useEffect(() => {
    getAllOccasions().then(results => {
      setOccasions(results);
    });
  }, []);

  useEffect(() => {
    if (imageUrl && cardDetails !== null) {
      const Card = {
        title,
        description,
        imageUrl,
        occasionId,
        userId,
        cardDetails
      };
      if (card) {
        editCard(cardId, Card).then(() => [navigate("/")]);
      } else {
        addCard(Card).then(() => [ navigate("/")]);
      }
    }
  }, [imageUrl, cardDetails]);

  const registerClick = async (e) => {
    e.preventDefault();
    setImageUrl(canvas.toDataURL('png'));
    setCardDetails(JSON.stringify(canvas.toJSON()));
  };

  

    return (
    <Form className="card-form-fields" onSubmit={registerClick}>
      <fieldset className="card-form-fields">
        <FormGroup>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
  <Input type="select" id="occasion" value={occasionId} defaultValue={occasionId} onChange={(e) => setOccasion(Number(e.target.value))}>
  <option value="">Select an Occasion</option>
    {occasions.map(occ => (
    <option key ={occ.id} value={occ.id}>{occ.name}</option>
    ))}
  </Input>
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
          <Button id="save">Save</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}


import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { Card } from "reactstrap"

export default function UserCard({ card }) {

  const navigate = useNavigate();
  const handleTitleClick = (event) => {
    navigate(`/cardDetails/${card.id}`)
  }
  
  return (
    <Card className="m-5 text-center" style={{'borderRadius':'20px'}}>
        <button style={{'borderRadius':'20px'}} onClick={(clickEvent) => handleTitleClick(clickEvent)}>
        <h3>{card.title}</h3>
        <div>
        <img height="20%" width="20%" src={card.imageUrl} alt={card.title} />
        </div>
        <p>Author: {card.userProfile.userName} &emsp; Published on {card.publishDateTime}</p>
        </button>
    </Card>
  );
}

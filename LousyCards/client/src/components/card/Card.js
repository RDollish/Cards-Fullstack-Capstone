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

    <Card className="m-5 text-center" onClick={(clickEvent) => handleTitleClick(clickEvent)}>

        <h3>{card.title}</h3>
        <h4>{card.description}</h4>
        <div class="img">
          <img src={card.imageUrl} alt={card.title} />
        </div>
        <p>
          Author: {card.userProfile.displayName} &emsp;
          Published on {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }).format(new Date(card.createdAt))}
        </p>

    </Card>
  );
}

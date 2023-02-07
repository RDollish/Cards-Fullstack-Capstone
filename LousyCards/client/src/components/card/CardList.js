import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getAllCards } from "../../modules/cardManager";
import './CardList.css'
import { OccasionDropdown } from "./OccasionDropdown";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  useEffect(() => {
    getAllCards().then(setCards);
  }, []);

  const filteredCards = selectedOccasion
    ? cards.filter(card => card.occasionId === selectedOccasion)
    : cards;

  return (
    <>
      <h1 className="text-center">your feed</h1>
      <OccasionDropdown onChange={setSelectedOccasion} />
      <section>
        <div className="card-container">
          {filteredCards.map((c) => (
            
            <Card key={c.id} card={c} />
          ))}
        </div>
      </section>
    </>
  );
}

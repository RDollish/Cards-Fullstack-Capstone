import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getAllCards } from "../../modules/cardManager";
import './CardList.css'

export default function CardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getAllCards().then(setCards);
  }, []);

  return (
    <>
      <h1 className="text-center">your feed</h1>
      <section>
      <div class="card-container">
        {cards.map((c) => (
          <Card key={c.id} card={c} />
        ))}
        </div>
      </section>
    </>
  );
}

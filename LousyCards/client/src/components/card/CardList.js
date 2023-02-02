import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getAllCards } from "../../modules/cardManager";

export default function CardList() {
  // const [cards, setCards] = useState([]);

  // useEffect(() => {
  //   getAllCards().then(setCards);
  // }, []);

  return (
    <>
      <h1 className="text-center">YOUR FEED</h1>
      {/* <section>
        {cards.map((c) => (
          <Card key={c.id} card={c} />
        ))}
      </section> */}
    </>
  );
}

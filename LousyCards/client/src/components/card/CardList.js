import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getAllCards } from "../../modules/cardManager";
import './CardList.css'
import { OccasionDropdown } from "../ui/OccasionDropdown";
import { Pagination } from "../ui/Pagination";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  useEffect(() => {
    getAllCards().then(setCards);
  }, []);

  const filteredCards = selectedOccasion
    ? cards.filter(card => card.occasionId === selectedOccasion)
    : cards;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <>
      <h1 className="text-center">your feed</h1>
      <OccasionDropdown onChange={setSelectedOccasion}
      setCurrentPage={setCurrentPage} />
      <section>
        <div className="card-container">
          {currentCards.map((c) => (
            <Card key={c.id} card={c} />
          ))}
        </div>
      </section>
      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={filteredCards.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
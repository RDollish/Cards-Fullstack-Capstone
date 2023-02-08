import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getUserFavorites } from "../../modules/favoriteManager";
import './CardList.css'
import { OccasionDropdown } from "../ui/OccasionDropdown";
import { Pagination } from "../ui/Pagination";

export default function UserFavorite() {
  const [cards, setCards] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  useEffect(() => {
    getUserFavorites().then(setCards);
  }, []);

  const filteredCards = selectedOccasion
    ? cards.filter(card => card.card.occasionId === selectedOccasion)
    : cards;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <>
        {cards.length > 0 ? (
            <>
                <h1 className="text-center">your favorites</h1>
                <OccasionDropdown onChange={setSelectedOccasion} setCurrentPage={setCurrentPage}/>
                <section>
                    <div className="card-container">
                        {currentCards.map((c) => (
                            <Card key={c.card.id} card={c.card} />
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
        ) : (
            <p>You haven't favorited any cards yet!</p>
        )}
    </>
);
}

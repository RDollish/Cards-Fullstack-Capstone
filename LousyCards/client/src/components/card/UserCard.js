import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getUserCards } from "../../modules/cardManager";
import './CardList.css'
import { OccasionDropdown } from "../ui/OccasionDropdown";
import { Pagination } from "../ui/Pagination";

export default function UserCardList() {
    const [cards, setCards] = useState([]);
    const [selectedOccasion, setSelectedOccasion] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;


    useEffect(() => {
        getUserCards().then(setCards);
}, []);

    const filteredCards = selectedOccasion
        ? cards.filter(card => card.occasionId === selectedOccasion)
        : cards;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

    return (
        <>
            {cards.length > 0 ? (
                <>
                    <h1 className="text-center">your cards</h1>
                    <OccasionDropdown onChange={setSelectedOccasion} setCurrentPage={setCurrentPage} />
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
            ) : (
                <p>You haven't made any cards yet!</p>
            )}
        </>
    );
}

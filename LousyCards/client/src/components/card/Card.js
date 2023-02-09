import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Card } from "reactstrap"
import { Accordion, AccordionDetails, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getCardFavorites, getUserFavorites, addFavorite, deleteFavorite } from "../../modules/favoriteManager";
import { getAllComments, addComment, deleteComment } from "../../modules/commentManager";
import { getUserCards, deleteCard } from "../../modules/cardManager";
import { getUserDetailsById } from "../../modules/userProfileManager";

export default function UserCard({ card }) {
  const [userId, setUserId] = useState();
  const [user, setUser] = useState({});
  const [favorited, setFavorited] = useState(false);
  const [cardComments, setCardComments] = useState([])
  const [open, setOpen] = React.useState(false);
  const [newComment, setNewComment] = useState("");
  const [openCardDialog, setOpenCardDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [userCards, setUserCards] = useState([]);
  const [numberOfFavorites, setNumberOfFavorites] = useState(0);
  const [numberOfComments, setNumberOfComments] = useState(0);

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const cards = await getUserCards();
        setUserCards(cards);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserCards();
  }, []);

  const handleCardOpen = () => {
    setOpenCardDialog(true);
  };

  const handleCardClose = () => {
    setOpenCardDialog(false);
  };

  const handleCardDelete = () => {
    deleteCard(card.id).then(() => {
      console.log("Card deleted successfully!");
    }).catch(error => {
      console.error(error);
    });
    setOpenCardDialog(false);
  };

  const handleCommentOpen = () => {
    setOpenCommentDialog(true);
  };

  const handleCommentClose = () => {
    setOpenCommentDialog(false);
  };

  const handleCommentDelete = (id) => {
    deleteComment(id).then(() => {
      console.log("Comment deleted successfully!");
    }).catch(error => {
      console.error(error);
    });
    setOpenCommentDialog(false);
  };



  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    setUserId(Number(userIdFromLocalStorage));
  }, []);

  useEffect(() => {
    if (userId !== undefined) {
      getUserDetailsById(userId)
        .then((userData) => {
          setUser(userData);
        })
    };
  }, [userId]);


  const navigate = useNavigate();

  const handleEditClick = (event) => {
    navigate(`/edit/${card.id}`)
    window.location.reload()
  }

  const toggleFavorite = async (e) => {
    e.preventDefault();

    if (userId) {

      const CardFavorite = {
        userId,
        cardId: card.id
      };

      if (favorited) {
        deleteFavorite(CardFavorite?.cardId, CardFavorite?.userId);
        const newNum = numberOfFavorites - 1
        setNumberOfFavorites(newNum);
      } else {
        addFavorite(CardFavorite);
        const newNum = numberOfFavorites + 1
        setNumberOfFavorites(newNum);
      }
      setFavorited(!favorited);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userFavorites = await getUserFavorites();
        const allFavorites = await getCardFavorites(card.id);
        const hasFavorited = userFavorites.filter(fav => fav.cardId === card.id);
        setNumberOfFavorites(allFavorites.length);
        if (hasFavorited.length > 0) {
          setFavorited(true)
        };
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId, card.id]);



  useEffect(() => {
    const fetchComments = async () => {
      try {
        const allComments = await getAllComments();
        setCardComments(allComments)
        const cardComments = allComments.filter(comment => comment?.card?.id === card?.id);
        setNumberOfComments(cardComments.length)
        setCardComments(cardComments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [card.id]);

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const comment = {
      userId: userId,
      cardId: card.id,
      comment: newComment,
    };

    try {
      await addComment(comment);
      setNumberOfComments(numberOfComments + 1);
      comment.userProfile = {displayName: user.displayName}
      setCardComments([...cardComments, comment]);
    } catch (error) {
      console.error(error);
    }

    setNewComment("");
  };



  return (

    <Card className={card?.occasion?.name}>
      <h3>{card.title}</h3>
      <h4>{card.description}</h4>
      <div className="img">
        <img src={card.imageUrl} alt={card.title} />
      </div>
      <p>
        Author: {card.userProfile.displayName} &emsp;
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date(card.createdAt))}
      </p>
      <div className="button-container">
        <button
          className={`btn-favorite ${favorited ? "favorited" : ""}`}
          onClick={(e) => toggleFavorite(e)}
        ><span role="img" aria-label="speech bubble">
            {favorited ? "❤️" : "🤍"}</span> {numberOfFavorites}
        </button>
        <button
          className="btn-comment"
          onClick={(e) => setOpen(!open)}
        >
          <span role="img" aria-label="speech bubble">💬</span> {numberOfComments}
        </button>
        {userCards.find(c => c.id === card.id) && (
          <>
            <button className="btn-edit"
              onClick={(e) => handleEditClick(e)}><span>✏️</span></button>
            <button className="btn-delete" onClick={handleCardOpen}><span>❌
            </span></button>
          </>
        )}
        <Dialog
          open={openCardDialog}
          onClose={handleCardClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure you want to delete this card?</DialogTitle>
          <DialogContent>
            <DialogContentText><img src={card.imageUrl} alt="delete" style={{ maxWidth: "100%", height: "auto" }} /></DialogContentText>
            <br></br>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCardClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCardDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {open && (
        <Accordion>
          <center><AccordionDetails style={{ backgroundColor: "#FFB6C1" }}>
            <div className="comments">
              {cardComments.map(comment => (
                <div key={comment.id}>
                  <p>
                    {comment.comment} - {comment.userProfile.displayName}
                    {userId === comment?.userId && (
                      <span className="delete-icon" style={{ cursor: "pointer" }} onClick={handleCommentOpen}>❌</span>
                    )}
                  </p>
                  <Dialog
                    open={openCommentDialog}
                    onClose={handleCommentClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Are you sure you want to delete this comment?
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>"{comment.comment}" - {comment.userProfile.displayName}</DialogContentText>
                      <br></br>
                      <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCommentClose} color="primary">
                        No
                      </Button>
                      <Button
                        onClick={() => {
                          handleCommentDelete(comment.id);
                        }}
                        color="primary"
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              ))}
            </div>

            <form className="input-container" onSubmit={handleSubmit}>
              <input type="text" placeholder="Write a comment" value={newComment} onChange={handleChange} />
              <button className="post-comment-button">Post</button>
            </form>
          </AccordionDetails></center>
        </Accordion>
      )
      }
    </Card >
  );
}


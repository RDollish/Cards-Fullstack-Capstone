import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { Card } from "reactstrap"
import { Accordion, AccordionDetails, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getAllFavorites, addFavorite, deleteFavorite } from "../../modules/favoriteManager";
import { getAllComments, addComment, deleteComment } from "../../modules/commentManager";
import { deleteCard } from "../../modules/cardManager";

export default function UserCard({ card }) {
  const [userId, setUserId] = useState();
  const [cardId, setCardId] = useState();
  const [favorited, setFavorited] = useState(false);
  const [cardComments, setCardComments] = useState([])
  const [open, setOpen] = React.useState(false);
  const [newComment, setNewComment] = useState("");
  const [openCardDialog, setOpenCardDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

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

  const navigate = useNavigate();
  const handleTitleClick = (event) => {
    navigate(`/cardDetails/${card.id}`)
  }
  const handleEditClick = (event) => {
    navigate(`/edit/${card.id}`)
  }

  const toggleFavorite = async (e) => {
    e.preventDefault();

    if (userId) {
      setCardId(card.id);

      const CardFavorite = {
        userId,
        cardId: card.id
      };

      if (favorited) {
        deleteFavorite(CardFavorite?.cardId, CardFavorite?.userId);;
      } else {
        addFavorite(CardFavorite);
      }

      setFavorited(!favorited);
    }
  };


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const allFavorites = await getAllFavorites();
        const hasFavorited = allFavorites.filter(fav => fav.cardId === card.id);
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
      comment: newComment
    };

    try {
      await addComment(comment);
    } catch (error) {
      console.error(error);
    }

    setNewComment("");
  };



  return (

    <Card className="m-5 text-center">
      <h3>{card.title}</h3>
      <h4>{card.description}</h4>
      <div className="img">
        <img src={card.imageUrl} alt={card.title} onClick={(clickEvent) => handleTitleClick(clickEvent)} />
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
        >
          {favorited ? "❤️" : "🤍"}
        </button>
        <button
          className="btn-comment"
          onClick={(e) => setOpen(!open)}
        >
          💬
        </button>

        <button className="btn-edit"
          onClick={(clickEvent) => handleEditClick(clickEvent)}>✏️</button>
        <button className="btn-delete" onClick={handleCardOpen}>
          ❌
        </button>
        <Dialog
          open={openCardDialog}
          onClose={handleCardClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure you want to delete this card?</DialogTitle>
          <DialogContent>
            <DialogContentText><img src={card.imageUrl} style={{ maxWidth: "100%", height: "auto" }}/></DialogContentText>
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


import { getToken } from "./authManager";

const apiUrl = "/api/card";

export const getAllCards = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get cards.",
        );
      }
    });
  });
};

export const getCardDetails = (id) => {
  
  return getToken().then(token => {
    return fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get cards.",
        );
      }
    });
  });
}


  export const getUserCards = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/usercards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get posts.",
        );
      }
    });
  });
};

export const AddCard = (card) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
    }).then((resp) => {
      if (resp.ok) {
        console.log("Card made successfully!")
        return resp.json();
      } else {
        throw new Error(
          "An error occurred while trying to add a card.",
        );
      }
    });
  });
}
import { getToken } from "./authManager";

const apiUrl = "/api/card";

export const getAllCards = async () => {
  try {
    const token = await getToken();
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to get cards.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getCardDetails = async (id) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to get cards.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getUserCards = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/usercards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to get cards.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const addCard = async (card) => {
  try {
    const token = await getToken();
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });

    if (!response.ok) {
      throw new Error("An error occurred while trying to add a card.");
    }

    console.log("Card made successfully!");
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const editCard = async (id, card) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });

    if (!response.ok) {
      throw new Error("An error occurred while trying to edit a card.");
    }

    console.log("Card edited successfully!");
  } catch (error) {
    throw error;
  }
};

export const deleteCard = async (id) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An error occurred while trying to delete the card.");
    }

    console.log("Card deleted successfully!");
  } catch (error) {
    throw error;
  }
};


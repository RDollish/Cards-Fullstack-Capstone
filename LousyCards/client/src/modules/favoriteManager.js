import { getToken } from "./authManager";

const apiUrl = "/api/favorite";

export const getAllFavorites = async () => {
  try {
    const token = await getToken();
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to get favorites.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getCardFavorites = async (cardId) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/${cardId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to get favorites.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getUserFavorites = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/userfavorites`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to get favorites.");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};


export const addFavorite = async (favorite) => {
    try {
      const token = await getToken();
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favorite),
      });
  
      if (!response.ok) {
        throw new Error("An error occurred while trying to add a favorite.");
      }
  
      console.log("Favorite made successfully!");
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  export const deleteFavorite = async (cardId, userId) => {
    try {
      const token = await getToken();
      const response = await fetch(`${apiUrl}/${cardId}/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("An error occurred while trying to delete a favorite.");
      }

      console.log("Favorite deleted successfully!");
      return response;
    } catch (error) {
      throw error;
    }
};
    
    
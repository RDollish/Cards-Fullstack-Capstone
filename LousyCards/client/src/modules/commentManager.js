import { getToken } from "./authManager";

const apiUrl = "/api/comment";

export const getAllComments = async () => {
  try {
    const token = await getToken();
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to get comments.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const addComment = async (comment) => {
    try {
      const token = await getToken();
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
  
      if (!response.ok) {
        throw new Error("An error occurred while trying to add a comment.");
      }
  
      console.log("Comment made successfully!");
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  export const deleteComment = async (commentId) => {
    try {
      const token = await getToken();
      const response = await fetch(`${apiUrl}/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("An error occurred while trying to delete a comment.");
      }

      console.log("Comment deleted successfully!");
    } catch (error) {
      throw error;
    }
};
    
    
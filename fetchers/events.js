const ENDPOINT = process.env.API_ENDPOINT;

export const getAllEvents = async () => {
  try {
    const response = await fetch(`https://neotavern-backend.vercel.app/events`);
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des événements :", error);
    throw error;
  }
};

export const getLikedEvents = async (token) => {
  try {
    const response = await fetch(
      `http://neotavern-backend.vercel.app/events/likedEvents/${token}`
    );
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des événements :", error);
    throw error;
  }
};

export const likeAnEvent = async (userToken, eventId) => {
  try {
    const response = await fetch(
      `http://neotavern-backend.vercel.app/events/like/${userToken}/${eventId}`,
      {
        method: "PUT",
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Erreur lors du like de l'événement :", error);
    throw error;
  }
};

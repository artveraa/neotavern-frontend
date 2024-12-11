const ENDPOINT = process.env.API_ENDPOINT;

const getAllEvents = async () => {
  try {
    const response = await fetch(`https://neotavern-backend.vercel.app/events`);
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des événements :", error);
    throw error;
  }
};

const stockLikeInDB = async (eventId, userToken) => {
  try {
    const response = await fetch(
      `https://neotavern-backend.vercel.app/events/like/${userToken}/${eventId}`,
      {
        method: "POST",
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Erreur lors du stockage du like :", error);
    throw error;
  }
};

export { getAllEvents, stockLikeInDB };

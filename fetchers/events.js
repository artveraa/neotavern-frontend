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


export default getAllEvents;

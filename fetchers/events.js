import { response } from "../../backend/app";

const ENDPOINT = process.env.API_ENDPOINT;

const getAllEvents = () => {
  return fetch(`${ENDPOINT}/events`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

export default {
  getAllEvents,
};

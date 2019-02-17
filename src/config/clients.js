import axios from "axios";
import Properties from "./properties";

export const clients = {
  allegroAuth: {
    client: axios.create({
      baseURL: "/auth/oauth",
      auth: {
        username: Properties.ALLEGRO.CLIENT_ID,
        password: Properties.ALLEGRO.CLIENT_SECRET
      },
      delay: 1000
    }),
  },
  allegroApi: {
    client: axios.create({
      baseURL: "/api",
      headers: {
        'Accept': 'application/vnd.allegro.public.v1+json',
        'Content-Type': 'application/vnd.allegro.public.v1+json',
      },
      delay: 500
    })
  },
};

export const clientsList = [clients.allegroAuth, clients.allegroApi];
import axios from 'axios';

const API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

const API = {
  fetchCities: async ({ query = '', currentPage = 1, itemsPerPage = 5 }) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
          namePrefix: query,
        },
        headers: {
          'x-rapidapi-key': "d0f7f3a6admsh3d54673091f00f5p107f9ejsn4df3455b4719",
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  },
};

export default API;

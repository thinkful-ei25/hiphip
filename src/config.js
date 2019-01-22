require('dotenv').config();

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const STORE_API_BASE_URL = 'https://api.yelp.com/v3/businesses/search';

export const API_authToken = process.env.API_authToken;

// js/api/pixabayAPI.js
import axios from 'axios'; 
export const API_KEY = '34746369-14ee2f85f37785b550fe584c9';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImagesFromApi(searchQuery, page) {
  try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
      searchQuery
    )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);

    const { hits, totalHits } = response.data;
    return { hits, totalHits }; // Return both hits and totalHits
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
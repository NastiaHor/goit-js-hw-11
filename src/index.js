// index.js
import Notiflix from '../node_modules/notiflix/dist/notiflix-3.2.6.min.js';
import { showErrorMessage, showEndMessage } from './js/notiflixOptions.js';
import { renderImages, clearGallery } from './js/gallery.js';
import { showLoadMoreBtn, hideLoadMoreBtn } from './js/loadMoreBtn.js';
import { API_KEY, fetchImagesFromApi } from './js/api/pixabayAPI.js';

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let searchQuery = '';
let currentPage = 1;

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  searchQuery = event.target.elements[0].value.trim();

  if (!searchQuery) {
    Notiflix.Notify.warning('Please, enter a search query.');
    return;
  }

  currentPage = 1;
  clearGallery(gallery);
  hideLoadMoreBtn();
  fetchImages();
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  fetchImages();
});

async function fetchImages() {
  try {
    const images = await fetchImagesFromApi(searchQuery, currentPage);
    if (images.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    renderImages(images, gallery);
    showLoadMoreBtn();
  } catch (error) {
    Notiflix.Notify.failure('An error occurred. Please try again.');
    console.error(error);
  }
}

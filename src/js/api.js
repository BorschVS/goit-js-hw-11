import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '40756671-54754ada209148e7d7f60a97d';
const BASE_URL = 'https://pixabay.com/api/';
let page = 1;

export const refs = {
  searchForm: document.getElementById('search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  loader: document.querySelector('.loader'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

export function fetchCards() {
  const perPage = 40;
  const searchQuery = refs.input.value;
  return axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(response => {
      if (response.data.hits && page === 1) {
        Notify.success(`"Hooray! We found ${response.data.totalHits} images."`);
      } else if (response.data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.loader.classList.add('is-hidden');
        refs.loadMoreBtn.classList.add('is-hidden');
        return;
      }
      incrementPage();
      return response.data.hits;
    });
}

export function incrementPage() {
  page += 1;
}

export function resetPage() {
  page = 1;
}

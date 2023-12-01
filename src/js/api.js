import axios from 'axios';

const API_KEY = '40756671-54754ada209148e7d7f60a97d';
const BASE_URL = 'https://pixabay.com/api/';
let page = 0;

export const refs = {
  searchForm: document.getElementById('search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  loader: document.querySelector('.loader'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

export function fetchCards() {
  page += 1;
  const perPage = 40;
  const searchQuery = refs.input.value;
  return axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(response => {
      incrementPage();
      return response.data.hits;
    });
}

function incrementPage() {
  page += 1;
}

export function resetPage() {
  page = 0;
}

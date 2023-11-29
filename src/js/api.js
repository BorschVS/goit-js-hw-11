import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export const refs = {
  searchForm: document.getElementById('#search-form'),
  input: document.querySelector('imput[name="searchQuery"]'),
  loader: document.querySelector('.loader'),
};

// axios.init({
//   ''
// })

// axios.get('');

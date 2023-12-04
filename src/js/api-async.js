import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40756671-54754ada209148e7d7f60a97d';

export default class FindApiService {
  constructor() {
    this.page = 1;
    this.perPage = 40;
    this.searchQuery = '';
    this.imageType = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = true;
  }

  async fetchCards() {
    this.searchQuery = refs.input.value;
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safesearch}`;
    const response = await axios.get(url);
    this.incrementPage();
    return await response.data.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

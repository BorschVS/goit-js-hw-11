import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class FindApiService {
  constructor() {
    this.url = 'https://pixabay.com/api/';
    this.key = '40756671-54754ada209148e7d7f60a97d';
    this.page = 1;
    this.perPage = 40;
    this.searchQuery = '';
    this.imageType = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = true;
    this.input = document.querySelector('input[name="searchQuery"]');
  }

  async fetchCards() {
    try {
      this.searchQuery = this.input.value;
      if (this.searchQuery === '') {
        return;
      }
      const url = `${this.url}?key=${this.key}&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safesearch}`;
      const response = await axios.get(url);

      if (this.page === 1 && response.data.totalHits !== 0) {
        Notify.success(`"Hooray! We found ${response.data.totalHits} images."`);
      }

      return await response.data.hits;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

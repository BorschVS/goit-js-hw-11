import LoadMoreBtn from './js/load-more';
import FindApiService from './js/api-async';
import cardTpl from './templates/card.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: false,
});

const api = new FindApiService();

refs.searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.refs.button.addEventListener('click', fetchCards);
refs.gallery.addEventListener('click', onGallery);

function onSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  api.resetPage();
  fetchCards();
  loadMoreBtn.hide();
  loadMoreBtn.showLoader();
}

async function fetchCards() {
  const articles = await api.fetchCards();
  if (articles.length === 0 || api.searchQuery === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.hideLoader();
    return;
  }
  markupCards({ articles });
  loadMoreBtn.hideLoader();
  loadMoreBtn.show();
  api.incrementPage();
}

function markupCards(articles) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(articles));
}

const lightboxOptions = {
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
  navText: ['‹', '›'],
  fadeSpeed: 250,
};

function onGallery(e) {
  e.preventDefault();
  new SimpleLightbox('.gallery a', lightboxOptions);
}

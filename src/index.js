import LoadMoreBtn from './js/load-more';
import FindApiService from './js/api-async';
import cardTpl from './templates/card.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: false,
});

refs = {
  searchForm: document.getElementById('search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
};

const api = new FindApiService();
console.log(refs);
refs.searchForm.addEventListener('submit', onSubmit);

loadMoreBtn.refs.button.addEventListener('click', fetchCards);

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
  markupCards({ articles });
  loadMoreBtn.show();
  loadMoreBtn.hideLoader();
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

refs.gallery.addEventListener('click', onGallery);

function onGallery(e) {
  e.preventDefault();
  const lightbox = new SimpleLightbox('.gallery a', lightboxOptions);
}

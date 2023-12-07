import LoadMoreBtn from './js/load-more';
import FindApiService from './js/api-async';
import cardTpl from './templates/card.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import _ from 'lodash';

const lightboxOptions = {
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
  navText: ['‹', '›'],
  fadeSpeed: 250,
};

Notify.init({
  position: 'left-top',
});

const lightbox = new SimpleLightbox('.gallery a', lightboxOptions);

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

function onSubmit(e) {
  e.preventDefault();
  setTimeout(() => {
    loadMoreBtn.hideLoader();
  }, 1000);
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
  lightbox.refresh();
  loadMoreBtn.hideLoader();
  loadMoreBtn.show();
  api.incrementPage();
  if (articles.length !== 40) {
    window.addEventListener('scroll', _.debounce(handleScroll, 300));
    loadMoreBtn.hide();
  }
}

function markupCards(articles) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(articles));
}

function isAtEndOfPage() {
  const totalPageHeight = document.documentElement.scrollHeight;

  const scrollTop = window.scrollY || window.pageYOffset;

  const windowHeight = window.innerHeight;

  return scrollTop + windowHeight >= totalPageHeight;
}

function handleScroll() {
  if (isAtEndOfPage()) {
    Notify.info('Сollection is over');
  }
}

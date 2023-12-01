import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/api';
import { fetchCards } from './js/api';
import cardTpl from './templates/card.hbs';
import { resetPage } from './js/api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
  const lightbox = new SimpleLightbox(`.gallery a`, lightboxOptions);
}

Notify.init({
  width: '300px',

  position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  timeout: 1000,

  failure: {
    background: 'rgb(160, 160, 160)',
    textColor: '#000',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgb(0,0,0)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgb(0,0,0)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
});

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.loader.classList.remove('is-hidden');
  resetPage();
  fetchCards()
    .then(articles => {
      if (articles.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      markupCards({ articles });
      refs.loader.classList.add('is-hidden');
      refs.loadMoreBtn.classList.remove('is-hidden');
    })
    .catch(error => console.log(error));
}

function onLoadMoreBtn() {
  fetchCards().then(articles => {
    markupCards({ articles });
  });
}

function markupCards(articles) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(articles));
}

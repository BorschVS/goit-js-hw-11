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
  let lightbox = new SimpleLightbox(`.photo-card a`, lightboxOptions);
}

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onSubmit(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';
  refs.loader.classList.remove('is-hidden');
  refs.loadMoreBtn.classList.add('is-hidden');

  resetPage();

  fetchCards()
    .then(articles => {
      if (articles.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.loader.classList.add('is-hidden');
        refs.loadMoreBtn.classList.add('is-hidden');
        return;
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

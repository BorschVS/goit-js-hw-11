export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }
  getRefs(selector) {
    const refs = {};
    refs.loader = document.querySelector('.loader');
    refs.button = document.querySelector(selector);
    return refs;
  }

  showLoader() {
    this.refs.loader.classList.remove('is-hidden');
  }

  hideLoader() {
    this.refs.loader.classList.add('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}

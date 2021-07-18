export default function getRefs() {
  return {
    form: document.querySelector('#search-form'),
    loadMore: document.querySelector('[data-action="load-more"]'),
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector('.loader-js'),
  };
}
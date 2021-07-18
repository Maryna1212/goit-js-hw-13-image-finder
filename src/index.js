import './sass/main.scss';
import getRefs from './js/get-refs';
import ApiService from './js/apiService';
import imageTemplate from './templates/imageTemplate';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
const { error, notice } = require('@pnotify/core');
const basicLightbox = require('basiclightbox');

const refs = getRefs();

const apiService = new ApiService();

refs.form.addEventListener('submit', onSearchForm);
refs.loadMore.addEventListener('click', onLoadMore);

async function onSearchForm(event) {
    event.preventDefault();

    try {
        apiService.query = event.currentTarget.elements.query.value;
        event.currentTarget.elements.query.value = '';

        if (apiService.query === '') {
            return error({
                text: 'Sorry! But first you need to enter a word!',
                delay: 2000,
                mouseResert: true,
            });
        };

        apiService.resertPage();
        refs.loader.classList.remove('is-hidden');
        const images = await apiService.fetchImages();

        checkImagesAvailability(images);
        clearImagesInGallery(images);
        insertImagesInGallery(images);

        refs.loader.classList.add('is-hidden');
    } catch {
        return error({
            text: 'Sorry! But something is wrong!',
            delay: 2000,
            mouseResert: true,
        });
    };
};

async function onLoadMore() {
    refs.loader.classList.remove('is-hidden');
    const images = await apiService.fetchImages();
    insertImagesInGallery(images);
    refs.loader.classList.add('is-hidden');
};

function insertImagesInGallery(images) {
    refs.gallery.insertAdjacentHTML('beforeend', imageTemplate(images));
    refs.loadMore.classList.remove('is-hidden');
};

function clearImagesInGallery() {
    refs.gallery.innerHTML = '';
};

function checkImagesAvailability(array) {
    if (array.length === 0) {
        return notice({
            text: 'Sorry, there is no result for your request. Try again!',
            delay: 2000,
        });
    }
};

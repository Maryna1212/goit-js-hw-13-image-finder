const BASE_URL = 'https://pixabay.com/api/';  
const API_KEY = '22543277-665cbce6a6d86ae5cc10e7d44';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };

    async fetchImages() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`
        const response = await fetch(url)
        const  { hits } =await response.json()
        this.incrementPage()
        return hits
    }

    incrementPage () {
        this.page += 1;
    }

    resetPage () {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '23134981-bd961700c800aa88c1e42f5d0';

export class pixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(newQuery) {
    return (this._searchQuery = newQuery);
  }

  resetPage() {
    this.page = 1;
  }

  fetchImages(searchQuery) {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then((this.page += 1))
      .catch(err => console.log(err));
  }
}

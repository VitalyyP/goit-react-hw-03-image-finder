import { Component } from 'react';
import { pixabayApi } from '../../services/pixabayApi';
import ImageGalleryItem from '../ImageGalleryItem';

const newPixabayApi = new pixabayApi();
console.log(newPixabayApi);

export class ImageGalery extends Component {
  state = {
    // searchQuery: this.props.searchValue,
    searchResults: [],
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      console.log('get fetch');
      this.setState({ status: 'pending' });
      newPixabayApi.resetPage();
      newPixabayApi.searchQuery = this.props.searchValue;
      newPixabayApi
        .fetchImages()
        .then(searchResults => {
          console.log(searchResults.hits);
          this.setState({ searchResults: searchResults.hits, status: 'resolved' });
        })
        .catch(err => {
          console.log(err);
          this.setState({ status: 'rejected' });
        });
    }
  }

  handleClick = () => {
    newPixabayApi
      .fetchImages()
      .then(searchResults => {
        this.setState(prev => ({
          searchResults: [...prev.searchResults, ...searchResults.hits],
          status: 'resolved',
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState({ status: 'rejected' });
      });
  };

  render() {
    const { status } = this.state;
    const { handleClick } = this;
    if (status === 'idle') {
      return <h1>Hello</h1>;
    }
    if (status === 'pending') {
      return <h1>Please wait...</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            {this.state.searchResults.map(el => (
              <ImageGalleryItem key={el.id} item={el} />
            ))}
          </ul>
          <button type="button" className="Button" onClick={handleClick}>
            Load more
          </button>
        </>
      );
    }
    if (status === 'regected') {
      return <h1>Error!</h1>;
    }
  }
}
